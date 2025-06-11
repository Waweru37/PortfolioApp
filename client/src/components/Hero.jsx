import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useDragControls } from 'framer-motion';
import { Github, Linkedin, Download } from 'lucide-react';

const LionIcon = () => <span role="img" aria-label="lion">🦁</span>;
const ElephantIcon = () => <span role="img" aria-label="elephant">🐘</span>;
const RhinoIcon = () => <span role="img" aria-label="rhino">🦏</span>;
const BuffaloIcon = () => <span role="img" aria-label="buffalo">🐃</span>;
const LeopardIcon = () => <span role="img" aria-label="leopard">🐆</span>;
const RocketIcon = () => <span role="img" aria-label="rocket">🚀</span>;

const DraggableIcon = ({ icon, initialStyle, type, index, onQuoteClick }) => {
  const [isRocketLaunching, setIsRocketLaunching] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragControls = useDragControls();

  const getUniqueAnimation = () => {
    if (type === 'rocket') {
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
          y: [0, -4, 0, -6, 0],
          rotate: [0, 1.5, -1.5, 0],
          scale: [1, 1.01, 1],
          transition: {
            duration: 3 + index * 0.3,
            repeat: Infinity,
            ease: 'easeInOut',
          }
        }
      };
    }
    return { animate: {} }; // No animations for other icons
  };

  const handleIconClick = () => {
    if (type === 'rocket' && !isRocketLaunching) {
      setIsRocketLaunching(true);
    } else if (type !== 'rocket') {
      onQuoteClick(type);
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
      animate={getUniqueAnimation().animate}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      onClick={handleIconClick}
    >
      <motion.div
        className={`${isDragging ? 'drop-shadow-2xl' : 'drop-shadow-lg'} transition-all duration-200`}
        animate={{
          filter: isDragging ? 'brightness(1.2) saturate(1.3)' : 'brightness(1) saturate(1)',
        }}
      >
        {icon}
      </motion.div>
      
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
      
      {isDragging && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            boxShadow: [
              '0 0 10px rgba(59, 130, 246, 0.3)',
              '0 0 20px rgba(139, 92, 246, 0.3)',
              '0 0 10px rgba(59, 130, 246, 0.3)',
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};

const EnhancedInteractiveHero = () => {
  const [isInView, setIsInView] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [currentQuote, setCurrentQuote] = useState({ text: '', author: '', animal: '' });
  const [isLoadingQuote, setIsLoadingQuote] = useState(false);
  const heroRef = useRef(null);
  const inView = useInView(heroRef, { once: true });

  useEffect(() => {
    if (inView) setIsInView(true);
  }, [inView]);

  const fetchQuote = async (animalType) => {
    setIsLoadingQuote(true);
    try {
      const response = await fetch('https://api.quotable.io/random?minLength=50&maxLength=150');
      if (response.ok) {
        const data = await response.json();
        setCurrentQuote({
          text: data.content,
          author: data.author,
          animal: animalType
        });
      } else {
        const fallbackResponse = await fetch('https://type.fit/api/quotes');
        const fallbackData = await fallbackResponse.json();
        const randomQuote = fallbackData[Math.floor(Math.random() * fallbackData.length)];
        setCurrentQuote({
          text: randomQuote.text,
          author: randomQuote.author ? randomQuote.author.replace(', type.fit', '') : 'Unknown',
          animal: animalType
        });
      }
    } catch (error) {
      const localQuotes = {
        lion: {
          text: "Courage is not the absence of fear, but the triumph over it. The brave man is not he who does not feel afraid, but he who conquers that fear.",
          author: "Nelson Mandela"
        },
        elephant: {
          text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
          author: "Nelson Mandela"
        },
        rhino: {
          text: "Strength does not come from physical capacity. It comes from an indomitable will.",
          author: "Mahatma Gandhi"
        },
        buffalo: {
          text: "Unity is strength... when there is teamwork and collaboration, wonderful things can be achieved.",
          author: "Mattie Stepanek"
        },
        leopard: {
          text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
          author: "Winston Churchill"
        }
      };
      
      setCurrentQuote({
        text: localQuotes[animalType].text,
        author: localQuotes[animalType].author,
        animal: animalType
      });
    } finally {
      setIsLoadingQuote(false);
    }
  };

  const handleQuoteClick = async (animalType) => {
    await fetchQuote(animalType);
    setShowQuote(true);
  };

  const getAnimalWisdom = (animal) => {
    const wisdom = {
      lion: "🦁 The King's Wisdom",
      elephant: "🐘 Ancient Wisdom", 
      rhino: "🦏 Strength & Perseverance",
      buffalo: "🐃 Unity & Power",
      leopard: "🐆 Grace & Stealth"
    };
    return wisdom[animal] || "Wisdom";
  };

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
      <div className="absolute inset-0 bg-gradient-to-br from-gray/60 via-gray/40 to-gray/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray/80 via-transparent to-gray/20" />

      {floatingIcons.map(({ icon, style, type }, i) => (
        <DraggableIcon 
          key={i}
          icon={icon}
          initialStyle={style}
          type={type}
          index={i}
          onQuoteClick={handleQuoteClick}
        />
      ))}

      {showQuote && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowQuote(false)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <motion.div
            className="relative bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl rounded-2xl p-8 max-w-2xl w-full border border-white/20 shadow-2xl"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <motion.h3 
                className="text-2xl font-bold text-white mb-6 flex items-center justify-center gap-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {getAnimalWisdom(currentQuote.animal)}
              </motion.h3>
              
              {isLoadingQuote ? (
                <div className="flex items-center justify-center py-8">
                  <motion.div
                    className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="ml-3 text-white">Seeking wisdom...</span>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <blockquote className="text-lg text-gray-200 mb-6 leading-relaxed italic">
                    "{currentQuote.text}"
                  </blockquote>
                  <cite className="text-blue-300 font-medium">
                    — {currentQuote.author}
                  </cite>
                </motion.div>
              )}
              
              <motion.div 
                className="mt-8 flex gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  onClick={() => handleQuoteClick(currentQuote.animal)}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full transition-colors duration-300"
                  disabled={isLoadingQuote}
                >
                  Another Quote
                </button>
                <button
                  onClick={() => setShowQuote(false)}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-full transition-colors duration-300"
                >
                  Close
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}

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