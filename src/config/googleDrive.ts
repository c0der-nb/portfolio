// Google Drive Configuration
// This file contains the configuration for Google Drive API integration

export const GOOGLE_DRIVE_CONFIG = {
  // Your Google Drive API Key (from Google Cloud Console)
  // To get this:
  // 1. Go to https://console.cloud.google.com/
  // 2. Create a new project or select existing one
  // 3. Enable Google Drive API
  // 4. Create credentials (API Key)
  // 5. Restrict the API key to Google Drive API for security
  API_KEY: process.env.REACT_APP_GOOGLE_DRIVE_API_KEY || '',

  // Your resume file ID from Google Drive
  // To get this:
  // 1. Upload your resume to Google Drive
  // 2. Right-click the file and select "Share"
  // 3. Change permissions to "Anyone with the link can view"
  // 4. Copy the link - the file ID is the long string between /d/ and /view
  // Example: https://drive.google.com/file/d/FILE_ID_HERE/view
  RESUME_FILE_ID: process.env.REACT_APP_GOOGLE_DRIVE_FILE_ID || '',

  // Optional: Google OAuth Client ID (for private files)
  CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID || '',

  // Resume filename for download
  RESUME_FILENAME: 'Aditya_Gupta_Resume.pdf',

  // Fallback direct download URL (if you want to host it elsewhere)
  FALLBACK_URL: process.env.REACT_APP_RESUME_FALLBACK_URL || '',
};

// Validation function to check if configuration is complete
export const validateGoogleDriveConfig = (): {
  isValid: boolean;
  missingFields: string[];
  warnings: string[];
} => {
  const missingFields: string[] = [];
  const warnings: string[] = [];

  if (!GOOGLE_DRIVE_CONFIG.RESUME_FILE_ID) {
    missingFields.push('REACT_APP_GOOGLE_DRIVE_FILE_ID');
  }

  if (!GOOGLE_DRIVE_CONFIG.API_KEY) {
    warnings.push('REACT_APP_GOOGLE_DRIVE_API_KEY - Using direct download fallback');
  }

  return {
    isValid: missingFields.length === 0,
    missingFields,
    warnings,
  };
};

// Helper function to get direct download URL
export const getDirectDownloadUrl = (fileId: string): string => {
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
};

// Helper function to get file preview URL
export const getPreviewUrl = (fileId: string): string => {
  return `https://drive.google.com/file/d/${fileId}/view`;
};
