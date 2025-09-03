import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiExternalLink, FiGithub, FiCalendar, FiCode, FiDatabase, FiServer } from 'react-icons/fi';

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Event Management Platform',
      category: 'fullstack',
      description: 'A comprehensive event management platform with Google OAuth authentication, event creation, and real-time updates.',
      longDescription: 'Built with NextJS featuring server-side rendering, dynamic routing, and advanced caching strategies. Implemented Google OAuth for secure authentication and created a responsive design with Tailwind CSS.',
      image: '/api/placeholder/600/400',
      liveUrl: 'https://event-tracker-nine.vercel.app/',
      githubUrl: 'https://github.com/c0der-nb/event-tracker',
      technologies: ['NextJS', 'React', 'TypeScript', 'Tailwind CSS', 'Google OAuth', 'Vercel'],
      features: [
        'Google OAuth Integration',
        'Event Creation & Management',
        'Error Boundary Implementation',
        'REST API Integration',
        'Caching with Revalidation',
        'Responsive Design'
      ],
      date: 'Sep 2024',
      status: 'completed',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      title: 'Expense Tracker Frontend',
      category: 'frontend',
      description: 'A beautiful and responsive expense tracking application with interactive charts and categorization.',
      longDescription: 'Developed from Figma designs with pixel-perfect implementation. Features include expense categorization, interactive charts using Recharts, and responsive design for all devices.',
      image: '/api/placeholder/600/400',
      liveUrl: 'https://track-expense-woad-eta.vercel.app/',
      githubUrl: 'https://github.com/c0der-nb/expense-tracker',
      technologies: ['ReactJS', 'JavaScript', 'CSS', 'Recharts', 'Responsive Design'],
      features: [
        'Figma Design Implementation',
        'Add, Edit, Delete Expenses',
        'Category-based Organization',
        'Interactive Charts (Pie & Line)',
        'Responsive UI/UX',
        'Data Visualization'
      ],
      date: 'Jun 2024',
      status: 'completed',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 3,
      title: 'Expense Tracker API',
      category: 'backend',
      description: 'RESTful API backend for expense tracking with authentication, authorization, and PostgreSQL database.',
      longDescription: 'Built from scratch using Flask with comprehensive API documentation via Swagger. Implements JWT authentication, role-based authorization, and database migrations using SQLAlchemy.',
      image: '/api/placeholder/600/400',
      liveUrl: 'https://expense-tracker-rest.onrender.com/',
      githubUrl: 'https://github.com/c0der-nb/expense-tracker-rest',
      technologies: ['Python', 'Flask', 'PostgreSQL', 'SQLAlchemy', 'JWT', 'Swagger', 'Docker'],
      features: [
        'RESTful API Design',
        'JWT Authentication',
        'Role-based Authorization',
        'Database Migrations',
        'Swagger Documentation',
        'Multi-environment Config',
        'WSGI Deployment'
      ],
      date: 'Oct 2024',
      status: 'completed',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 4,
      title: 'Portfolio Website',
      category: 'frontend',
      description: 'This interactive portfolio website built with React, TypeScript, and beautiful animations.',
      longDescription: 'A modern, responsive portfolio website featuring smooth animations with Framer Motion, glassmorphism design, and optimized performance. Built with TypeScript for type safety.',
      image: '/api/placeholder/600/400',
      liveUrl: '#',
      githubUrl: '#',
      technologies: ['React', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 'Responsive Design'],
      features: [
        'Smooth Animations',
        'Glassmorphism Design',
        'Responsive Layout',
        'Interactive Elements',
        'Performance Optimized',
        'TypeScript Integration'
      ],
      date: 'Dec 2024',
      status: 'ongoing',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 5,
      title: 'QTify',
      category: 'frontend',
      description: 'A song-browsing application built from scratch using ReactJS paired with Material UI and Swiper to deliver a seamless and aesthetic user interface, offering songs from different albums and genres for music lovers.',
      longDescription: 'QTify is a song-browsing application built from scratch using ReactJS paired with Material UI and Swiper to deliver a seamless and aesthetic user interface, offering songs from different albums and genres for music lovers',
      image: '/api/placeholder/600/400',
      liveUrl: 'https://qtify-ui.vercel.app/',
      githubUrl: 'https://github.com/c0der-nb/qtify-ui',
      technologies: ['ReactJS', 'JavaScript', 'CSS', 'HTML', 'Material UI', 'Swiper', 'Vercel'],
      features: [
        'Song Browsing',
        'Material UI',
        'Swiper',
        'Responsive Design',
      ],
      date: 'Dec 2023',
      status: 'completed',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 6,
      title: 'QKart Frontend',
      category: 'frontend',
      description: 'QKart is an e-commerce application offering a variety of products for customers to choose from',
      longDescription: 'QKart is an e-commerce application offering a variety of products for customers to choose from',
      image: '/api/placeholder/600/400',
      liveUrl: 'https://gaditya060-me-qkart-frontend-v2.vercel.app/',
      githubUrl: 'https://github.com/c0der-nb/gaditya060-ME_QKART_FRONTEND_V2',
      technologies: ['ReactJS', 'JavaScript', 'CSS', 'HTML', 'Material UI', 'Swiper', 'Vercel'],
      features: [
        'Product Browsing',
        'Material UI',
        'Swiper',
        'Responsive Design',
      ],
      date: 'Nov 2023',
      status: 'completed',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects', icon: FiCode },
    { id: 'fullstack', name: 'Full Stack', icon: FiServer },
    { id: 'frontend', name: 'Frontend', icon: FiCode },
    { id: 'backend', name: 'Backend', icon: FiDatabase }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

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
    <section id="projects" className="section-padding bg-dark-900">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A showcase of my recent work and side projects demonstrating various technologies and skills
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full mt-6"></div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                filter === category.id
                  ? 'bg-gradient-to-r from-primary-500 to-purple-500 text-white shadow-lg'
                  : 'bg-dark-800 text-gray-400 hover:text-white hover:bg-dark-700'
              }`}
            >
              <category.icon size={18} />
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="glass-effect rounded-2xl overflow-hidden group"
              >
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-dark-800 to-dark-700 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl opacity-30">
                      {project.category === 'fullstack' && '🚀'}
                      {project.category === 'frontend' && '🎨'}
                      {project.category === 'backend' && '⚙️'}
                    </div>
                  </div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'completed' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    }`}>
                      {project.status === 'completed' ? 'Completed' : 'Ongoing'}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-primary-400 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                      <FiCalendar size={14} />
                      <span>{project.date}</span>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-dark-700 text-primary-300 text-sm rounded-full border border-primary-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-3 py-1 bg-dark-700 text-gray-400 text-sm rounded-full">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Key Features */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {project.features.slice(0, 4).map((feature, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <span className="text-primary-400 mt-1 text-xs">▶</span>
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-gradient-to-r from-primary-500 to-purple-500 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                    >
                      <FiExternalLink size={18} />
                      Live Demo
                    </motion.a>
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-3 border-2 border-gray-600 text-gray-300 rounded-lg font-medium flex items-center justify-center gap-2 hover:border-primary-500 hover:text-primary-400 transition-all"
                    >
                      <FiGithub size={18} />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Project Stats */}
        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center"
          >
            <div className="text-3xl font-bold gradient-text mb-2">4+</div>
            <div className="text-gray-400">Projects Completed</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center"
          >
            <div className="text-3xl font-bold gradient-text mb-2">10+</div>
            <div className="text-gray-400">Technologies Used</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center"
          >
            <div className="text-3xl font-bold gradient-text mb-2">100%</div>
            <div className="text-gray-400">Responsive Design</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center"
          >
            <div className="text-3xl font-bold gradient-text mb-2">24/7</div>
            <div className="text-gray-400">Live & Running</div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;
