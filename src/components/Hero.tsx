import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi';
import DownloadResumeButton from './DownloadResumeButton.tsx';

const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-primary-900/20 to-purple-900/20">
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: Math.random()
              }}
              animate={{
                y: [null, Math.random() * window.innerHeight],
                opacity: [null, Math.random(), 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4">
            <span className="block text-white">Hi, I'm</span>
            <span className="block gradient-text animate-gradient bg-gradient-to-r from-primary-400 via-purple-500 to-pink-500 bg-300% text-transparent bg-clip-text">
              Aditya Gupta
            </span>
          </h1>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Full Stack Software Engineer with 3.5 years of experience crafting 
            <span className="text-primary-400 font-semibold"> scalable applications </span>
            using ReactJS, Angular, Python, TypeScript, and modern technologies
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-12">
          <div className="flex flex-wrap justify-center items-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <FiMail className="text-primary-400" />
              <span>gaditya060@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <FiPhone className="text-primary-400" />
              <span>+91-7042700209</span>
            </div>
            <div className="text-primary-400">📍 Bangalore, India</div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-6 mb-12">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-primary-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:from-primary-700 hover:to-purple-700 transition-all duration-300"
            onClick={() => window.open('#contact', '_self')}
          >
            <FiMail size={20} />
            Get In Touch
          </motion.button>

          <DownloadResumeButton variant="secondary" size="md" />
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-center gap-6 mb-16">
          <motion.a
            href="https://github.com/c0der-nb"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 360 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <FiGithub size={28} />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/aditya-gupta-a05393186/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: -360 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <FiLinkedin size={28} />
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="flex flex-col items-center gap-2 mt-8"
        >
          {/* Mouse Icon */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center items-start pt-2 relative"
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 bg-white/60 rounded-full"
            />
          </motion.div>
          
          {/* Scroll Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="text-white/50 text-xs font-light tracking-wider"
          >
            SCROLL
          </motion.div>
          
          {/* Arrow Indicator */}
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/40"></div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
