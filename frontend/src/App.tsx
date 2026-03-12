import StarField from './components/StarField';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import UploadSection from './components/UploadSection';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import About from './components/About';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#030014] overflow-hidden">
      {/* Animated star background */}
      <StarField />

      {/* Nebula ambient glow */}
      <div className="fixed inset-0 pointer-events-none nebula-bg" style={{ zIndex: 1 }} />

      {/* Content */}
      <div className="relative" style={{ zIndex: 2 }}>
        <Navbar />
        <Hero />
        <UploadSection />
        <HowItWorks />
        <Features />
        <About />
        <Footer />
      </div>
    </div>
  );
}
