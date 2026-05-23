import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Download, Circle, Square, Triangle, Hexagon, Star, Layers } from 'lucide-react';

type ShapeType = 'circle' | 'square' | 'triangle' | 'hexagon' | 'star';
type BlendMode = 'multiply' | 'screen' | 'overlay' | 'normal';

interface Layer {
  id: string;
  shape: ShapeType;
  color: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
  blendMode: BlendMode;
}

const RISO_COLORS = [
  { name: 'Fluorescent Pink', value: '#ff6b9d' },
  { name: 'Teal', value: '#00d4aa' },
  { name: 'Yellow', value: '#ffd23f' },
  { name: 'Blue', value: '#3a86ff' },
  { name: 'Orange', value: '#ff8500' },
  { name: 'Purple', value: '#9b5de5' },
  { name: 'Black', value: '#1a1a1a' },
  { name: 'White', value: '#ffffff' },
];

const SHAPES: { type: ShapeType; icon: React.ReactNode }[] = [
  { type: 'circle', icon: <Circle className="w-5 h-5" /> },
  { type: 'square', icon: <Square className="w-5 h-5" /> },
  { type: 'triangle', icon: <Triangle className="w-5 h-5" /> },
  { type: 'hexagon', icon: <Hexagon className="w-5 h-5" /> },
  { type: 'star', icon: <Star className="w-5 h-5" /> },
];

const BLEND_MODES: BlendMode[] = ['multiply', 'screen', 'overlay', 'normal'];

function ShapeSVG({ shape, color, size }: { shape: ShapeType; color: string; size: number }) {
  const s = size;
  const hs = s / 2;
  switch (shape) {
    case 'circle':
      return <circle cx={hs} cy={hs} r={hs - 2} fill={color} />;
    case 'square':
      return <rect x={2} y={2} width={s - 4} height={s - 4} fill={color} />;
    case 'triangle':
      return <polygon points={`${hs},2 ${s - 2},${s - 2} 2,${s - 2}`} fill={color} />;
    case 'hexagon':
      const hexPoints = Array.from({ length: 6 }, (_, i) => {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        return `${hs + (hs - 2) * Math.cos(angle)},${hs + (hs - 2) * Math.sin(angle)}`;
      }).join(' ');
      return <polygon points={hexPoints} fill={color} />;
    case 'star':
      const starPoints = Array.from({ length: 10 }, (_, i) => {
        const angle = (Math.PI / 5) * i - Math.PI / 2;
        const r = i % 2 === 0 ? hs - 2 : (hs - 2) * 0.4;
        return `${hs + r * Math.cos(angle)},${hs + r * Math.sin(angle)}`;
      }).join(' ');
      return <polygon points={starPoints} fill={color} />;
    default:
      return null;
  }
}

export default function PrintStudio() {
  const [layers, setLayers] = useState<Layer[]>([]);
  const [selectedShape, setSelectedShape] = useState<ShapeType>('circle');
  const [selectedColor, setSelectedColor] = useState('#ff6b9d');
  const [selectedBlend, setSelectedBlend] = useState<BlendMode>('multiply');
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvasSize] = useState({ width: 400, height: 500 });

  const addLayer = useCallback((clientX: number, clientY: number) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const newLayer: Layer = {
      id: Math.random().toString(36).substr(2, 9),
      shape: selectedShape,
      color: selectedColor,
      x: x - 40,
      y: y - 40,
      size: 80,
      rotation: Math.random() * 360,
      blendMode: selectedBlend,
    };
    setLayers((prev) => [...prev, newLayer]);
  }, [selectedShape, selectedColor, selectedBlend]);

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    addLayer(e.clientX, e.clientY);
  };

  const handleCanvasDrag = (e: React.MouseEvent) => {
    if (!isDrawing || e.buttons !== 1) return;
    // Throttle slightly by checking distance
    addLayer(e.clientX, e.clientY);
  };

  const clearCanvas = () => setLayers([]);

  const downloadPrint = () => {
    const svg = document.getElementById('riso-canvas-svg');
    if (!svg) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'magical-risograph-print.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="studio" className="py-24 sm:py-32 bg-[#f5f2eb] relative">
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-[repeating-linear-gradient(45deg,#1a1a1a_0px,#1a1a1a_8px,transparent_8px,transparent_16px)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 bg-white border-[3px] border-[#1a1a1a] shadow-[4px_4px_0_#00d4aa]">
            <Layers className="w-4 h-4 text-[#00d4aa]" />
            <span className="text-sm font-bold uppercase tracking-widest">Interactive Print Studio</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight">
            Make Your Own
            <span className="block text-[#ff6b9d]">Riso Print</span>
          </h2>
          <p className="mt-4 text-lg text-[#1a1a1a]/70 max-w-xl mx-auto">
            Click shapes to layer them. Experiment with colors and blend modes.
            Embrace the happy accidents.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Toolbar */}
          <motion.div
            className="w-full lg:w-72 flex-shrink-0 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Draw toggle */}
            <div className="riso-card p-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <div className={`w-12 h-6 border-2 border-[#1a1a1a] relative transition-colors ${isDrawing ? 'bg-[#00d4aa]' : 'bg-white'}`}>
                  <div className={`absolute top-0.5 w-4 h-4 bg-[#1a1a1a] transition-all ${isDrawing ? 'left-6' : 'left-0.5'}`} />
                </div>
                <input
                  type="checkbox"
                  checked={isDrawing}
                  onChange={(e) => setIsDrawing(e.target.checked)}
                  className="sr-only"
                />
                <span className="font-bold uppercase text-sm">{isDrawing ? 'Drawing ON' : 'Drawing OFF'}</span>
              </label>
            </div>

            {/* Shapes */}
            <div className="riso-card p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-3">Shape</h3>
              <div className="flex flex-wrap gap-2">
                {SHAPES.map(({ type, icon }) => (
                  <button
                    key={type}
                    onClick={() => setSelectedShape(type)}
                    className={`w-10 h-10 border-[3px] border-[#1a1a1a] flex items-center justify-center transition-all ${
                      selectedShape === type
                        ? 'bg-[#1a1a1a] text-white shadow-[2px_2px_0_#ff6b9d]'
                        : 'bg-white hover:bg-[#1a1a1a] hover:text-white'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="riso-card p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-3">Ink Color</h3>
              <div className="grid grid-cols-4 gap-2">
                {RISO_COLORS.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setSelectedColor(c.value)}
                    className={`w-full aspect-square border-[3px] transition-all ${
                      selectedColor === c.value
                        ? 'border-[#1a1a1a] shadow-[2px_2px_0_#1a1a1a] scale-110'
                        : 'border-[#1a1a1a]/30 hover:border-[#1a1a1a]'
                    }`}
                    style={{ backgroundColor: c.value }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Blend modes */}
            <div className="riso-card p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-3">Blend Mode</h3>
              <div className="flex flex-wrap gap-2">
                {BLEND_MODES.map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setSelectedBlend(mode)}
                    className={`px-3 py-1.5 text-xs font-bold uppercase border-[3px] border-[#1a1a1a] transition-all ${
                      selectedBlend === mode
                        ? 'bg-[#1a1a1a] text-white shadow-[2px_2px_0_#ffd23f]'
                        : 'bg-white hover:bg-[#1a1a1a] hover:text-white'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={clearCanvas}
                className="flex-1 px-4 py-3 border-[3px] border-[#1a1a1a] font-bold uppercase text-sm hover:bg-[#1a1a1a] hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Clear
              </button>
              <button
                onClick={downloadPrint}
                className="flex-1 riso-button text-sm flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Save
              </button>
            </div>
          </motion.div>

          {/* Canvas */}
          <motion.div
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              {/* Paper frame */}
              <div className="bg-white p-4 sm:p-6 border-[3px] border-[#1a1a1a] shadow-[8px_8px_0_#1a1a1a]">
                <div
                  ref={canvasRef}
                  className={`relative bg-[#f5f2eb] border-2 border-[#1a1a1a]/20 overflow-hidden ${
                    isDrawing ? 'cursor-crosshair' : 'cursor-default'
                  }`}
                  style={{ width: canvasSize.width, height: canvasSize.height }}
                  onClick={handleCanvasClick}
                  onMouseMove={handleCanvasDrag}
                >
                  {/* Halftone base */}
                  <div className="absolute inset-0 halftone opacity-10" />

                  {/* SVG canvas for shapes */}
                  <svg
                    id="riso-canvas-svg"
                    width={canvasSize.width}
                    height={canvasSize.height}
                    viewBox={`0 0 ${canvasSize.width} ${canvasSize.height}`}
                    className="absolute inset-0"
                  >
                    {layers.map((layer) => (
                      <g
                        key={layer.id}
                        transform={`translate(${layer.x}, ${layer.y}) rotate(${layer.rotation} ${layer.size / 2} ${layer.size / 2})`}
                        style={{ mixBlendMode: layer.blendMode }}
                      >
                        <ShapeSVG
                          shape={layer.shape}
                          color={layer.color}
                          size={layer.size}
                        />
                      </g>
                    ))}
                  </svg>

                  {/* Empty state */}
                  {layers.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 border-2 border-dashed border-[#1a1a1a]/30 rounded-full flex items-center justify-center">
                          <Layers className="w-6 h-6 text-[#1a1a1a]/30" />
                        </div>
                        <p className="text-sm text-[#1a1a1a]/40 font-medium">
                          {isDrawing ? 'Click to place shapes' : 'Enable drawing to start'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Canvas info */}
                <div className="mt-4 flex items-center justify-between text-xs font-mono text-[#1a1a1a]/60">
                  <span>{layers.length} layers</span>
                  <span>{canvasSize.width} × {canvasSize.height} px</span>
                </div>
              </div>

              {/* Decorative corner stamps */}
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#ff6b9d] border-2 border-[#1a1a1a]" />
              <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-[#00d4aa] border-2 border-[#1a1a1a]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
