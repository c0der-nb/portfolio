import { useState, useCallback } from 'react';
import { googleDriveService } from '../services/googleDriveService.ts';

export interface UseResumeDownloadReturn {
  downloadResume: () => Promise<void>;
  isDownloading: boolean;
  downloadProgress: number;
  error: string | null;
  clearError: () => void;
}

export const useResumeDownload = (): UseResumeDownloadReturn => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const downloadResume = useCallback(async () => {
    setIsDownloading(true);
    setError(null);
    setDownloadProgress(0);

    try {
      // Check if we have the required configuration
      if (!process.env.REACT_APP_GOOGLE_DRIVE_FILE_ID) {
        // Fallback to a direct download approach if no file ID is configured
        throw new Error('Resume download is currently unavailable. Please contact me directly.');
      }

      // Use the simple download method for public files
      await googleDriveService.downloadResume();
      
      setDownloadProgress(100);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to download resume';
      setError(errorMessage);
      console.error('Resume download error:', err);
    } finally {
      setIsDownloading(false);
      // Reset progress after a short delay
      setTimeout(() => setDownloadProgress(0), 2000);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    downloadResume,
    isDownloading,
    downloadProgress,
    error,
    clearError,
  };
};
