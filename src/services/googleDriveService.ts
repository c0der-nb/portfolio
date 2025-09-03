import { GOOGLE_DRIVE_CONFIG, getDirectDownloadUrl, validateGoogleDriveConfig } from '../config/googleDrive.ts';

// Google Drive API Service for Resume Download
export interface GoogleDriveConfig {
  apiKey: string;
  fileId: string;
  clientId?: string;
}

export class GoogleDriveService {
  private apiKey: string;
  private fileId: string;
  private clientId?: string;

  constructor(config: GoogleDriveConfig) {
    this.apiKey = config.apiKey;
    this.fileId = config.fileId;
    this.clientId = config.clientId;
  }

  /**
   * Download resume from Google Drive using public API
   */
  async downloadResume(): Promise<void> {
    try {
      // Check configuration
      const config = validateGoogleDriveConfig();
      if (!config.isValid) {
        throw new Error(`Configuration missing: ${config.missingFields.join(', ')}`);
      }

      // For public files, we can use the direct download URL
      const downloadUrl = getDirectDownloadUrl(this.fileId);
      
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = GOOGLE_DRIVE_CONFIG.RESUME_FILENAME;
      link.target = '_blank';
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading resume:', error);
      throw new Error('Failed to download resume. Please try again later.');
    }
  }

  /**
   * Get file metadata from Google Drive API
   */
  async getFileMetadata(): Promise<any> {
    try {
      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files/${this.fileId}?key=${this.apiKey}&fields=name,size,modifiedTime,mimeType`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch file metadata');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching file metadata:', error);
      return null;
    }
  }

  /**
   * Download resume with progress tracking (for authenticated requests)
   */
  async downloadResumeWithProgress(
    onProgress?: (progress: number) => void
  ): Promise<Blob> {
    try {
      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files/${this.fileId}?alt=media&key=${this.apiKey}`
      );

      if (!response.ok) {
        throw new Error('Failed to download file');
      }

      const contentLength = response.headers.get('content-length');
      const total = contentLength ? parseInt(contentLength, 10) : 0;
      let loaded = 0;

      const reader = response.body?.getReader();
      const chunks: Uint8Array[] = [];

      if (!reader) {
        throw new Error('Failed to read response');
      }

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        chunks.push(value);
        loaded += value.length;
        
        if (onProgress && total > 0) {
          onProgress((loaded / total) * 100);
        }
      }

      const blob = new Blob(chunks);
      return blob;
    } catch (error) {
      console.error('Error downloading with progress:', error);
      throw new Error('Failed to download resume. Please try again later.');
    }
  }

  /**
   * Trigger download from blob
   */
  static downloadBlob(blob: Blob, filename: string = 'Aditya_Gupta_Resume.pdf'): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL object
    URL.revokeObjectURL(url);
  }
}

// Default configuration using the centralized config
export const defaultGoogleDriveConfig: GoogleDriveConfig = {
  apiKey: GOOGLE_DRIVE_CONFIG.API_KEY,
  fileId: GOOGLE_DRIVE_CONFIG.RESUME_FILE_ID,
  clientId: GOOGLE_DRIVE_CONFIG.CLIENT_ID,
};

// Create default service instance
export const googleDriveService = new GoogleDriveService(defaultGoogleDriveConfig);
