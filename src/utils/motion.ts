import type { Variants, Transition } from 'framer-motion';

/**
 * High-Craft Motion Design Constants
 * Following Swiss design & architectural minimalism:
 * Snappy springs and tight cubic-beziers. No cartoonish bounces or floaty delays.
 */

// Tight exponential deceleration curve
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeInOutCubic = [0.65, 0, 0.35, 1] as const;

// Snappy mechanical spring
export const snappySpring: Transition = {
  type: 'spring',
  stiffness: 380,
  damping: 32,
  mass: 0.8,
};

// Gentle settling spring for layout morphs
export const layoutSpring: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

// Viewport trigger settings for scroll-based reveals
export const defaultViewport = {
  once: true,
  margin: '-60px 0px',
} as const;

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.02,
    },
  },
};

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOutExpo,
    },
  },
};

export const fadeDown: Variants = {
  hidden: {
    opacity: 0,
    y: -14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: easeOutExpo,
    },
  },
};

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

export const scaleReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easeOutExpo,
    },
  },
};

// Interactive tactile micro-interactions
export const tactileButton = {
  whileHover: { scale: 1.015 },
  whileTap: { scale: 0.975 },
  transition: { duration: 0.15, ease: 'easeOut' as const },
};

export const tactileCard = {
  whileHover: {
    y: -2,
    transition: { duration: 0.2, ease: 'easeOut' as const },
  },
};
