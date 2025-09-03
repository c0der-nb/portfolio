const express = require('express');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const SimpleGmailService = require('../config/gmail-simple');

const router = express.Router();
const gmailService = new SimpleGmailService();

// Rate limiting: 5 requests per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    error: 'Too many contact form submissions. Please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Validation middleware
const validateContactForm = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s\-'\.]+$/)
    .withMessage('Name contains invalid characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('subject')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
];

// Health check endpoint
router.get('/health', async (req, res) => {
  try {
    const isConnected = await gmailService.testConnection();
    res.json({
      status: 'ok',
      gmailConnection: isConnected ? 'connected' : 'disconnected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Health check failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Contact form submission endpoint
router.post('/send', contactLimiter, validateContactForm, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, subject, message } = req.body;

    // Log the submission (remove sensitive data in production)
    console.log(`New contact form submission from: ${name} <${email}>`);

    // Send email via Gmail API
    const result = await gmailService.sendEmail({
      name,
      email,
      subject,
      message
    });

    // Success response
    res.json({
      success: true,
      message: 'Your message has been sent successfully!',
      messageId: result.messageId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    // Error response
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      timestamp: new Date().toISOString()
    });
  }
});

// Test endpoint (only in development)
if (process.env.NODE_ENV === 'development') {
  router.post('/test', async (req, res) => {
    try {
      const testData = {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Email from Portfolio',
        message: 'This is a test message to verify the Gmail API integration is working correctly.'
      };

      const result = await gmailService.sendEmail(testData);
      
      res.json({
        success: true,
        message: 'Test email sent successfully',
        messageId: result.messageId,
        testData
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Test email failed',
        error: error.message
      });
    }
  });
}

module.exports = router;
