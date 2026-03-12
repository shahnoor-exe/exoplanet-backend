/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        cosmic: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        nebula: {
          blue: '#1e3a5f',
          purple: '#4a1a6b',
          pink: '#6b1a4a',
        },
      },
      animation: {
        /* ---- Floating / bobbing ---- */
        'float':          'float 6s ease-in-out infinite',
        'float-slow':     'float 8s ease-in-out infinite',
        'float-slower':   'float 12s ease-in-out infinite',
        'float-delay':    'float 6s ease-in-out 0.3s infinite',

        /* ---- Glow / pulse ---- */
        'pulse-glow':     'pulseGlow 2s ease-in-out infinite',
        'pulse-ring':     'pulseRing 2s cubic-bezier(0,0,.2,1) infinite',

        /* ---- Rotation / orbit ---- */
        'spin-slow':      'spin 20s linear infinite',
        'spin-slower':    'spin 40s linear infinite',
        'spin-reverse':   'spinReverse 60s linear infinite',
        'orbit':          'orbit 15s linear infinite',
        'orbit-slow':     'orbit 25s linear infinite',
        'orbit-moon':     'spin 12s linear infinite',

        /* ---- Twinkle / sparkle ---- */
        'twinkle':        'twinkle 3s ease-in-out infinite',
        'twinkle-fast':   'twinkle 1.5s ease-in-out infinite',
        'sparkle':        'sparkle 2s ease-in-out infinite',

        /* ---- Slide / fade-in ---- */
        'fade-in':        'fadeIn 0.8s ease-out forwards',
        'fade-in-up':     'fadeInUp 0.8s ease-out forwards',
        'fade-in-down':   'fadeInDown 0.6s ease-out forwards',
        'fade-in-left':   'fadeInLeft 0.8s ease-out forwards',
        'fade-in-right':  'fadeInRight 0.8s ease-out forwards',
        'slide-up':       'slideUp 0.8s ease-out',
        'scale-in':       'scaleIn 0.5s ease-out forwards',

        /* ---- Stagger helpers (via animation-delay) ---- */
        'fade-in-up-1':   'fadeInUp 0.7s ease-out 0.1s forwards',
        'fade-in-up-2':   'fadeInUp 0.7s ease-out 0.2s forwards',
        'fade-in-up-3':   'fadeInUp 0.7s ease-out 0.3s forwards',
        'fade-in-up-4':   'fadeInUp 0.7s ease-out 0.4s forwards',
        'fade-in-up-5':   'fadeInUp 0.7s ease-out 0.5s forwards',
        'fade-in-up-6':   'fadeInUp 0.7s ease-out 0.6s forwards',

        /* ---- Fade-in left (for table rows) ---- */
        'fade-in-left':   'fadeInLeft 0.4s ease-out forwards',

        /* ---- Gradient / warp ---- */
        'gradient-shift': 'gradientShift 8s ease infinite',
        'gradient-x':     'gradientX 6s ease infinite',
        'warp':           'warp 20s ease-in-out infinite',

        /* ---- Bounce variants ---- */
        'bounce-slow':    'bounceSlow 2s ease-in-out infinite',

        /* ---- Scan line ---- */
        'scan':           'scanLine 3s ease-in-out infinite',

        /* ---- Path draw (SVG) ---- */
        'draw':           'draw 2.5s ease-in-out forwards',
        'draw-delayed':   'draw 2.5s ease-in-out 0.5s forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '50%': { opacity: '0.8', filter: 'brightness(1.3)' },
        },
        pulseRing: {
          '0%':   { transform: 'scale(0.5)', opacity: '0.6' },
          '80%':  { transform: 'scale(2.5)', opacity: '0' },
          '100%': { transform: 'scale(2.5)', opacity: '0' },
        },
        spinReverse: {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        orbit: {
          '0%':   { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%':      { opacity: '1',   transform: 'scale(1.2)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1) rotate(0deg)' },
          '50%':      { opacity: '1',   transform: 'scale(1.3) rotate(180deg)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%':   { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%':   { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.85)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        warp: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%':      { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        scanLine: {
          '0%':   { left: '-100%' },
          '100%': { left: '100%' },
        },
        draw: {
          '0%':   { strokeDashoffset: '1500' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
        'nebula-gradient': 'radial-gradient(ellipse at 20% 50%, rgba(120, 0, 255, 0.15), transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(0, 100, 255, 0.1), transparent 50%)',
      },
    },
  },
  plugins: [],
}
