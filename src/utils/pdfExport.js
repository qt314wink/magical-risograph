export function exportProofPDF(canvas, meta = {}) {
  const { jsPDF } = window.jspdf;
  if (!jsPDF) { console.warn('jsPDF not loaded'); return false; }
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const margin = 10;
  const bleed = 3;

  // Background
  pdf.setFillColor(244, 241, 234);
  pdf.rect(0, 0, pageW, pageH, 'F');

  // Registration marks (crop marks)
  pdf.setDrawColor(0);
  pdf.setLineWidth(0.25);
  // Top-left
  pdf.line(margin, margin + bleed, margin + 5, margin + bleed);
  pdf.line(margin + bleed, margin, margin + bleed, margin + 5);
  // Top-right
  pdf.line(pageW - margin - 5, margin + bleed, pageW - margin, margin + bleed);
  pdf.line(pageW - margin - bleed, margin, pageW - margin - bleed, margin + 5);
  // Bottom-left
  pdf.line(margin, pageH - margin - bleed, margin + 5, pageH - margin - bleed);
  pdf.line(margin + bleed, pageH - margin, margin + bleed, pageH - margin - 5);
  // Bottom-right
  pdf.line(pageW - margin - 5, pageH - margin - bleed, pageW - margin, pageH - margin - bleed);
  pdf.line(pageW - margin - bleed, pageH - margin, pageW - margin - bleed, pageH - margin - 5);

  // Canvas image
  if (canvas) {
    const imgData = canvas.toDataURL('image/png');
    const imgW = pageW - margin * 2 - bleed * 2;
    const imgH = pageH - margin * 2 - bleed * 2 - 20;
    pdf.addImage(imgData, 'PNG', margin + bleed, margin + bleed, imgW, imgH);
  }

  // Metadata bar
  pdf.setFillColor(26, 26, 26);
  pdf.rect(margin + bleed, pageH - margin - 12, pageW - margin * 2 - bleed * 2, 10, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(7);
  pdf.text(
    `PROOF: ${meta.title || 'UNTITLED'} | MODE: ${meta.printMode || 'INK'} | DATE: ${new Date().toISOString().slice(0,10)} | MÄG-RISO PRESS`,
    pageW / 2,
    pageH - margin - 5.5,
    { align: 'center' }
  );

  // Color annotations
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(8);
  pdf.text('INK PROFILE:', margin + bleed, margin + bleed + 4);
  pdf.setTextColor(255, 75, 92);
  pdf.text('● FLUORESCENT PINK', margin + bleed, margin + bleed + 8);
  pdf.setTextColor(0, 210, 211);
  pdf.text('● AQUA TEAL', margin + bleed, margin + bleed + 12);

  pdf.save(`mag-riso-proof-${meta.title || 'export'}-${new Date().toISOString().slice(0,10)}.pdf`);
  return true;
}

export function exportZinePDF(data) {
  const { jsPDF } = window.jspdf;
  if (!jsPDF) { console.warn('jsPDF not loaded'); return false; }
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const margin = 12;
  const panelW = (pageW - margin * 2) / 3;
  const panelH = pageH - margin * 2;

  // Background
  pdf.setFillColor(244, 241, 234);
  pdf.rect(0, 0, pageW, pageH, 'F');

  // Crop marks
  pdf.setDrawColor(0);
  pdf.setLineWidth(0.25);
  const cmX = [margin, margin + panelW, margin + panelW * 2, pageW - margin];
  cmX.forEach(x => {
    pdf.line(x, margin - 3, x, margin - 1);
    pdf.line(x, pageH - margin + 1, x, pageH - margin + 3);
  });
  pdf.line(margin - 3, margin, margin - 1, margin);
  pdf.line(pageW - margin + 1, margin, pageW - margin + 3, margin);
  pdf.line(margin - 3, pageH - margin, margin - 1, pageH - margin);
  pdf.line(pageW - margin + 1, pageH - margin, pageW - margin + 3, pageH - margin);

  // Panels
  const panels = [
    { title: data.title || 'PROJECT', subtitle: data.category || 'SPECIMEN', body: data.description || '', color: [255, 75, 92] },
    { title: 'EXECUTION RUN', subtitle: '// TECHNICAL BLUEPRINTS //', body: data.body || '', color: [0, 210, 211] },
    { title: 'DRUM SEQUENCE', subtitle: data.inks || 'FLUO PINK, TEAL', body: data.tech || '', color: [254, 202, 87] },
  ];

  panels.forEach((panel, i) => {
    const x = margin + i * panelW;
    // Panel border
    pdf.setDrawColor(0);
    pdf.setLineWidth(0.5);
    pdf.rect(x, margin, panelW, panelH);
    // Accent bar
    pdf.setFillColor(...panel.color);
    pdf.rect(x, margin, panelW, 6, 'F');
    // Text
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text(panel.title, x + 4, margin + 14);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(120, 120, 120);
    pdf.text(panel.subtitle, x + 4, margin + 19);
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(9);
    const splitBody = pdf.splitTextToSize(panel.body, panelW - 8);
    pdf.text(splitBody, x + 4, margin + 26);
  });

  pdf.save(`mag-riso-zine-${data.title || 'export'}-${new Date().toISOString().slice(0,10)}.pdf`);
  return true;
}
