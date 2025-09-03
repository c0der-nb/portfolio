const nodemailer = require('nodemailer');

class SimpleGmailService {
  constructor() {
    this.transporter = null;
  }

  async createTransporter() {
    if (this.transporter) {
      return this.transporter;
    }

    try {
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SENDER_EMAIL,
          pass: process.env.GMAIL_APP_PASSWORD, // App password, not regular password
        },
      });

      return this.transporter;
    } catch (error) {
      console.error('Error creating transporter:', error);
      throw error;
    }
  }

  async sendEmail({ name, email, subject, message }) {
    try {
      const transporter = await this.createTransporter();

      const mailOptions = {
        from: `"${name}" <${process.env.SENDER_EMAIL}>`,
        to: process.env.RECIPIENT_EMAIL,
        replyTo: email,
        subject: `Portfolio Contact: ${subject}`,
        html: this.generateEmailTemplate({ name, email, subject, message }),
        text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
        `.trim(),
      };

      const result = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', result.messageId);
      return result;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  generateEmailTemplate({ name, email, subject, message }) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        .container {
            background: white;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            margin-bottom: 30px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .field {
            margin-bottom: 20px;
        }
        .field-label {
            font-weight: 600;
            color: #4a5568;
            margin-bottom: 5px;
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 0.5px;
        }
        .field-value {
            background: #f7fafc;
            padding: 12px;
            border-radius: 6px;
            border-left: 4px solid #667eea;
        }
        .message-field .field-value {
            white-space: pre-wrap;
            min-height: 100px;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            text-align: center;
            color: #718096;
            font-size: 14px;
        }
        .timestamp {
            background: #edf2f7;
            padding: 10px;
            border-radius: 6px;
            font-size: 12px;
            color: #4a5568;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 New Contact Form Submission</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Portfolio Website</p>
        </div>
        
        <div class="field">
            <div class="field-label">👤 Name</div>
            <div class="field-value">${name}</div>
        </div>
        
        <div class="field">
            <div class="field-label">📧 Email</div>
            <div class="field-value">
                <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a>
            </div>
        </div>
        
        <div class="field">
            <div class="field-label">📋 Subject</div>
            <div class="field-value">${subject}</div>
        </div>
        
        <div class="field message-field">
            <div class="field-label">💬 Message</div>
            <div class="field-value">${message}</div>
        </div>
        
        <div class="footer">
            <div class="timestamp">
                ⏰ Received on ${new Date().toLocaleString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZoneName: 'short'
                })}
            </div>
            <p style="margin: 15px 0 0 0;">
                This email was sent from your portfolio contact form.<br>
                Reply directly to this email to respond to ${name}.
            </p>
        </div>
    </div>
</body>
</html>
    `.trim();
  }

  async testConnection() {
    try {
      const transporter = await this.createTransporter();
      await transporter.verify();
      console.log('Gmail connection verified successfully');
      return true;
    } catch (error) {
      console.error('Gmail connection test failed:', error);
      return false;
    }
  }
}

module.exports = SimpleGmailService;
