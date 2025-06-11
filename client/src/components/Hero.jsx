import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useDragControls } from 'framer-motion';
import { Github, Linkedin, Download } from 'lucide-react';

const LionIcon = () => <span role="img" aria-label="lion">🦁</span>;
const ElephantIcon = () => <span role="img" aria-label="elephant">🐘</span>;
const RhinoIcon = () => <span role="img" aria-label="rhino">🦏</span>;
const BuffaloIcon = () => <span role="img" aria="label">🐃</span>;
const LeopardIcon = () => <span role="img" aria-label="leopard">🐆</span>;
const RocketIcon = () => <span role="img" aria-label="rocket">🚀</span>;
const UfoIcon = () => <span role="img" aria-label="ufo">🛸</span>;
const FormulaOneCarIcon = () => <span role="img" aria-label="formula one car">🏎️</span>;

// DraggableIcon component now accepts 'resetId' and 'onCompleteAnimation' prop
const DraggableIcon = ({ icon, initialStyle, type, onQuoteClick, onCompleteAnimation, resetId }) => {
  const [isRocketLaunching, setIsRocketLaunching] = useState(false);
  const [isUfoLaunching, setIsUfoLaunching] = useState(false);
  const [isF1CarSpeeding, setIsF1CarSpeeding] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragControls = useDragControls();

  const iconRef = useRef(null);
  const [randomizedInitialStyle, setRandomizedInitialStyle] = useState(initialStyle);

  useEffect(() => {
    // This effect runs once to store the initial position for fixed icons (animals)
    if (iconRef.current && initialStyle && !(type === 'rocket' || type === 'ufo' || type === 'f1car')) {
      iconRef.current.style.top = initialStyle.top || '';
      iconRef.current.style.bottom = initialStyle.bottom || '';
      iconRef.current.style.left = initialStyle.left || '';
      iconRef.current.style.right = initialStyle.right || '';
      iconRef.current.style.transform = initialStyle.transform || '';
    }
  }, [initialStyle, type]);

  // Effect to randomize positions for specific icon types on mount and when 'resetId' changes
  // The 'resetId' changing forces a re-randomization after an animation completes
  useEffect(() => {
    if (type === 'rocket' || type === 'ufo' || type === 'f1car') {
      const newTop = `${Math.random() * 60 + 10}%`; // 10% to 70% from top
      const newLeft = `${Math.random() * 80 + 10}%`; // 10% to 90% from left
      setRandomizedInitialStyle({ top: newTop, left: newLeft, position: 'absolute' });
    }
  }, [type, resetId]); // Dependency on resetId to re-randomize

  const getUniqueAnimation = () => {
    let idleScale = 0.8;
    if (type === 'f1car') idleScale = 0.7;

    // Helper to call the parent's animation complete handler
    const triggerParentReset = (animatedType) => {
      if (onCompleteAnimation) {
        onCompleteAnimation(animatedType);
      }
    };

    if (type === 'rocket') {
      return isRocketLaunching ? {
        animate: {
          y: [0, -200, -400, -600],
          rotate: [0, 15, -15, 0],
          scale: [1, 0.8, 0.6, 1], // Maintain scale
          opacity: [1, 1, 1, 1], // Maintain opacity (no fade out)
          transition: {
            duration: 3,
            ease: 'easeOut',
            onComplete: () => {
              triggerParentReset(type); // Call the helper which calls the prop
              setIsRocketLaunching(false);
            }
          }
        },
        initial: { ...randomizedInitialStyle, y: 0, rotate: 0, scale: idleScale, opacity: 1 }
      } : {
        animate: {
          y: [0, -4, 0, -6, 0],
          rotate: [0, 1.5, -1.5, 0],
          scale: [idleScale, idleScale + 0.01, idleScale],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }
        },
        initial: randomizedInitialStyle
      };
    } else if (type === 'ufo') {
      return isUfoLaunching ? {
        animate: {
            x: [0, 200, 400, 800],
            y: [0, -100, -300, -600],
            rotate: [0, 30, -30, 0],
            scale: [1, 0.7, 0.4, 1], // Maintain scale
            opacity: [1, 1, 1, 1], // Maintain opacity (no fade out)
            transition: {
                duration: 4,
                ease: 'easeOut',
                onComplete: () => {
                    triggerParentReset(type); // Call the helper which calls the prop
                    setIsUfoLaunching(false);
                }
            }
        },
        initial: { ...randomizedInitialStyle, x: 0, y: 0, rotate: 0, scale: idleScale, opacity: 1 }
      } : {
        animate: {
            y: [0, -7, 0, -5, 0],
            x: [0, 3, 0, -2, 0],
            rotate: [0, 2, -2, 0],
            scale: [idleScale, idleScale + 0.01, idleScale],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
            }
        },
        initial: randomizedInitialStyle
      };
    } else if (type === 'f1car') {
        return isF1CarSpeeding ? {
            animate: {
                x: [0, -300, -800, -1500],
                y: [0, 10, -20, 0],
                rotate: [0, -5, -10, -20],
                scale: [1, 0.8, 0.6, 1], // Maintain scale
                opacity: [1, 1, 1, 1], // Maintain opacity (no fade out)
                transition: {
                    duration: 2.5,
                    ease: 'easeOut',
                    onComplete: () => {
                      triggerParentReset(type); // Call the helper which calls the prop
                      setIsF1CarSpeeding(false);
                    }
                }
            },
            initial: { ...randomizedInitialStyle, x: 0, y: 0, rotate: 0, scale: idleScale, opacity: 1 }
        } : {
            animate: {
                x: [0, 2, 0, -3, 0],
                y: [0, -2, 0, 3, 0],
                rotate: [0, 1, -1, 0],
                scale: [idleScale, idleScale + 0.01, idleScale],
                transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }
            },
            initial: randomizedInitialStyle
        };
    }
    // For animal icons, their animation is fixed to initialStyle and they don't use resetId
    return { animate: {}, initial: initialStyle };
  };

  const handleIconClick = () => {
    if (type === 'rocket' && !isRocketLaunching) {
      setIsRocketLaunching(true);
    } else if (type === 'ufo' && !isUfoLaunching) {
      setIsUfoLaunching(true);
    } else if (type === 'f1car' && !isF1CarSpeeding) {
      setIsF1CarSpeeding(true);
    } else if (['lion', 'elephant', 'rhino', 'buffalo', 'leopard'].includes(type)) {
      onQuoteClick(type);
    }
  };

  const iconVariants = {
    hover: {
      scale: 1.05,
      rotate: type === 'rocket' ? [0, 360] : [0, 10, -10, 0],
      transition: {
        duration: type === 'rocket' ? 0.5 : 0.3,
        ease: 'easeInOut'
      }
    },
    tap: {
      scale: 0.9,
    },
    drag: {
      scale: 1.02,
      zIndex: 50,
      boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
    }
  };

  return (
    <motion.div
      ref={iconRef}
      className="absolute text-2xl md:text-3xl lg:text-4xl z-30 cursor-grab active:cursor-grabbing select-none"
      style={ (type === 'rocket' || type === 'ufo' || type === 'f1car') ? randomizedInitialStyle : initialStyle}
      drag
      dragControls={dragControls}
      dragConstraints={{
        top: -100,
        left: -100,
        right: window.innerWidth + 100,
        bottom: window.innerHeight + 100,
      }}
      dragElastic={0.1}
      whileHover="hover"
      whileTap="tap"
      whileDrag="drag"
      variants={iconVariants}
      animate={getUniqueAnimation().animate}
      initial={getUniqueAnimation().initial}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      onClick={handleIconClick}
    >
      <motion.div
        className={`${isDragging ? 'drop-shadow-xl' : 'drop-shadow-md'} transition-all duration-200`}
        animate={{
          filter: isDragging ? 'brightness(1.1) saturate(1.1)' : 'brightness(1) saturate(1)',
        }}
      >
        {icon}
      </motion.div>

      {/* Conditional rendering for animation effects (fire/zap/smoke) */}
      {(type === 'rocket' && isRocketLaunching) || (type === 'ufo' && isUfoLaunching) || (type === 'f1car' && isF1CarSpeeding) ? (
        <motion.div
          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 1, 0], // These effects can still fade out
            scale: [0, 1, 2, 3],
            y: [0, 20, 40, 60]
          }}
          transition={{ duration: 3, ease: 'easeOut' }}
        >
          {type === 'rocket' && <span className="text-xl">🔥</span>}
          {type === 'ufo' && <span className="text-xl">⚡</span>}
          {type === 'f1car' && <span className="text-xl">💨</span>}
        </motion.div>
      ) : null}

      {isDragging && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            boxShadow: [
              '0 0 5px rgba(59, 130, 246, 0.2)',
              '0 0 10px rgba(139, 92, 246, 0.2)',
              '0 0 5px rgba(59, 130, 246, 0.2)',
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

  // State for reset IDs for each interactive icon type
  const [rocketResetId, setRocketResetId] = useState(0);
  const [ufoResetId, setUfoResetId] = useState(0);
  const [f1CarResetId, setF1CarResetId] = useState(0);

  useEffect(() => {
    if (inView) setIsInView(true);
  }, [inView]);

  // Function to increment the reset ID for the specific icon type, passed to DraggableIcon
  const handleAnimationComplete = (type) => {
    // A small timeout ensures the animation visually completes before reset
    setTimeout(() => {
      if (type === 'rocket') {
        setRocketResetId(prev => prev + 1);
      } else if (type === 'ufo') {
        setUfoResetId(prev => prev + 1);
      } else if (type === 'f1car') {
        setF1CarResetId(prev => prev + 1);
      }
    }, 50); // Small delay to allow the animation to finish fully
  };


  const getBibleBookAndChapter = (category) => {
    const books = {
      proverbs: { name: 'Proverbs', chapters: 31 },
      psalms: { name: 'Psalm', chapters: 150 },
      newTestament: [
        { name: 'Matthew', chapters: 28 },
        { name: 'John', chapters: 21 },
        { name: 'Romans', chapters: 16 },
        { name: 'Ephesians', chapters: 6 },
        { name: 'Philippians', chapters: 4 },
        { name: 'Colossians', chapters: 4 },
      ]
    };

    let book;
    let chapter;

    if (category === 'proverbs') {
      book = books.proverbs.name;
      chapter = Math.floor(Math.random() * books.proverbs.chapters) + 1;
    } else if (category === 'psalms') {
      book = books.psalms.name;
      chapter = Math.floor(Math.random() * books.psalms.chapters) + 1;
    } else {
      const randomNtBook = books.newTestament[Math.floor(Math.random() * books.newTestament.length)];
      book = randomNtBook.name;
      chapter = Math.floor(Math.random() * randomNtBook.chapters) + 1;
    }
    return `${book} ${chapter}`;
  };

  const fetchQuote = async (animalType) => {
    setIsLoadingQuote(true);
    let quoteData = { text: '', author: '', animal: animalType };

    try {
      if (['lion', 'elephant', 'rhino', 'buffalo', 'leopard'].includes(animalType)) {
        let bibleCategory;
        if (animalType === 'lion' || animalType === 'rhino') {
          bibleCategory = 'proverbs';
        } else if (animalType === 'elephant' || animalType === 'buffalo') {
          bibleCategory = 'psalms';
        } else {
          bibleCategory = 'newTestament';
        }

        const bookAndChapter = getBibleBookAndChapter(bibleCategory);
        const response = await fetch(`https://bible-api.com/${encodeURIComponent(bookAndChapter)}?random=true`);

        if (response.ok) {
          const data = await response.json();
          if (data.verses && data.verses.length > 0) {
            const randomVerse = data.verses[Math.floor(Math.random() * data.verses.length)];
            quoteData.text = randomVerse.text;
            quoteData.author = `${randomVerse.bookname || data.bookname || bookAndChapter.split(' ')[0]} ${randomVerse.chapter}:${randomVerse.verse}`;
          } else {
            quoteData.text = `No verse found for ${bookAndChapter}.`;
            quoteData.author = 'The Bible';
          }
        } else {
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
          quoteData = {
            text: localQuotes[animalType].text,
            author: localQuotes[animalType].author,
            animal: animalType
          };
        }
      } else {
        const response = await fetch('https://api.quotable.io/random?minLength=50&maxLength=150');
        if (response.ok) {
          const data = await response.json();
          quoteData.text = data.content;
          quoteData.author = data.author;
        } else {
          const fallbackResponse = await fetch('https://type.fit/api/quotes');
          const fallbackData = await fallbackResponse.json();
          const randomQuote = fallbackData[Math.floor(Math.random() * fallbackData.length)];
          quoteData.text = randomQuote.text;
          quoteData.author = randomQuote.author ? randomQuote.author.replace(', type.fit', '') : 'Unknown';
        }
      }
    } catch (error) {
      console.error("Error fetching quote/verse:", error);
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
      quoteData = {
        text: localQuotes[animalType].text,
        author: localQuotes[animalType].author,
        animal: animalType
      };
    } finally {
      setCurrentQuote(quoteData);
      setIsLoadingQuote(false);
    }
  };

  const handleQuoteClick = async (animalType) => {
    await fetchQuote(animalType);
    setShowQuote(true);
  };

  const getAnimalWisdom = (animal) => {
    const wisdom = {
      lion: "🦁 Wisdom from Proverbs",
      elephant: "🐘 Wisdom from Psalms",
      rhino: "🦏 Wisdom from Proverbs",
      buffalo: "🐃 Wisdom from Psalms",
      leopard: "🐆 Wisdom from the New Testament"
    };
    return wisdom[animal] || "Wisdom";
  };

  const floatingIcons = [
    { icon: <LionIcon />, style: { top: '10%', left: '8%' }, type: 'lion' },
    { icon: <ElephantIcon />, style: { top: '20%', right: '8%' }, type: 'elephant' },
    { icon: <RhinoIcon />, style: { bottom: '15%', left: '5%' }, type: 'rhino' },
    { icon: <BuffaloIcon />, style: { bottom: '20%', right: '5%' }, type: 'buffalo' },
    { icon: <LeopardIcon />, style: { top: '25%', left: '50%', transform: 'translateX(-50%)' }, type: 'leopard' },

    { icon: <RocketIcon />, type: 'rocket' },
    { icon: <UfoIcon />, type: 'ufo' },
    { icon: <FormulaOneCarIcon />, type: 'f1car' },
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

      {/* Glowing Stars */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute bg-white rounded-full opacity-0"
          style={{
            width: `${Math.random() * 2 + 0.5}px`, // 0.5-2.5px
            height: `${Math.random() * 2 + 0.5}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            boxShadow: `0 0 ${Math.random() * 4 + 1}px rgba(255,255,255,0.7)`, // 1-5px glow
            zIndex: 0
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: Math.random() * 5
          }}
        />
      ))}

      {floatingIcons.map(({ icon, style, type }) => {
        let currentResetId;
        if (type === 'rocket') currentResetId = rocketResetId;
        else if (type === 'ufo') currentResetId = ufoResetId;
        else if (type === 'f1car') currentResetId = f1CarResetId;
        else currentResetId = 0; // Animals don't need resetId

        return (
          <DraggableIcon
            key={`${type}-${currentResetId}`} // Key now includes resetId for rocket/ufo/f1car to force remount
            icon={icon}
            initialStyle={style}
            type={type}
            onQuoteClick={handleQuoteClick}
            onCompleteAnimation={handleAnimationComplete} // Pass the handler down
            resetId={currentResetId} // Pass resetId as a prop for useEffect dependency
          />
        );
      })}

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
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 20 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <a
            href="#projects"
            className="inline-flex items-center justify-center px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
          >
            Explore My Work
          </a>
          <a
            href="/Mark's Resume.pdf.pdf"
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