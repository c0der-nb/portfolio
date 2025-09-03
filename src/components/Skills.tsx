import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: '💻',
      skills: [
        { name: 'JavaScript', level: 95, color: 'from-yellow-400 to-yellow-600' },
        { name: 'TypeScript', level: 90, color: 'from-blue-400 to-blue-600' },
        { name: 'Python', level: 92, color: 'from-green-400 to-green-600' },
        { name: 'C++', level: 80, color: 'from-blue-500 to-purple-600' },
        { name: 'SQL', level: 88, color: 'from-orange-400 to-red-500' },
        { name: 'HTML/CSS', level: 95, color: 'from-orange-500 to-pink-500' }
      ]
    },
    {
      title: 'Frameworks & Libraries',
      icon: '🚀',
      skills: [
        { name: 'ReactJS', level: 95, color: 'from-cyan-400 to-blue-500' },
        { name: 'NextJS', level: 85, color: 'from-gray-700 to-gray-900' },
        { name: 'Angular', level: 80, color: 'from-red-500 to-red-700' },
        { name: 'Flask', level: 88, color: 'from-gray-400 to-gray-600' },
        { name: 'Node.js', level: 85, color: 'from-green-500 to-green-700' },
        { name: 'RxJS', level: 75, color: 'from-purple-500 to-pink-500' }
      ]
    },
    {
      title: 'Databases & Cloud',
      icon: '☁️',
      skills: [
        { name: 'PostgreSQL', level: 90, color: 'from-blue-600 to-blue-800' },
        { name: 'SQL Server', level: 85, color: 'from-red-600 to-red-800' },
        { name: 'AWS', level: 82, color: 'from-orange-400 to-orange-600' },
        { name: 'AWS Glue', level: 80, color: 'from-purple-500 to-purple-700' }
      ]
    },
    {
      title: 'Tools & Technologies',
      icon: '🛠️',
      skills: [
        { name: 'Git/GitHub', level: 95, color: 'from-gray-700 to-black' },
        { name: 'Jenkins', level: 78, color: 'from-blue-500 to-blue-700' },
        { name: 'Jest', level: 85, color: 'from-red-500 to-red-700' },
        { name: 'Pytest', level: 80, color: 'from-green-600 to-green-800' },
        { name: 'Sqitch', level: 75, color: 'from-indigo-500 to-indigo-700' },
        { name: 'Bootstrap', level: 90, color: 'from-purple-600 to-purple-800' }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
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

  const skillVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
      width: `${level}%`,
      transition: {
        duration: 1.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="skills" className="section-padding bg-dark-800/50">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Skills & Technologies</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Technologies I work with to build amazing digital experiences
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full mt-6"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="glass-effect rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="text-3xl">{category.icon}</span>
                <h3 className="text-2xl font-bold text-white">{category.title}</h3>
              </div>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">{skill.name}</span>
                      <span className="text-primary-400 text-sm font-semibold">{skill.level}%</span>
                    </div>
                    
                    <div className="h-3 bg-dark-700 rounded-full overflow-hidden">
                      <motion.div
                        variants={skillVariants}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        custom={skill.level}
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                      >
                        <motion.div
                          animate={inView ? {
                            x: ["0%", "100%", "0%"],
                          } : {}}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "easeInOut"
                          }}
                          className="absolute inset-0 bg-white/20 w-1/4 rounded-full"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Section */}
        <motion.div variants={itemVariants} className="mt-12">
          <div className="glass-effect rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-3xl">🎯</span>
              Specialized Skills
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                'LLM Integration & Benchmarking',
                'Agile SDLC',
                'Multi-threading & Batch Processing',
                'Memory Optimization',
                'CI/CD Pipelines',
                'Code Review & Mentoring',
                'Technical Documentation',
                'Problem Solving & Debugging',
                'Performance Optimization'
              ].map((skill, index) => (
                <motion.div
                  key={skill}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  className="bg-gradient-to-r from-primary-500/20 to-purple-500/20 border border-primary-500/30 rounded-lg p-4 text-center"
                >
                  <span className="text-white font-medium">{skill}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          variants={itemVariants}
          className="mt-12 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="space-y-2"
            >
              <div className="text-3xl font-bold gradient-text">15+</div>
              <div className="text-gray-400 text-sm">Technologies</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="space-y-2"
            >
              <div className="text-3xl font-bold gradient-text">5+</div>
              <div className="text-gray-400 text-sm">Frameworks</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="space-y-2"
            >
              <div className="text-3xl font-bold gradient-text">3+</div>
              <div className="text-gray-400 text-sm">Databases</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="space-y-2"
            >
              <div className="text-3xl font-bold gradient-text">10+</div>
              <div className="text-gray-400 text-sm">Tools</div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;
