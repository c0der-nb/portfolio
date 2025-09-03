import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiCheck, FiAlertCircle, FiX } from 'react-icons/fi';
import { useResumeDownload } from '../hooks/useResumeDownload.ts';

interface DownloadResumeButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const DownloadResumeButton: React.FC<DownloadResumeButtonProps> = ({
  variant = 'secondary',
  size = 'md',
  className = '',
}) => {
  const { downloadResume, isDownloading, downloadProgress, error, clearError } = useResumeDownload();

  const handleDownload = async () => {
    if (error) {
      clearError();
    }
    await downloadResume();
  };

  const baseClasses = 'font-semibold flex items-center gap-2 transition-all duration-300 rounded-full relative';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary-600 to-purple-600 text-white hover:from-primary-700 hover:to-purple-700',
    secondary: 'border-2 border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-4',
    lg: 'px-10 py-5 text-lg',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const getButtonContent = () => {
    if (isDownloading) {
      return (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="flex items-center justify-center flex-shrink-0"
            style={{ 
              width: iconSizes[size], 
              height: iconSizes[size],
              display: 'inline-flex'
            }}
          >
            <FiDownload size={iconSizes[size]} />
          </motion.div>
          <span>Downloading...</span>
          {downloadProgress > 0 && (
            <span className="text-xs ml-1">({Math.round(downloadProgress)}%)</span>
          )}
        </>
      );
    }

    if (error) {
      return (
        <>
          <FiAlertCircle size={iconSizes[size]} className="text-red-400" />
          <span>Retry Download</span>
        </>
      );
    }

    if (downloadProgress === 100) {
      return (
        <>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <FiCheck size={iconSizes[size]} className="text-green-400" />
          </motion.div>
          <span>Downloaded!</span>
        </>
      );
    }

    return (
      <>
        <FiDownload size={iconSizes[size]} />
        <span>Download Resume</span>
      </>
    );
  };

  return (
    <div className="relative">
      <motion.button
        onClick={handleDownload}
        disabled={isDownloading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${
          isDownloading ? 'opacity-80 cursor-not-allowed' : ''
        } ${error ? 'border-red-500 text-red-400 hover:bg-red-500 hover:text-white' : ''} overflow-hidden`}
      >
        {/* Progress Bar Background */}
        {isDownloading && downloadProgress > 0 && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${downloadProgress}%` }}
            className="absolute inset-0 bg-white/20 rounded-full z-0"
            transition={{ duration: 0.3 }}
          />
        )}
        
        {/* Button Content */}
        <div className="relative z-10 flex items-center gap-2">
          {getButtonContent()}
        </div>
      </motion.button>

      {/* Error Toast */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="absolute top-full left-0 right-0 mt-2 p-3 bg-red-500/90 backdrop-blur-md text-white text-sm rounded-lg border border-red-400/30 z-50"
          >
            <div className="flex items-start gap-2">
              <FiAlertCircle size={16} className="mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium">Download Failed</p>
                <p className="text-red-100 text-xs mt-1">{error}</p>
              </div>
              <button
                onClick={clearError}
                className="text-red-200 hover:text-white transition-colors"
              >
                <FiX size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DownloadResumeButton;
