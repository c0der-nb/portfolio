import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

  const stats = [
    { number: '3.5+', label: 'Years Experience' },
    { number: '10+', label: 'Projects Completed' },
    { number: '5+', label: 'Technologies Mastered' },
    { number: '100%', label: 'Client Satisfaction' },
  ];

  return (
    <section id="about" className="section-padding bg-dark-800/50">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">About Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="glass-effect rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-primary-400">
                Full Stack Engineer at Turing
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Currently contributing to Google's Gemini LLM under Google DeepMind initiatives. 
                I architect and develop scalable full-stack features using cutting-edge technologies 
                like Node.js, Python (Flask), ReactJS, and TypeScript.
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                My expertise spans from building robust APIs and backend services to designing 
                high-performance UI components. I'm passionate about optimizing infrastructure 
                for performance and cost efficiency while maintaining code quality through 
                comprehensive testing and CI/CD practices.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Full Stack Development', 'LLM Integration', 'AWS Deployment', 'Team Leadership'].map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.05 }}
                    className="bg-primary-500/20 text-primary-300 px-3 py-1 rounded-full text-sm border border-primary-500/30"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            <motion.div
              variants={itemVariants}
              className="glass-effect rounded-2xl p-6"
            >
              <h4 className="text-xl font-semibold mb-4 text-white">Key Achievements</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-primary-400 mt-1">▶</span>
                  <span>Reduced execution time for millions of patient records by 30-40% through optimization</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-400 mt-1">▶</span>
                  <span>Decreased repository size by 40% through successful Yarn PnP migration</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-400 mt-1">▶</span>
                  <span>Led technical discussions and mentored new engineers</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="glass-effect rounded-xl p-6 text-center card-hover"
                >
                  <div className="text-3xl font-bold gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Education */}
            <motion.div
              variants={itemVariants}
              className="glass-effect rounded-2xl p-8"
            >
              <h4 className="text-xl font-semibold mb-4 text-white flex items-center gap-3">
                🎓 Education
              </h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-primary-400">
                    B.Tech in Computer Science and Engineering
                  </h5>
                  <p className="text-gray-300">
                    Kalinga Institute of Industrial Technology, Bhubaneswar
                  </p>
                  <p className="text-gray-400 text-sm">May 2018 - May 2022</p>
                </div>
              </div>
            </motion.div>

            {/* Current Focus */}
            <motion.div
              variants={itemVariants}
              className="glass-effect rounded-2xl p-8"
            >
              <h4 className="text-xl font-semibold mb-4 text-white flex items-center gap-3">
                🚀 Current Focus
              </h4>
              <div className="space-y-3 text-gray-300">
                <p>• Contributing to Google's Gemini LLM development</p>
                <p>• Exploring advanced LLM integration techniques</p>
                <p>• Building scalable cloud infrastructure on AWS</p>
                <p>• Mentoring junior developers and leading technical initiatives</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
