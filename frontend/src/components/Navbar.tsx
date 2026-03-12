import { useState, useEffect } from 'react';
import { Rocket, Menu, X } from 'lucide-react';
import BackendStatus from './BackendStatus';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Upload', href: '#upload' },
  { name: 'Features', href: '#features' },
  { name: 'About', href: '#about' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 animate-fade-in-down ${
        scrolled
          ? 'glass py-3 shadow-lg shadow-purple-900/10'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-3 group hover:scale-[1.02] transition-transform"
        >
          <div className="relative">
            <Rocket className="w-7 h-7 text-cosmic-400 group-hover:text-cosmic-300 transition-colors" />
            <div className="absolute -inset-1 bg-cosmic-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-orbitron text-lg font-bold bg-gradient-to-r from-cosmic-300 via-cosmic-400 to-cyan-400 bg-clip-text text-transparent">
            ExoPlanet Hunter
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              style={{ animationDelay: `${0.1 * i + 0.3}s` }}
              className="relative font-inter text-sm text-gray-300 hover:text-white transition-colors group opacity-0 animate-fade-in-down"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-cosmic-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <BackendStatus />
          <a
            href="#upload"
            className="btn-shine px-5 py-2 rounded-full bg-gradient-to-r from-cosmic-600 to-cosmic-500 text-white text-sm font-medium hover:from-cosmic-500 hover:to-cosmic-400 transition-all shadow-lg shadow-cosmic-600/25 opacity-0 animate-fade-in-down"
            style={{ animationDelay: '0.8s' }}
          >
            Start Analysis
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden glass-dark mt-2 mx-4 rounded-2xl overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6 flex flex-col gap-4">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-gray-300 hover:text-white font-inter text-sm transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#upload"
            onClick={() => setMobileOpen(false)}
            className="mt-2 px-5 py-2 rounded-full bg-gradient-to-r from-cosmic-600 to-cosmic-500 text-white text-sm font-medium text-center"
          >
            Start Analysis
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
