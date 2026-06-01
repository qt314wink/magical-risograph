export class TextureSynth {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas?.getContext('2d');
    this.params = {
      frequency: 0.8,
      octaves: 4,
      roughness: 0.5,
      contrast: 0.15,
      type: 'grain', // grain, laid, rough, cotton
    };
    this.offscreen = document.createElement('canvas');
    this.offCtx = this.offscreen.getContext('2d');
  }

  resize(w, h) {
    this.canvas.width = w;
    this.canvas.height = h;
    this.offscreen.width = w;
    this.offscreen.height = h;
  }

  // Simplex-ish noise using stacked sine waves (fast, no deps)
  noise(x, y, octaves, freq, amp) {
    let val = 0;
    let max = 0;
    let f = freq;
    let a = amp;
    for (let i = 0; i < octaves; i++) {
      val += Math.sin(x * f + i * 1.3) * Math.cos(y * f * 0.7 + i * 2.1) * a;
      val += Math.sin((x + y) * f * 0.5 + i * 0.7) * a * 0.5;
      max += a * 1.5;
      f *= 2.1;
      a *= this.params.roughness;
    }
    return (val / max + 1) / 2; // normalize 0-1
  }

  generate() {
    if (!this.ctx) return;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const imgData = this.ctx.createImageData(w, h);
    const data = imgData.data;
    const { frequency, octaves, contrast, type } = this.params;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4;
        let n = 0;

        if (type === 'laid') {
          // Horizontal line pattern
          const line = Math.sin(y * frequency * 0.5) * 0.5 + 0.5;
          n = line * contrast + (1 - contrast) * 0.5;
        } else if (type === 'rough') {
          n = this.noise(x, y, octaves, frequency * 0.02, 1.0);
          n = 0.5 + (n - 0.5) * contrast * 4;
        } else if (type === 'cotton') {
          n = this.noise(x, y, Math.max(2, octaves - 1), frequency * 0.015, 1.0);
          n = 0.55 + (n - 0.5) * contrast * 2;
        } else {
          // grain
          n = this.noise(x, y, octaves, frequency * 0.025, 1.0);
          n = 0.5 + (n - 0.5) * contrast * 3;
        }

        const val = Math.max(0, Math.min(255, n * 255));
        data[idx] = val;
        data[idx + 1] = val;
        data[idx + 2] = val;
        data[idx + 3] = 255;
      }
    }

    this.ctx.putImageData(imgData, 0, 0);
  }

  getDataURL() {
    return this.canvas?.toDataURL('image/png');
  }

  applyGlobal() {
    const url = this.getDataURL();
    if (!url) return;
    document.documentElement.style.setProperty('--custom-grain', `url(${url})`);
    const overlay = document.querySelector('.grain-overlay');
    if (overlay) {
      overlay.style.backgroundImage = `var(--custom-grain)`;
      overlay.style.opacity = String(this.params.contrast);
    }
  }

  resetGlobal() {
    document.documentElement.style.removeProperty('--custom-grain');
    const overlay = document.querySelector('.grain-overlay');
    if (overlay) {
      overlay.style.backgroundImage = '';
      overlay.style.opacity = '';
    }
  }
}
