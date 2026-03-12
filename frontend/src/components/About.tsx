import { Telescope, Database, Cpu } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const stats = [
  { label: 'Kepler Objects Trained On', value: '5,000+', icon: Database },
  { label: 'Detection Accuracy', value: '~95%', icon: Cpu },
  { label: 'Predictions per Second', value: '100+', icon: Telescope },
];

const About = () => {
  const left = useInView();
  const right = useInView();

  return (
    <section id="about" className="relative z-10 py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Text */}
          <div
            ref={left.ref}
            className={`transition-all duration-700 ${
              left.inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-inter text-cosmic-400 tracking-wider uppercase mb-4">
              <Telescope className="w-3.5 h-3.5" />
              About the Project
            </span>
            <h2 className="font-orbitron text-3xl sm:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-cosmic-200 bg-clip-text text-transparent">
                The Science of{' '}
              </span>
              <span className="bg-gradient-to-r from-cosmic-400 to-cyan-400 bg-clip-text text-transparent">
                Transit Detection
              </span>
            </h2>
            <div className="space-y-4 text-gray-400 font-inter leading-relaxed">
              <p>
                When an exoplanet passes in front of its host star &mdash; a &ldquo;transit&rdquo; &mdash; it blocks
                a tiny fraction of starlight, causing a measurable dip in the star&rsquo;s brightness
                curve. NASA&rsquo;s Kepler Space Telescope captured these light curves for thousands
                of stars.
              </p>
              <p>
                Our model, trained on real Kepler mission data, uses a machine learning pipeline
                to analyze flux values and classify each observation as a potential exoplanet
                transit or normal stellar variation. The model preprocesses, normalizes, and
                evaluates each data point to provide probability scores.
              </p>
              <p>
                Built with <span className="text-cosmic-300">FastAPI</span> on the backend
                and <span className="text-cosmic-300">React</span> on the frontend, this tool
                demonstrates how AI can accelerate astronomical discovery.
              </p>
            </div>
          </div>

          {/* Right — Planet Illustration + Stats */}
          <div
            ref={right.ref}
            className={`relative flex flex-col items-center transition-all duration-700 delay-200 ${
              right.inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            {/* Animated planet */}
            <div className="relative w-64 h-64 mb-12">
              {/* Glow */}
              <div className="absolute inset-0 rounded-full bg-cosmic-600/20 blur-3xl animate-pulse-glow" />

              {/* Planet body */}
              <div className="relative w-full h-full animate-float">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-cosmic-700 via-cosmic-800 to-cosmic-950 shadow-2xl shadow-cosmic-500/20 overflow-hidden">
                  {/* Surface details */}
                  <div className="absolute top-[20%] left-[30%] w-16 h-8 rounded-full bg-cosmic-600/20 blur-sm rotate-12" />
                  <div className="absolute top-[50%] left-[15%] w-20 h-6 rounded-full bg-cosmic-500/10 blur-md -rotate-6" />
                  <div className="absolute top-[35%] right-[20%] w-12 h-12 rounded-full bg-cosmic-600/15 blur-sm" />
                  {/* Atmosphere rim */}
                  <div className="absolute inset-0 rounded-full border border-cosmic-400/10" />
                  <div className="absolute inset-[2px] rounded-full bg-gradient-to-b from-white/5 to-transparent" />
                </div>

                {/* Ring */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[30%] -rotate-12">
                  <div className="w-full h-full rounded-[50%] border-2 border-cosmic-400/20" />
                  <div className="absolute inset-[8px] rounded-[50%] border border-cosmic-300/10" />
                </div>
              </div>

              {/* Orbiting moon */}
              <div className="absolute inset-0 animate-orbit-moon">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 shadow-md shadow-gray-400/30" />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 w-full">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`text-center p-4 glass rounded-xl ${
                    right.inView
                      ? i === 0
                        ? 'animate-fade-in-up-3'
                        : i === 1
                          ? 'animate-fade-in-up-4'
                          : 'animate-fade-in-up-5'
                      : 'opacity-0'
                  }`}
                >
                  <stat.icon className="w-5 h-5 text-cosmic-400 mx-auto mb-2" />
                  <p className="font-orbitron text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-gray-500 text-xs font-inter mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
