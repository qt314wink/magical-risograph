import { motion } from 'framer-motion';
import { FileImage, Layers, Paintbrush, Wind, CheckCircle } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Prepare Masters',
    description: 'Each color requires its own thermal master. The original artwork is separated into individual color channels.',
    icon: <FileImage className="w-6 h-6" />,
    color: '#ff6b9d',
  },
  {
    number: '02',
    title: 'Burn the Screen',
    description: 'The master wraps around the ink drum. As it spins, ink pushes through the porous stencil onto paper.',
    icon: <Layers className="w-6 h-6" />,
    color: '#00d4aa',
  },
  {
    number: '03',
    title: 'Layer Colors',
    description: 'Each pass adds one color. Registration is never perfect — those slight misalignments create the riso charm.',
    icon: <Paintbrush className="w-6 h-6" />,
    color: '#ffd23f',
  },
  {
    number: '04',
    title: 'Dry & Texture',
    description: 'Soy-based inks sit on top of the paper, creating a tactile, slightly raised surface with visible texture.',
    icon: <Wind className="w-6 h-6" />,
    color: '#3a86ff',
  },
  {
    number: '05',
    title: 'Embrace Imperfection',
    description: 'No two prints are identical. Roller marks, grain, and happy accidents make each piece truly one-of-a-kind.',
    icon: <CheckCircle className="w-6 h-6" />,
    color: '#9b5de5',
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 sm:py-32 bg-[#1a1a1a] text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 halftone-pink opacity-10 rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 halftone-teal opacity-10 rounded-full -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 bg-[#ffd23f]" />
            <span className="text-sm font-bold uppercase tracking-widest text-white/60">The Process</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight">
            How the
            <span className="block text-[#ff6b9d]">Magic Happens</span>
          </h2>
        </motion.div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="group relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
                {/* Number */}
                <div className="flex-shrink-0">
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 border-[3px] border-white/20 flex items-center justify-center font-bold text-2xl sm:text-3xl group-hover:border-white transition-colors"
                    style={{ color: step.color }}
                  >
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-8 border-b border-white/10 group-hover:border-white/30 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-10 h-10 flex items-center justify-center border-2 border-white/20"
                      style={{ color: step.color }}
                    >
                      {step.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold">{step.title}</h3>
                  </div>
                  <p className="text-white/60 text-base sm:text-lg max-w-2xl leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block bg-white text-[#1a1a1a] px-8 py-4 border-[3px] border-[#1a1a1a] shadow-[6px_6px_0_#ff6b9d,10px_10px_0_#00d4aa]">
            <p className="text-lg font-bold">
              Every print is an edition of one.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
