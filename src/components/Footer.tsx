import React from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    {
      icon: FiGithub,
      href: 'https://github.com/c0der-nb',
      label: 'GitHub'
    },
    {
      icon: FiLinkedin,
      href: 'https://linkedin.com/in/aditya-gupta-a05393186/',
      label: 'LinkedIn'
    },
    {
      icon: FiMail,
      href: 'mailto:gaditya060@gmail.com',
      label: 'Email'
    }
  ];

  return (
    <footer className="bg-dark-900 border-t border-dark-700">
      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-primary-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <FiArrowUp size={20} />
      </motion.button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h3 className="text-2xl font-bold gradient-text mb-4">
                Aditya Gupta
              </h3>
              <p className="text-gray-400 leading-relaxed max-w-md">
                Full Stack Software Engineer passionate about creating scalable applications 
                and contributing to innovative projects. Currently working on Google's Gemini LLM 
                at Turing.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex gap-4"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-dark-800 text-gray-400 rounded-lg hover:text-white hover:bg-primary-500 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="text-white font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 5 }}
                      className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.querySelector(link.href);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h4 className="text-white font-semibold mb-6">Get In Touch</h4>
              <div className="space-y-3 text-gray-400">
                <div>
                  <p className="text-sm">Email</p>
                  <a 
                    href="mailto:gaditya060@gmail.com"
                    className="hover:text-primary-400 transition-colors"
                  >
                    gaditya060@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-sm">Phone</p>
                  <a 
                    href="tel:+917042700209"
                    className="hover:text-primary-400 transition-colors"
                  >
                    +91-7042700209
                  </a>
                </div>
                <div>
                  <p className="text-sm">Location</p>
                  <p>Bangalore, India</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 pt-8 border-t border-dark-700 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="flex items-center gap-2 text-gray-400">
            <span>© {currentYear} Aditya Gupta. Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <FiHeart className="text-red-500" size={16} />
            </motion.div>
            <span>and React</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>Built with React, TypeScript & Tailwind CSS</span>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 p-6 bg-gradient-to-r from-primary-500/10 to-purple-500/10 rounded-xl border border-primary-500/20"
        >
          <div className="text-center">
            <p className="text-primary-300 font-medium mb-2">
              🚀 Currently Available for New Opportunities
            </p>
            <p className="text-gray-400 text-sm">
              Interested in full-stack development, LLM integration, or technical consulting? Let's connect!
            </p>
          </div>
        </motion.div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-500/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * 200,
            }}
            animate={{
              y: [null, -50, null],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </footer>
  );
};

export default Footer;
