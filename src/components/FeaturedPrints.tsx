import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Layers, Palette } from 'lucide-react';

interface Print {
  id: number;
  title: string;
  artist: string;
  colors: string[];
  layers: number;
  category: string;
  pattern: string;
}

const prints: Print[] = [
  {
    id: 1,
    title: 'Midnight Bloom',
    artist: 'Yuki Tanaka',
    colors: ['#ff6b9d', '#1a1a1a'],
    layers: 3,
    category: 'Floral',
    pattern: 'radial-gradient(circle at 30% 30%, #ff6b9d 0%, transparent 50%), radial-gradient(circle at 70% 70%, #1a1a1a 0%, transparent 40%)',
  },
  {
    id: 2,
    title: 'Electric Tide',
    artist: 'Marco Silva',
    colors: ['#00d4aa', '#3a86ff', '#ffd23f'],
    layers: 4,
    category: 'Abstract',
    pattern: 'repeating-linear-gradient(45deg, #00d4aa 0px, #00d4aa 20px, #3a86ff 20px, #3a86ff 40px), radial-gradient(circle, #ffd23f 0%, transparent 60%)',
  },
  {
    id: 3,
    title: 'Soft Geometry',
    artist: 'Anna Kowalski',
    colors: ['#ff8500', '#9b5de5'],
    layers: 2,
    category: 'Geometric',
    pattern: 'conic-gradient(from 45deg at 50% 50%, #ff8500 0deg 90deg, transparent 90deg 180deg, #9b5de5 180deg 270deg, transparent 270deg)',
  },
  {
    id: 4,
    title: 'Urban Echo',
    artist: 'James Chen',
    colors: ['#1a1a1a', '#ffd23f', '#ff6b9d'],
    layers: 5,
    category: 'Urban',
    pattern: 'repeating-linear-gradient(90deg, #1a1a1a 0px, #1a1a1a 4px, transparent 4px, transparent 20px), repeating-linear-gradient(0deg, #ffd23f 0px, #ffd23f 2px, transparent 2px, transparent 30px)',
  },
  {
    id: 5,
    title: 'Prism Fields',
    artist: 'Sofia Reyes',
    colors: ['#3a86ff', '#00d4aa', '#ff6b9d', '#ffd23f'],
    layers: 6,
    category: 'Landscape',
    pattern: 'linear-gradient(180deg, #3a86ff 0%, #00d4aa 50%, #ff6b9d 100%)',
  },
  {
    id: 6,
    title: 'Void Garden',
    artist: 'Kenji Yamamoto',
    colors: ['#9b5de5', '#1a1a1a', '#ff8500'],
    layers: 4,
    category: 'Nature',
    pattern: 'radial-gradient(circle at 50% 50%, #9b5de5 0%, #1a1a1a 50%), repeating-conic-gradient(from 0deg, #ff8500 0deg 10deg, transparent 10deg 20deg)',
  },
];

const categories = ['All', 'Floral', 'Abstract', 'Geometric', 'Urban', 'Landscape', 'Nature'];

export default function FeaturedPrints() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredPrint, setHoveredPrint] = useState<number | null>(null);

  const filtered = activeCategory === 'All'
    ? prints
    : prints.filter((p) => p.category === activeCategory);

  return (
    <section id="prints" className="py-24 sm:py-32 bg-white relative">
      <div className="absolute top-0 left-0 right-0 h-4 bg-[repeating-linear-gradient(90deg,#1a1a1a_0px,#1a1a1a_8px,transparent_8px,transparent_16px)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 bg-[#ff6b9d]" />
            <span className="text-sm font-bold uppercase tracking-widest">Featured Prints</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight">
            Fresh from the
            <span className="block text-[#00d4aa]">Drum</span>
          </h2>
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-sm font-bold uppercase tracking-wider border-[3px] border-[#1a1a1a] transition-all ${
                activeCategory === cat
                  ? 'bg-[#1a1a1a] text-white shadow-[3px_3px_0_#ff6b9d]'
                  : 'bg-white hover:bg-[#1a1a1a] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Prints grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((print, index) => (
            <motion.div
              key={print.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredPrint(print.id)}
              onMouseLeave={() => setHoveredPrint(null)}
              className="riso-card cursor-pointer group"
            >
              {/* Print preview */}
              <div className="relative aspect-[4/5] overflow-hidden border-b-[3px] border-[#1a1a1a]">
                <div
                  className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                  style={{ background: print.pattern }}
                />
                {/* Halftone overlay */}
                <div className="absolute inset-0 halftone opacity-20 mix-blend-multiply" />
                {/* Misregistration on hover */}
                <AnimatePresence>
                  {hoveredPrint === print.id && (
                    <motion.div
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div
                        className="absolute inset-0 translate-x-1 -translate-y-1 opacity-40 mix-blend-multiply"
                        style={{ background: print.pattern }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="absolute top-3 right-3 w-10 h-10 bg-white border-2 border-[#1a1a1a] flex items-center justify-center">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-lg">{print.title}</h3>
                    <p className="text-sm text-[#1a1a1a]/60 font-medium">{print.artist}</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-bold uppercase bg-[#ffd23f] border-2 border-[#1a1a1a]">
                    {print.category}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs font-medium text-[#1a1a1a]/60">
                  <span className="flex items-center gap-1">
                    <Layers className="w-3 h-3" />
                    {print.layers} layers
                  </span>
                  <span className="flex items-center gap-1">
                    <Palette className="w-3 h-3" />
                    {print.colors.length} colors
                  </span>
                </div>
                {/* Color dots */}
                <div className="flex gap-1 mt-3">
                  {print.colors.map((color, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 border-2 border-[#1a1a1a]"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
