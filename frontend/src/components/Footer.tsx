import { Rocket, Github, Heart } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const Footer = () => {
  const { ref, inView } = useInView();

  return (
    <footer className="relative z-10 border-t border-cosmic-500/10">
      <div ref={ref} className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div
            className={`flex items-center gap-3 transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Rocket className="w-6 h-6 text-cosmic-400" />
            <span className="font-orbitron text-lg font-bold bg-gradient-to-r from-cosmic-300 to-cyan-400 bg-clip-text text-transparent">
              ExoPlanet Hunter
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/adityamalik31/exoplanet-backend"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-inter"
            >
              <Github className="w-4 h-4" />
              Backend Repo
            </a>
            <a
              href="#home"
              className="text-gray-400 hover:text-white transition-colors text-sm font-inter"
            >
              Back to Top
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-cosmic-500/10 text-center">
          <p className="text-gray-500 text-sm font-inter flex items-center justify-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-red-400" /> for cosmic exploration
          </p>
          <p className="text-gray-600 text-xs font-inter mt-2">
            &copy; {new Date().getFullYear()} ExoPlanet Hunter &mdash; AI-Powered Exoplanet Detection
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
