import { Printer, Camera, AtSign, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#f5f2eb] border-t-[3px] border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#1a1a1a] flex items-center justify-center border-2 border-[#1a1a1a]">
                <Printer className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight">
                MAGICAL<span className="text-[#ff6b9d]">RISO</span>
              </span>
            </div>
            <p className="text-sm text-[#1a1a1a]/60 leading-relaxed max-w-xs">
              A celebration of stencil duplication, vibrant soy inks, and the beautiful imperfections of risograph printing.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold uppercase text-sm tracking-wider mb-4">Navigate</h4>
            <nav className="flex flex-col gap-2">
              <a href="#prints" className="text-sm text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors font-medium">Prints</a>
              <a href="#studio" className="text-sm text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors font-medium">Studio</a>
              <a href="#process" className="text-sm text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors font-medium">Process</a>
            </nav>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold uppercase text-sm tracking-wider mb-4">Connect</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-white border-[3px] border-[#1a1a1a] flex items-center justify-center hover:bg-[#1a1a1a] hover:text-white transition-colors shadow-[2px_2px_0_#ff6b9d]"
              >
                <Camera className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white border-[3px] border-[#1a1a1a] flex items-center justify-center hover:bg-[#1a1a1a] hover:text-white transition-colors shadow-[2px_2px_0_#00d4aa]"
              >
                <AtSign className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white border-[3px] border-[#1a1a1a] flex items-center justify-center hover:bg-[#1a1a1a] hover:text-white transition-colors shadow-[2px_2px_0_#ffd23f]"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t-2 border-[#1a1a1a]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#1a1a1a]/40 font-mono">
            © 2025 Magical Risograph. All prints reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#ff6b9d]" />
            <div className="w-3 h-3 bg-[#00d4aa]" />
            <div className="w-3 h-3 bg-[#ffd23f]" />
            <div className="w-3 h-3 bg-[#3a86ff]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
