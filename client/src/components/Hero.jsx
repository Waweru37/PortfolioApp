import React, { useState, useEffect, useCallback, memo, useRef } from 'react';
import { motion, useReducedMotion, useInView, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Download, Volume2, VolumeX } from 'lucide-react';


const EnhancedInteractiveHero = () => {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const heroRef = useRef(null);
  const inView = useInView(heroRef, { once: true });

  useEffect(() => {
    if (inView) setIsInView(true);
  }, [inView]);

  return (
    <section
      ref={heroRef}
      id="hero"
      role="region"
      aria-label="Interactive Hero Section - Mark Waweru Thuku Portfolio"
      className="relative min-h-screen bg-cover bg-center bg-fixed flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 overflow-hidden bg-gray-900 bg-opacity-20 p-10 rounded-xl shadow-xl"
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray/60 via-gray/40 to-gray/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray/80 via-transparent to-gray/20" />

      {/* Sound toggle */}
      <motion.button
        className="absolute top-6 right-6 z-30 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors"
        onClick={() => setSoundEnabled(!soundEnabled)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={`${soundEnabled ? 'Disable' : 'Enable'} sound effects`}
      >
        {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
      </motion.button>

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
            className="inline-flex items-center justify-center px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg font-semibold"
          >
            Explore My Work
          </a>
          <a
            href="/Mark-Waweru-Thuku-Resume.pdf"
            download
            className="inline-flex items-center justify-center px-6 py-3 text-white bg-gray-700 rounded-full shadow-lg font-semibold"
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
          <a
            href="https://github.com/Waweru37"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20"
          >
            <Github className="w-6 h-6 text-white" />
          </a>
          <a
            href="https://www.linkedin.com/in/markwaweru37/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20"
          >
            <Linkedin className="w-6 h-6 text-white" />
          </a>
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
