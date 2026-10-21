/**
 * Configuration for the iPad-style cursor
 * Adjust these values to customize cursor behavior and appearance
 */

export const cursorConfig = {
  // Block cursor padding
  block: {
    // Normal state padding (percentage of smaller dimension)
    paddingPercent: 0.08,
    // Minimum padding in pixels
    paddingMin: 8,
    // Clicked state padding (percentage of smaller dimension)
    paddingClickedPercent: 0.05,
    // Minimum clicked padding in pixels
    paddingClickedMin: 5,
    // Default border radius if not detected
    defaultRadius: "12px",
  },

  // Text cursor
  text: {
    // Width of the text cursor bar
    width: 3,
    // Default height if line height not detected
    defaultHeight: 22,
    // Border radius
    radius: "2px",
  },

  // Default cursor (dot)
  default: {
    // Size of the default cursor (nimble and agile)
    size: 16,
    // Border radius (50% makes it circular)
    radius: "50%",
  },

  // Magnetic effect (subtle tactile snap without dragging friction)
  magnetic: {
    // Strength of the magnetic pull (0-1)
    strength: 0.08,
    // Lighting effect multiplier
    lightingMultiplier: 3.0,
    // Maximum distance the element can move as a % of its size
    limitMultiplier: 0.04,
  },

  // Animation settings
  animation: {
    // Ultra-responsive, high-sensitivity spring physics (near zero latency)
    position: {
      damping: 46,
      stiffness: 1400,
      mass: 0.08,
    },
    // Spring configuration for lighting effect
    lighting: {
      damping: 26,
      stiffness: 400,
    },
    // Spring configuration for size/shape changes (snappy morphing)
    sizeShape: {
      type: "spring" as const,
      stiffness: 850,
      damping: 38,
      mass: 0.12,
    },
    clickScale: {
      stiffness: 650,
      damping: 32,
    },
    // Strict/Instant tracking spring
    sticky: {
      damping: 44,
      stiffness: 1800,
      mass: 0.05,
    },
  },

  // Colors
  colors: {
    // Block cursor background (subtle glass highlight that NEVER washes out text)
    blockBackground: "rgba(255, 255, 255, 0.08)",
    // Default cursor background (clean translucent white like iPadOS on dark background)
    defaultBackground: "rgba(255, 255, 255, 0.75)",
    // Text cursor color
    textBackground: "#f97316",
    // Delicate specular shine overlay
    lightingGradient: "radial-gradient(circle at center, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0) 60%)",
  },

  // Click animation
  click: {
    // Scale for non-block cursors when clicked
    defaultScale: 0.88,
  },
} as const;

export type CursorConfig = typeof cursorConfig;
