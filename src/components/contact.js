import React from 'react';
import { motion } from 'framer-motion';

const EducationCertifications = () => {
  const education = [
    {
      id: 1,
      degree: 'Secondary School Leaving Certificate (SSLC)',
      institution: 'Indian Matric Higher Secondary School, GK-Road',
      duration: '2019-2020',
      description: 'Percentage: 99.4%'
    },
    {
      id: 2,
      degree: 'Higher Secondary Certificate (HSC)',
      institution: 'Indian Matric Higher Secondary School, GK-Road',
      duration: '2021-2022',
      description: 'Percentage: 90.5%'
    },
    {
      id: 3,
      degree: 'B.Tech Information Technology',
      institution: 'Kongu Engineering College, Perundurai',
      duration: '2022-2026',
      description: 'CGPA: 7.98 (Upto 5th Semester)'
    }
  ];

  const certificates = [
    {
      id: 1,
      name: 'MongoDB Database Developer',
      issuer: 'MongoDB University',
      description: 'Completed comprehensive training in MongoDB database development and administration',
      link: 'https://university.mongodb.com'
    },
    {
      id: 2,
      name: 'Oracle Database SQL Certified Associate',
      issuer: 'Oracle',
      description: 'Professional certification in Oracle SQL fundamentals and database management',
      link: 'https://education.oracle.com'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const lineVariants = {
    hidden: { scaleY: 0, originY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.5
      }
    }
  };

  const connectingLineVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        duration: 1,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="education" className="py-32 bg-gray-900 relative">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-dark to-transparent z-10"></div>
      
      <div className="container mx-auto px-4 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">Education & Certifications</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto"></div>
        </motion.div>

        {/* Education Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative mb-32"
        >
          <h3 className="text-2xl font-bold mb-10 text-center text-primary-400">Education</h3>
          {/* Timeline line with animation */}
          <motion.div 
            variants={lineVariants}
            className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-600 to-secondary-600 hidden md:block"
          ></motion.div>
          
          {/* Timeline items */}
          {education.map((item, index) => (
            <motion.div 
              key={item.id} 
              variants={itemVariants}
              className="mb-24 relative"
            >
              <div className={`md:flex items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Timeline dot with animation */}
                <motion.div 
                  variants={dotVariants}
                  className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary-500 border-4 border-gray-900 z-10"
                  whileHover={{ scale: 1.3 }}
                ></motion.div>
                
                {/* Content */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                  <motion.div 
                    className="card hover:shadow-neon transition-shadow duration-300"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h4 className="text-xl font-bold text-white mb-2">{item.degree}</h4>
                    <h5 className="text-lg font-semibold text-primary-400 mb-2">{item.institution}</h5>
                    <p className="text-gray-400 text-sm mb-4">{item.duration}</p>
                    <p className="text-gray-300">{item.description}</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative py-10"
        >
          <h3 className="text-3xl font-bold mb-16 text-center text-primary-400">Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {certificates.map((cert) => (
              <motion.div
                key={cert.id}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  transition: { type: "spring", stiffness: 200 }
                }}
                className="card hover:shadow-neon transition-all duration-300 p-8"
              >
                <div className="bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-lg p-6">
                  <h4 className="text-2xl font-bold text-white mb-4">{cert.name}</h4>
                  <h5 className="text-xl font-semibold text-primary-400 mb-4">{cert.issuer}</h5>
                  <p className="text-gray-300 mb-6 text-lg">{cert.description}</p>
                  <a 
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors duration-300 text-lg"
                  >
                    View Certificate 
                    <motion.span 
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      →
                    </motion.span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationCertifications;
