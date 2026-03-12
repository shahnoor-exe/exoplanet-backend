import { useInView } from '../hooks/useInView';

const steps = [
  {
    step: '01',
    title: 'Prepare CSV',
    desc: 'Format your stellar light curve data with flux values as columns. Each row represents one star observation.',
  },
  {
    step: '02',
    title: 'Upload & Analyze',
    desc: 'Drag and drop your file into the upload zone. Our AI preprocesses and normalizes the data automatically.',
  },
  {
    step: '03',
    title: 'Get Predictions',
    desc: 'Receive probability scores and labels for each observation. Download the annotated CSV with results.',
  },
];

const staggerClasses = [
  'animate-fade-in-up-1',
  'animate-fade-in-up-2',
  'animate-fade-in-up-3',
];

const HowItWorks = () => {
  const header = useInView();
  const content = useInView(0.1);

  return (
    <section className="relative z-10 py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div
          ref={header.ref}
          className={`text-center mb-20 transition-all duration-700 ${
            header.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-white to-cosmic-200 bg-clip-text text-transparent">
              How It{' '}
            </span>
            <span className="bg-gradient-to-r from-cosmic-400 to-cyan-400 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="mt-4 text-gray-400 font-inter max-w-lg mx-auto">
            Three simple steps from raw data to cosmic insights.
          </p>
        </div>

        {/* Steps */}
        <div ref={content.ref} className="relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cosmic-500/30 via-cyan-400/30 to-cosmic-500/30 hidden lg:block" />

          <div className="space-y-16 lg:space-y-24">
            {steps.map((item, i) => (
              <div
                key={item.step}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  i % 2 === 1 ? 'lg:flex-row-reverse' : ''
                } ${content.inView ? staggerClasses[i] : 'opacity-0'}`}
              >
                {/* Card */}
                <div className="flex-1 glass rounded-2xl p-8 cosmic-card">
                  <span className="font-orbitron text-5xl font-black bg-gradient-to-br from-cosmic-400/30 to-cyan-400/30 bg-clip-text text-transparent">
                    {item.step}
                  </span>
                  <h3 className="font-orbitron text-xl font-semibold text-white mt-4 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 font-inter text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Center dot */}
                <div className="relative hidden lg:flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-cosmic-500 shadow-lg shadow-cosmic-500/50 z-10" />
                  <div className="absolute w-8 h-8 rounded-full bg-cosmic-500/20 animate-ping" />
                </div>

                {/* Spacer */}
                <div className="flex-1 hidden lg:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
