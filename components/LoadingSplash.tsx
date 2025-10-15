'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

const LoadingSplash: React.FC = () => {
  const [showSplash, setShowSplash] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [accentColor, setAccentColor] = useState('#00FF41');
  const controls = useAnimation();

  const WORD = "ALPERDIGITAL".split('');

  useEffect(() => {
    // Check if splash was already shown in this session
    const hasSeenSplash = sessionStorage.getItem('sawSplash');
    if (hasSeenSplash) {
      return;
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsReducedMotion(prefersReducedMotion);

    // Get theme-aware accent color from CSS variables
    const getAccentColor = () => {
      try {
        const computedStyle = getComputedStyle(document.documentElement);
        const codeRainColor = computedStyle.getPropertyValue('--code-rain-color')?.trim();
        if (codeRainColor) {
          return codeRainColor;
        }
        
        // Fallback to matrix green or current color
        const matrixGreen = computedStyle.getPropertyValue('--matrix-green')?.trim();
        return matrixGreen || '#00FF41';
      } catch (error) {
        console.warn('Could not read CSS variables:', error);
        return '#00FF41';
      }
    };

    setAccentColor(getAccentColor());
    setShowSplash(true);

    // Lock scroll while splash is visible
    document.documentElement.style.overflow = 'hidden';

    if (prefersReducedMotion) {
      // Reduced motion: show static word for 300ms
      setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem('sawSplash', '1');
        document.documentElement.style.overflow = '';
      }, 300);
    } else {
      // Full animation: start after a brief delay
      setTimeout(() => {
        controls.start('visible');
      }, 100);

      // Hide splash after animation completes
      setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem('sawSplash', '1');
        document.documentElement.style.overflow = '';
      }, 2000); // Total animation time + hold
    }
  }, [controls]);

  // Helper function to create glow shadow from hex color
  const createGlowShadow = (hexColor: string): string => {
    try {
      // Convert hex to RGB
      const hex = hexColor.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      
      return `0 0 8px rgba(${r}, ${g}, ${b}, 0.35)`;
    } catch (error) {
      return '0 0 8px rgba(0, 255, 65, 0.35)';
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      backdropFilter: 'blur(0px)',
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  };

  const letterVariants = {
    hidden: {
      y: '-120vh',
      opacity: 0,
      rotateX: 30,
      scale: 0.95
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 600,
        damping: 28,
        duration: 0.65
      }
    }
  };

  if (!showSplash) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        id="splash"
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{
          background: document.body.classList.contains('high-contrast') 
            ? 'rgba(255, 255, 255, 0.95)' 
            : 'rgba(0, 0, 0, 0.95)'
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        role="dialog"
        aria-modal="true"
        aria-label="Loading Alperdigital"
      >
        <motion.div
          className="flex items-center justify-center"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          {WORD.map((letter, index) => (
            <motion.span
              key={`${letter}-${index}`}
              className="text-6xl font-extrabold tracking-wider"
              style={{
                color: accentColor,
                textShadow: createGlowShadow(accentColor),
                marginLeft: index === 0 ? 0 : '0.1em'
              }}
              variants={isReducedMotion ? {} : letterVariants}
              initial="hidden"
              animate={isReducedMotion ? "visible" : controls}
              transition={isReducedMotion ? {} : {
                delay: index * 0.07, // Stagger timing
                type: "spring",
                stiffness: 600,
                damping: 28
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingSplash;
