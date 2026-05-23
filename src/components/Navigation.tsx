import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Printer } from 'lucide-react';

interface NavigationProps {
  scrollY: number;
}

const navItems = [
  { label: 'Prints', href: '#prints' },
  { label: 'Studio', href: '#studio' },
  { label: 'Process', href: '#process' },
];

export default function Navigation({ scrollY }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isScrolled = scrollY > 60;

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#f5f2eb]/90 backdrop-blur-md border-b-[3px] border-[#1a1a1a]'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-[#1a1a1a] flex items-center justify-center border-2 border-[#1a1a1a] group-hover:shadow-[3px_3px_0_#ff6b9d] transition-shadow">
                <Printer className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight hidden sm:block">
                MAGICAL<span className="text-[#ff6b9d]">RISO</span>
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-4 py-2 text-sm font-semibold uppercase tracking-wider hover:bg-[#1a1a1a] hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#studio"
                className="ml-2 riso-button text-sm"
              >
                Make a Print
              </a>
            </nav>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center bg-[#1a1a1a] text-white border-2 border-[#1a1a1a]"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#f5f2eb] pt-20 px-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-4 text-xl font-bold uppercase tracking-wider border-2 border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#studio"
                onClick={() => setMobileOpen(false)}
                className="riso-button text-center mt-4"
              >
                Make a Print
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
