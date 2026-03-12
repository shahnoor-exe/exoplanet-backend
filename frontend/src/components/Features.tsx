import {
  Brain,
  Telescope,
  BarChart3,
  Zap,
  Shield,
  Globe2,
} from 'lucide-react';
import { useInView } from '../hooks/useInView';

const features = [
  {
    icon: Brain,
    title: 'Machine Learning',
    desc: 'Trained on NASA Kepler mission data using advanced classification algorithms to detect subtle transit signatures.',
    color: 'from-purple-500 to-violet-500',
    glow: 'purple',
  },
  {
    icon: Telescope,
    title: 'Light Curve Analysis',
    desc: 'Processes stellar brightness time-series data to identify periodic dips caused by orbiting exoplanets.',
    color: 'from-cyan-500 to-blue-500',
    glow: 'cyan',
  },
  {
    icon: BarChart3,
    title: 'Probability Scoring',
    desc: 'Each star gets a confidence score showing how likely its brightness pattern indicates a planetary transit.',
    color: 'from-emerald-500 to-teal-500',
    glow: 'emerald',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    desc: 'Upload your CSV and get predictions in seconds. No waiting, no complicated setup required.',
    color: 'from-amber-500 to-orange-500',
    glow: 'amber',
  },
  {
    icon: Shield,
    title: 'Robust Processing',
    desc: 'Handles varying data formats, missing values, and different feature counts automatically.',
    color: 'from-rose-500 to-pink-500',
    glow: 'rose',
  },
  {
    icon: Globe2,
    title: 'CSV Export',
    desc: 'Download complete results with prediction labels and probabilities for further research and analysis.',
    color: 'from-indigo-500 to-blue-500',
    glow: 'indigo',
  },
];

const glowColors: Record<string, string> = {
  purple: 'rgba(168, 85, 247, 0.15)',
  cyan: 'rgba(6, 182, 212, 0.15)',
  emerald: 'rgba(16, 185, 129, 0.15)',
  amber: 'rgba(245, 158, 11, 0.15)',
  rose: 'rgba(244, 63, 94, 0.15)',
  indigo: 'rgba(99, 102, 241, 0.15)',
};

const staggerClasses = [
  'animate-fade-in-up-1',
  'animate-fade-in-up-2',
  'animate-fade-in-up-3',
  'animate-fade-in-up-4',
  'animate-fade-in-up-5',
  'animate-fade-in-up-6',
];

const Features = () => {
  const header = useInView();
  const cards = useInView(0.1);

  return (
    <section id="features" className="relative z-10 py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          ref={header.ref}
          className={`text-center mb-20 transition-all duration-700 ${
            header.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-inter text-cosmic-400 tracking-wider uppercase mb-4">
            <Zap className="w-3.5 h-3.5" />
            Capabilities
          </span>
          <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-white to-cosmic-200 bg-clip-text text-transparent">
              Powered by{' '}
            </span>
            <span className="bg-gradient-to-r from-cosmic-400 to-cyan-400 bg-clip-text text-transparent">
              Science
            </span>
          </h2>
          <p className="mt-4 text-gray-400 font-inter max-w-xl mx-auto">
            Our detection pipeline combines signal processing with machine learning
            to find planets hidden in stellar noise.
          </p>
        </div>

        {/* Cards Grid */}
        <div ref={cards.ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`cosmic-card glass rounded-2xl p-8 group relative overflow-hidden ${
                cards.inView ? staggerClasses[i] : 'opacity-0'
              }`}
            >
              {/* Hover glow */}
              <div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ backgroundColor: glowColors[feature.glow] }}
              />

              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-6`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="font-orbitron text-lg font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 font-inter text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
