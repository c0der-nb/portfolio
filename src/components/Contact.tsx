import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiGithub, FiSend, FiUser, FiMessageSquare, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import DownloadResumeButton from './DownloadResumeButton.tsx';
import { contactService, ContactFormData } from '../services/contactService.ts';

const Contact: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear any previous error/success messages when user starts typing
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setErrorMessage('');
      setSuccessMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
      // Validate form data
      const validationErrors = contactService.validateFormData(formData);
      if (validationErrors.length > 0) {
        setErrorMessage(validationErrors.join(', '));
        setSubmitStatus('error');
        return;
      }

      // Send email via API
      const response = await contactService.sendMessage(formData as ContactFormData);
      
      if (response.success) {
        // Success
        setSubmitStatus('success');
        setSuccessMessage(response.message || 'Thank you for your message! I\'ll get back to you soon.');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error(response.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FiMail,
      label: 'Email',
      value: 'gaditya060@gmail.com',
      href: 'mailto:gaditya060@gmail.com',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: FiPhone,
      label: 'Phone',
      value: '+91-7042700209',
      href: 'tel:+917042700209',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: FiMapPin,
      label: 'Location',
      value: 'Bangalore, India',
      href: '#',
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  const socialLinks = [
    {
      icon: FiLinkedin,
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/aditya-gupta-a05393186/',
      color: 'hover:text-blue-500'
    },
    {
      icon: FiGithub,
      name: 'GitHub',
      href: 'https://github.com/c0der-nb',
      color: 'hover:text-gray-400'
    }
  ];

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
    <section id="contact" className="section-padding bg-dark-800/50">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Let's discuss how we can work together to bring your ideas to life
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full mt-6"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="glass-effect rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="text-3xl">📞</span>
                Contact Information
              </h3>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-dark-700/50 hover:bg-dark-700 transition-all duration-300 group"
                  >
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${info.color} text-white`}>
                      <info.icon size={20} />
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">{info.label}</div>
                      <div className="text-white font-medium group-hover:text-primary-400 transition-colors">
                        {info.value}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-gray-700">
                <h4 className="text-white font-semibold mb-4">Follow Me</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-3 bg-dark-700 rounded-lg text-gray-400 ${social.color} transition-all duration-300 hover:shadow-lg`}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Quick Info */}
              <div className="mt-8 p-6 bg-gradient-to-r from-primary-500/10 to-purple-500/10 rounded-xl border border-primary-500/20">
                <h4 className="text-white font-semibold mb-3">💼 Currently</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Full Stack Engineer at Turing, contributing to Google's Gemini LLM. 
                  Available for freelance projects and consulting opportunities.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <div className="glass-effect rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="text-3xl">✉️</span>
                Send Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3"
                  >
                    <FiCheckCircle className="text-green-500" size={20} />
                    <p className="text-green-400 font-medium">{successMessage}</p>
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3"
                  >
                    <FiAlertCircle className="text-red-500" size={20} />
                    <p className="text-red-400 font-medium">{errorMessage}</p>
                  </motion.div>
                )}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-dark-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-300"
                    />
                  </div>

                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your Email"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-dark-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="relative">
                  <FiMessageSquare className="absolute left-3 top-4 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Subject"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-dark-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-300"
                  />
                </div>

                <div className="relative">
                  <FiMessageSquare className="absolute left-3 top-4 text-gray-400" size={18} />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your Message"
                    rows={6}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-dark-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-300 resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-primary-500 to-purple-500 text-white py-4 px-8 rounded-lg font-semibold flex items-center justify-center gap-3 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend size={18} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>

              {/* Additional Info */}
              <div className="mt-8 p-4 bg-dark-700/50 rounded-lg">
                <p className="text-gray-300 text-sm text-center">
                  📧 Typically respond within 24 hours
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <div className="glass-effect rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Whether you need a full-stack application, API development, or technical consulting, 
              I'm here to help bring your vision to life with cutting-edge technologies.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href="mailto:gaditya060@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 hover:shadow-lg transition-all"
              >
                <FiMail size={20} />
                Email Me
              </motion.a>
              <motion.a
                href="tel:+917042700209"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-primary-500 text-primary-400 px-8 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-primary-500 hover:text-white transition-all"
              >
                <FiPhone size={20} />
                Call Me
              </motion.a>
              <DownloadResumeButton variant="secondary" size="md" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
