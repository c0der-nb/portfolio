import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCalendar, FiMapPin, FiBriefcase } from 'react-icons/fi';

const Experience: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const experiences = [
    {
      title: 'Full Stack Engineer',
      company: 'Turing',
      location: 'Bangalore, India',
      period: 'December 2024 - Present',
      description: 'Contributing to Google\'s Gemini LLM under Google DeepMind initiatives.',
      achievements: [
        'Architected and developed scalable full-stack features using Node.js, Python (Flask), ReactJS, Angular and TypeScript',
        'Built robust APIs and backend services with Flask and Node.js, integrating seamlessly with frontend components',
        'Designed and implemented reusable, high performance UI components using ReactJS and TypeScript',
        'Deployed and maintained applications on AWS, optimizing infrastructure for performance and cost efficiency',
        'Wrote evals and scripts for training and benchmarking LLMs, improving model evaluation efficiency',
        'Led technical discussions, peer code reviews, and mentored new engineers',
        'Integrated CI/CD pipelines and ensured comprehensive testing coverage using Jest and Pytest'
      ],
      technologies: ['Node.js', 'Python', 'Flask', 'ReactJS', 'Angular', 'TypeScript', 'AWS', 'Jest', 'Pytest'],
      color: 'from-blue-500 to-purple-600'
    },
    {
      title: 'Associate Software Engineer',
      company: 'Greenway Health',
      location: 'Bangalore, India',
      period: 'July 2022 - December 2024',
      description: 'Developed scalable SaaS solutions and optimized data processing systems.',
      achievements: [
        'Developed reusable components for a SaaS product',
        'Developed AWS Glue job components in Python for data export',
        'Optimized the glue job performance by implementing multi-threading and batch processing',
        'Reduced the overall execution time for millions of patient records by 30-40%',
        'Refactored and restructured a python component to follow best practices and design patterns',
        'Developed UI components in Angular and DB Schema in PostgreSQL',
        'Proposed a successful migration of Yarn to Yarn PnP by doing a POC',
        'Migrating to Yarn PnP helped decrease the overall size of repository by 40%',
        'Optimized the memory usage at client side in Angular by efficiently managing memory consumption',
        'Written unit tests for UI in Jest and documented technical aspects on Confluence'
      ],
      technologies: ['Python', 'Angular', 'PostgreSQL', 'AWS Glue', 'Jest', 'Yarn PnP'],
      color: 'from-green-500 to-teal-600'
    },
    {
      title: 'Software Engineer Trainee',
      company: 'Greenway Health',
      location: 'Bangalore, India',
      period: 'January 2022 - July 2022',
      description: 'Started career as a trainee, focusing on automation and data integration.',
      achievements: [
        'Proposed optimal solution to a raw problem being faced by the business team',
        'Built one single executable application using Python for automating the data flow',
        'Integrated multiple data sources (Twilio, Google Analytics, SQL Server, New Relic) with DOMO',
        'Created comprehensive dashboards for Greenway Patient Portal and Telehealth'
      ],
      technologies: ['Python', 'SQL Server', 'Google Analytics', 'Twilio', 'New Relic', 'DOMO'],
      color: 'from-purple-500 to-pink-600'
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
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="experience" className="section-padding bg-dark-900">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Work Experience</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            My professional journey in software development and engineering
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full mt-6"></div>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary-500 to-purple-500"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 top-1/2">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className={`w-4 h-4 rounded-full bg-gradient-to-r ${exp.color} border-4 border-dark-900 shadow-lg`}
                  />
                </div>

                {/* Content Card */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`glass-effect rounded-2xl p-8 w-full md:w-5/12 ml-12 md:ml-0 ${
                    index % 2 === 0 ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${exp.color}`}>
                        <FiBriefcase className="text-white" size={20} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                        <p className="text-primary-400 font-semibold">{exp.company}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
                    <div className="flex items-center gap-1">
                      <FiCalendar size={14} />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiMapPin size={14} />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6">{exp.description}</p>

                  <div className="space-y-3 mb-6">
                    {exp.achievements.slice(0, 4).map((achievement, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ delay: 0.1 * i }}
                        className="flex items-start gap-3"
                      >
                        <span className="text-primary-400 mt-1 text-sm">▶</span>
                        <span className="text-gray-300 text-sm leading-relaxed">{achievement}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <motion.span
                        key={tech}
                        whileHover={{ scale: 1.05 }}
                        className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${exp.color} text-white`}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="glass-effect rounded-xl p-6 text-center"
          >
            <div className="text-3xl font-bold gradient-text mb-2">3.5+</div>
            <div className="text-gray-400">Years of Experience</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="glass-effect rounded-xl p-6 text-center"
          >
            <div className="text-3xl font-bold gradient-text mb-2">2</div>
            <div className="text-gray-400">Companies</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="glass-effect rounded-xl p-6 text-center"
          >
            <div className="text-3xl font-bold gradient-text mb-2">40%</div>
            <div className="text-gray-400">Performance Improvement</div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Experience;
