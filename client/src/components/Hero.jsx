import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useDragControls } from 'framer-motion';
import { Github, Linkedin, Download } from 'lucide-react';

const LionIcon = () => <span role="img" aria-label="lion">🦁</span>;
const ElephantIcon = () => <span role="img" aria-label="elephant">🐘</span>;
const RhinoIcon = () => <span role="img" aria-label="rhino">🦏</span>;
const BuffaloIcon = () => <span role="img" aria-label="buffalo">🐃</span>;
const LeopardIcon = () => <span role="img" aria-label="leopard">🐆</span>;
const RocketIcon = () => <span role="img" aria-label="rocket">🚀</span>;

const DraggableIcon = ({ icon, initialStyle, type, index }) => {
  const [isRocketLaunching, setIsRocketLaunching] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragControls = useDragControls();

  const getUniqueAnimation = () => {
    switch (type) {
      case 'lion':
        return {
          animate: {
            rotate: [0, 5, -5, 5, 0],
            scale: [1, 1.1, 1, 1.1, 1],
            transition: {
              duration: 3 + index * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          }
        };
      case 'elephant':
        return {
          animate: {
            y: [0, -10, 0, -15, 0],
            rotate: [0, 2, -2, 0],
            transition: {
              duration: 4 + index * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          }
        };
      case 'rhino':
        return {
          animate: {
            x: [0, 8, 0, -8, 0],
            rotate: [0, -3, 3, 0],
            transition: {
              duration: 3.5 + index * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          }
        };
      case 'buffalo':
        return {
          animate: {
            scale: [1, 1.05, 1, 1.08, 1],
            y: [0, -5, 0, -8, 0],
            transition: {
              duration: 5 + index * 0.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          }
        };
      case 'leopard':
        return {
          animate: {
            rotate: [0, 10, -10, 5, 0],
            x: [0, 5, -5, 0],
            y: [0, -3, 3, 0],
            transition: {
              duration: 2.5 + index * 0.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          }
        };
      case 'rocket':
        return isRocketLaunching ? {
          animate: {
            y: [0, -200, -400, -600],
            rotate: [0, 15, -15, 0],
            scale: [1, 0.8, 0.6, 0.3],
            transition: {
              duration: 3,
              ease: 'easeOut',
              onComplete: () => {
                setTimeout(() => {
                  setIsRocketLaunching(false);
                }, 1000);
              }
            }
          }
        } : {
          animate: {
            y: [0, -8, 0, -12, 0],
            rotate: [0, 3, -3, 0],
            scale: [1, 1.05, 1],
            transition: {
              duration: 2 + index * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          }
        };
      default:
        return {};
    }
  };

  const handleRocketClick = () => {
    if (type === 'rocket' && !isRocketLaunching) {
      setIsRocketLaunching(true);
    }
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: type === 'rocket' ? [0, 360] : [0, 15, -15, 0],
      transition: {
        duration: type === 'rocket' ? 0.5 : 0.3,
        ease: 'easeInOut'
      }
    },
    tap: {
      scale: 0.9,
    },
    drag: {
      scale: 1.1,
      zIndex: 50,
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    }
  };

  return (
    <motion.div
      className="absolute text-3xl md:text-4xl lg:text-5xl z-30 cursor-grab active:cursor-grabbing select-none"
      style={initialStyle}
      drag
      dragControls={dragControls}
      dragConstraints={{
        top: -50,
        left: -50,
        right: window.innerWidth - 100,
        bottom: window.innerHeight - 100,
      }}
      dragElastic={0.1}
      whileHover="hover"
      whileTap="tap"
      whileDrag="drag"
      variants={iconVariants}
      {...getUniqueAnimation()}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      onClick={handleRocketClick}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        ...getUniqueAnimation().animate 
      }}
      transition={{ 
        opacity: { delay: index * 0.2, duration: 0.5 },
        scale: { delay: index * 0.2, duration: 0.5 },
        ...getUniqueAnimation().animate?.transition
      }}
    >
      <motion.div
        className={`${isDragging ? 'drop-shadow-2xl' : 'drop-shadow-lg'} transition-all duration-200`}
        animate={{
          filter: isDragging ? 'brightness(1.2) saturate(1.3)' : 'brightness(1) saturate(1)',
        }}
      >
        {icon}
      </motion.div>
      
      {/* Special effects for rocket */}
      {type === 'rocket' && isRocketLaunching && (
        <motion.div
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 1, 0], 
            scale: [0, 1, 2, 3],
            y: [0, 20, 40, 60]
          }}
          transition={{ duration: 3, ease: 'easeOut' }}
        >
          <span className="text-2xl">🔥</span>
        </motion.div>
      )}
      
      {/* Particle trail effect for dragging */}
      {isDragging && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            boxShadow: [
              '0 0 20px rgba(59, 130, 246, 0.5)',
              '0 0 40px rgba(139, 92, 246, 0.5)',
              '0 0 20px rgba(59, 130, 246, 0.5)',
            ]
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};

const EnhancedInteractiveHero = () => {
  const [isInView, setIsInView] = useState(false);
  const heroRef = useRef(null);
  const inView = useInView(heroRef, { once: true });

  useEffect(() => {
    if (inView) setIsInView(true);
  }, [inView]);

  const floatingIcons = [
    { icon: <LionIcon />, style: { top: '10%', left: '8%' }, type: 'lion' },
    { icon: <ElephantIcon />, style: { top: '20%', right: '8%' }, type: 'elephant' },
    { icon: <RhinoIcon />, style: { bottom: '15%', left: '5%' }, type: 'rhino' },
    { icon: <BuffaloIcon />, style: { bottom: '20%', right: '5%' }, type: 'buffalo' },
    { icon: <LeopardIcon />, style: { top: '30%', left: '50%' }, type: 'leopard' },
    { icon: <RocketIcon />, style: { bottom: '10%', left: '45%' }, type: 'rocket' },
  ];

  return (
    <section
      ref={heroRef}
      id="hero"
      role="region"
      aria-label="Interactive Hero Section - Mark Waweru Thuku Portfolio"
      className="relative min-h-screen bg-cover bg-center bg-fixed flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 overflow-hidden bg-gray-900 bg-opacity-20 p-10 rounded-xl shadow-xl"
    >
      {/* Background overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray/60 via-gray/40 to-gray/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray/80 via-transparent to-gray/20" />

      {/* Interactive floating icons */}
      {floatingIcons.map(({ icon, style, type }, i) => (
        <DraggableIcon 
          key={i}
          icon={icon}
          initialStyle={style}
          type={type}
          index={i}
        />
      ))}

      {/* Instructions tooltip */}
      <motion.div
        className="absolute top-6 right-6 z-30 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm max-w-xs"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
      >
        <p className="font-medium mb-1">🎮 Interactive Icons!</p>
        <p className="text-xs text-gray-300">Drag the animals and click the rocket 🚀</p>
      </motion.div>

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 drop-shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Mark Waweru Thuku
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-slate-300 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Software Engineer · Business Strategist · Solutions Architect
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <a
            href="#projects"
            className="inline-flex items-center justify-center px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
          >
            Explore My Work
          </a>
          <a
            href="/Mark-Waweru-Thuku-Resume.pdf"
            download
            className="inline-flex items-center justify-center px-6 py-3 text-white bg-gray-700 rounded-full shadow-lg font-semibold hover:bg-gray-600 transition-all duration-300"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Resume
          </a>
        </motion.div>

        <motion.div
          className="flex justify-center space-x-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          <motion.a
            href="https://github.com/Waweru37"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/10 border border-white/20 text-white shadow-md"
            whileHover={{
              scale: 1.15,
              boxShadow: '0 0 15px #0d9488',
            }}
            whileTap={{ scale: 0.9 }}
          >
            <Github className="w-6 h-6" />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/markwaweru37/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/10 border border-white/20 text-white shadow-md"
            whileHover={{
              scale: 1.15,
              boxShadow: '0 0 15px #6366f1',
            }}
            whileTap={{ scale: 0.9 }}
          >
            <Linkedin className="w-6 h-6" />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 z-40"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="flex flex-col items-center cursor-pointer group"
          whileHover={{ scale: 1.1 }}
          onClick={() => {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <div className="w-8 h-12 border-2 border-white/40 rounded-full flex justify-center mb-3">
            <motion.div
              className="w-1.5 h-4 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full mt-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
          <span className="text-sm font-medium">Scroll to Explore</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default EnhancedInteractiveHero;