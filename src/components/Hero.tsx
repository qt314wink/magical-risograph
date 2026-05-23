import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#f5f2eb]">
      {/* Decorative halftone backgrounds */}
      <div className="absolute top-20 left-10 w-64 h-64 halftone-pink opacity-30 rounded-full" />
      <div className="absolute bottom-32 right-16 w-96 h-96 halftone-teal opacity-20 rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] halftone opacity-10 rounded-full" />

      {/* Diagonal stripe decoration */}
      <div className="absolute -right-20 top-0 w-40 h-full riso-stripe opacity-40 rotate-12" />
      <div className="absolute -left-10 bottom-0 w-32 h-64 bg-[#ffd23f] opacity-60 -rotate-12" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border-[3px] border-[#1a1a1a] mb-8 shadow-[4px_4px_0_#ff6b9d]"
        >
          <Sparkles className="w-4 h-4 text-[#ff6b9d]" />
          <span className="text-sm font-bold uppercase tracking-wider">Analog Warmth, Digital Magic</span>
        </motion.div>

        {/* Main headline with misregistration effect */}
        <div className="relative mb-8">
          <motion.h1
            className="text-6xl sm:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tighter"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block relative">
              <span className="absolute -inset-1 text-[#ff6b9d] opacity-60 translate-x-[3px] -translate-y-[2px]">
                MAGICAL
              </span>
              <span className="absolute -inset-1 text-[#00d4aa] opacity-60 -translate-x-[3px] translate-y-[2px]">
                MAGICAL
              </span>
              <span className="relative text-[#1a1a1a]">MAGICAL</span>
            </span>
            <span className="block relative mt-2">
              <span className="absolute -inset-1 text-[#ffd23f] opacity-60 translate-x-[2px] -translate-y-[1px]">
                RISOGRAPH
              </span>
              <span className="absolute -inset-1 text-[#3a86ff] opacity-60 -translate-x-[2px] translate-y-[1px]">
                RISOGRAPH
              </span>
              <span className="relative text-[#1a1a1a]">RISOGRAPH</span>
            </span>
          </motion.h1>
        </div>

        <motion.p
          className="text-lg sm:text-xl max-w-2xl mx-auto mb-12 text-[#1a1a1a]/80 font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          A print studio where stencil duplicators meet digital wonder. 
          Create layered, textured, imperfectly perfect art.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <a href="#studio" className="riso-button text-base">
            Start Printing
          </a>
          <a
            href="#prints"
            className="px-6 py-3 border-[3px] border-[#1a1a1a] font-bold uppercase tracking-wider hover:bg-[#1a1a1a] hover:text-white transition-colors"
          >
            View Gallery
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ArrowDown className="w-6 h-6 text-[#1a1a1a]" />
      </motion.div>
    </section>
  );
}
