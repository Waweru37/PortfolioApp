// src/components/StoryModal.jsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StoryModal = ({ story, isOpen, onClose }) => {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowDetails(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowDetails(false);
    }
  }, [isOpen]);

  if (!story) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="story-title"
          aria-describedby="story-description"
        >
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />
          <motion.div
            className="relative bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl rounded-3xl p-8 max-w-lg w-full border border-white/20 shadow-2xl"
            initial={{ scale: 0.7, opacity: 0, y: 50, rotateX: -15 }}
            animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
            exit={{ scale: 0.7, opacity: 0, y: 50, rotateX: -15 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${story.color} opacity-10 rounded-3xl`} />
            <div className="relative z-10 text-center">
              <motion.div 
                className="text-7xl mb-6"
                animate={{ scale: [1, 1.1, 1], rotateY: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {story.icon}
              </motion.div>
              <h3 id="story-title" className="text-3xl font-bold text-white mb-4 tracking-wide">
                {story.title}
              </h3>
              <p id="story-description" className="text-gray-300 mb-6 leading-relaxed text-lg">
                {story.description}
              </p>
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4 mb-6"
                  >
                    <div className={`bg-gradient-to-r ${story.color} bg-opacity-20 rounded-xl p-5 border border-white/20`}>
                      <p className="text-white font-semibold text-lg mb-2">Key Achievement:</p>
                      <p className="text-blue-200">{story.achievement}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <p className="text-white font-medium mb-3">Tech Stack & Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {story.techStack.map((tech, index) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="px-3 py-1 bg-blue-600/30 text-blue-200 rounded-full text-sm border border-blue-400/30"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.button
                onClick={onClose}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full transition-all duration-300 font-semibold shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,255,0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                Continue Journey
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StoryModal;