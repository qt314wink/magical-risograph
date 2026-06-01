export function haptic(pattern = 15) {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(pattern);
  }
}

export function initMobileEnhancements() {
  // Pinch-to-zoom for Lab canvas
  const labContainer = document.getElementById('lab-processor-canvas')?.parentElement;
  if (labContainer && 'ontouchstart' in window) {
    let initialDistance = 0;
    let initialDotSize = 6;
    let isPinching = false;

    labContainer.addEventListener('touchstart', (e) => {
      if (e.touches.length === 2) {
        isPinching = true;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        initialDistance = Math.sqrt(dx * dx + dy * dy);
        const slider = document.getElementById('slider-lab-dot');
        initialDotSize = slider ? parseFloat(slider.value) : 6;
        e.preventDefault();
      }
    }, { passive: false });

    labContainer.addEventListener('touchmove', (e) => {
      if (isPinching && e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const scale = distance / Math.max(initialDistance, 1);
        const slider = document.getElementById('slider-lab-dot');
        const valDisplay = document.getElementById('val-lab-dot');
        if (slider) {
          const newVal = Math.max(1.5, Math.min(15, initialDotSize * scale));
          slider.value = newVal.toFixed(1);
          if (valDisplay) valDisplay.innerText = newVal.toFixed(1) + 'px';
          // Trigger existing sync function if available globally
          if (typeof syncLabControllers === 'function') syncLabControllers();
        }
        e.preventDefault();
      }
    }, { passive: false });

    labContainer.addEventListener('touchend', () => { isPinching = false; });
    labContainer.addEventListener('touchcancel', () => { isPinching = false; });
  }

  // Enhance physics cards with touch throw velocity
  const physicsContainer = document.getElementById('physics-container');
  if (physicsContainer && 'ontouchstart' in window) {
    // Enlarge touch targets on cards via CSS injection
    const style = document.createElement('style');
    style.textContent = `
      @media (pointer: coarse) {
        .physics-card { min-width: 200px !important; }
        .physics-card button { min-height: 36px !important; }
      }
    `;
    document.head.appendChild(style);
  }
}
