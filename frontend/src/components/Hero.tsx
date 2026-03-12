import { ChevronDown, Sparkles, Orbit } from 'lucide-react';

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Nebula glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-cosmic-600/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-600/5 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-purple-500/5 blur-[80px]" />
      </div>

      {/* Orbit rings decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="orbit-ring w-[500px] h-[500px] opacity-30 animate-spin-slower">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cosmic-400 shadow-lg shadow-cosmic-400/50" />
        </div>
        <div className="orbit-ring w-[700px] h-[700px] -top-[100px] -left-[100px] opacity-20 animate-spin-reverse">
          <div className="absolute bottom-0 right-1/4 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
        </div>
      </div>

      {/* Badge */}
      <div className="relative z-10 mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-inter text-cosmic-300 tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          AI-Powered Exoplanet Detection
          <Sparkles className="w-3.5 h-3.5" />
        </span>
      </div>

      {/* Title */}
      <h1 className="relative z-10 text-center opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <span className="block font-orbitron text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight">
          <span className="bg-gradient-to-r from-white via-cosmic-200 to-white bg-clip-text text-transparent">
            Discover Worlds
          </span>
        </span>
        <span className="block font-orbitron text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight mt-2">
          <span className="bg-gradient-to-r from-cosmic-400 via-cyan-400 to-cosmic-400 bg-[length:200%_auto] animate-gradient-shift bg-clip-text text-transparent glow-text">
            Beyond Stars
          </span>
        </span>
      </h1>

      {/* Subtitle */}
      <p
        className="relative z-10 mt-8 max-w-2xl text-center text-gray-400 text-lg md:text-xl font-inter leading-relaxed opacity-0 animate-fade-in-up"
        style={{ animationDelay: '0.8s' }}
      >
        Upload stellar light curve data and let our machine learning model
        detect potential exoplanets orbiting distant stars — turning raw
        brightness patterns into cosmic discoveries.
      </p>

      {/* CTA Buttons */}
      <div
        className="relative z-10 mt-10 flex flex-wrap gap-4 justify-center opacity-0 animate-fade-in-up"
        style={{ animationDelay: '1.0s' }}
      >
        <a
          href="#upload"
          className="btn-shine group px-8 py-4 rounded-full bg-gradient-to-r from-cosmic-600 to-cosmic-500 text-white font-semibold text-lg shadow-xl shadow-cosmic-600/30 flex items-center gap-3 hover:shadow-cosmic-500/40 hover:scale-105 active:scale-[0.97] transition-all"
        >
          <Orbit className="w-5 h-5 group-hover:animate-spin-slow" />
          Begin Discovery
        </a>
        <a
          href="#features"
          className="px-8 py-4 rounded-full border border-cosmic-500/30 text-cosmic-300 font-semibold text-lg hover:bg-cosmic-500/10 hover:border-cosmic-400/50 hover:scale-105 active:scale-[0.97] transition-all flex items-center gap-3"
        >
          Learn More
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>

      {/* Animated light curve visualization */}
      <div
        className="relative z-10 mt-16 w-full max-w-3xl opacity-0 animate-fade-in"
        style={{ animationDelay: '1.3s' }}
      >
        <svg
          viewBox="0 0 800 120"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
              <stop offset="20%" stopColor="#7c3aed" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
              <stop offset="80%" stopColor="#7c3aed" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="curveGradientFill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[20, 40, 60, 80, 100].map(y => (
            <line
              key={y}
              x1="0" y1={y} x2="800" y2={y}
              stroke="rgba(139, 92, 246, 0.05)"
              strokeWidth="1"
            />
          ))}

          {/* Light curve - simulated transit dip */}
          <path
            d="M 0 60 Q 100 60 200 60 T 320 60 Q 360 60 380 35 Q 400 15 420 35 Q 440 60 480 60 T 600 60 T 800 60"
            fill="none"
            stroke="url(#curveGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="1500"
            className="animate-draw"
          />

          {/* Fill under curve */}
          <path
            d="M 0 60 Q 100 60 200 60 T 320 60 Q 360 60 380 35 Q 400 15 420 35 Q 440 60 480 60 T 600 60 T 800 60 L 800 120 L 0 120 Z"
            fill="url(#curveGradientFill)"
            className="opacity-0 animate-fade-in"
            style={{ animationDelay: '2.5s' }}
          />

          {/* Transit dip marker */}
          <circle
            cx="400" cy="15" r="4"
            fill="#06b6d4"
            className="opacity-0 animate-scale-in"
            style={{ animationDelay: '2.5s' }}
          />
          <circle
            cx="400" cy="15" r="12"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="1"
            className="animate-pulse-ring"
            style={{ animationDelay: '2.8s' }}
          />
        </svg>

        <p
          className="text-center text-sm text-cosmic-400/60 mt-2 font-inter opacity-0 animate-fade-in"
          style={{ animationDelay: '3s' }}
        >
          &uarr; Simulated transit dip &mdash; the signature of an exoplanet crossing its host star
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 z-10 opacity-0 animate-fade-in"
        style={{ animationDelay: '2.5s' }}
      >
        <div className="flex flex-col items-center gap-2 animate-bounce-slow">
          <span className="text-xs text-gray-500 font-inter tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4 text-cosmic-400/50" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
