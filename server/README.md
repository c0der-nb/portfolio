# Portfolio Backend Server

This is the backend server for the portfolio contact form, providing Gmail API integration for sending emails.

## Features

- 📧 Gmail API integration for sending emails
- 🔒 Input validation and sanitization
- 🚦 Rate limiting to prevent spam
- 🛡️ Security middleware (CORS, Helmet)
- ✅ Health check endpoints
- 🎨 Beautiful HTML email templates
- 🔧 Development and production ready

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env
   # Edit .env with your Gmail API credentials
   ```

3. **Run the server:**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

4. **Test the connection:**
   Visit `http://localhost:3001/api/contact/health`

## API Endpoints

### Health Check
```
GET /health
GET /api/contact/health
```
Returns server status and Gmail connection status.

### Send Contact Email
```
POST /api/contact/send
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Hello",
  "message": "Your message here"
}
```

### Test Email (Development Only)
```
POST /api/contact/test
```
Sends a test email to verify the Gmail integration.

## Rate Limiting

- **Contact Form**: 5 submissions per 15 minutes per IP
- **Global**: 100 requests per 15 minutes per IP

## Security Features

- CORS protection
- Helmet security headers
- Request validation
- Input sanitization
- Rate limiting
- Error handling

## Development

The server includes helpful development features:
- Auto-reload with nodemon
- Detailed error messages
- Test endpoints
- Connection health checks

## Troubleshooting

1. **Check server logs** for detailed error messages
2. **Verify environment variables** are set correctly
3. **Test Gmail connection** using the health endpoint
4. **Check Google Cloud Console** for API quotas and errors

For detailed setup instructions, see `../GMAIL_API_SETUP.md`.
