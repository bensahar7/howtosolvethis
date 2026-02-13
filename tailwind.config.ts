// Tailwind CSS v4 Configuration
// "Atmospheric Curiosity" Design System
// NO SHADOWS. NO BUBBLY CORNERS. NO GENERIC PATTERNS.

export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sf-hebrew)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Consolas", "Monaco", "monospace"],
      },
      // Disable all default shadows - STRICTLY FORBIDDEN
      boxShadow: {
        none: "none",
        // Only allow the custom glass glow for hover states
        "glass-glow": "0 0 20px rgba(255, 255, 255, 0.15)",
      },
      // Sharp corners only - no bubbly look
      borderRadius: {
        none: "0",
        sm: "0.125rem", // 2px
      },
      // Asymmetric grid system (12 columns)
      gridTemplateColumns: {
        "12": "repeat(12, minmax(0, 1fr))",
      },
      // Custom backdrop blur values
      backdropBlur: {
        xs: "2px",
        "3xl": "64px",
      },
      // Technical HUD lines
      borderWidth: {
        "0.5": "0.5px",
      },
      // Z-index layers for typography as art
      zIndex: {
        "-10": "-10",
        "-20": "-20",
      },
      // Animation for mask-reveals
      keyframes: {
        "mask-reveal": {
          "0%": {
            clipPath: "inset(0 100% 0 0)",
          },
          "100%": {
            clipPath: "inset(0 0 0 0)",
          },
        },
        "pulse-glass": {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.5",
          },
        },
      },
      animation: {
        "mask-reveal": "mask-reveal 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        "pulse-glass": "pulse-glass 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
};
