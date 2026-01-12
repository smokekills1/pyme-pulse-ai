
import { jsPDF } from 'jspdf';

/**
 * Genera un documento PDF con estética corporativa de alto nivel.
 */
export const generateProfessionalPDF = (title: string, subtitle: string, content: string, filename: string) => {
  const doc = new jsPDF();
  const date = new Date().toLocaleDateString('es-ES');
  const pageHeight = doc.internal.pageSize.height;
  
  // Fondo de encabezado (Slate-900)
  doc.setFillColor(15, 23, 42); 
  doc.rect(0, 0, 210, 45, 'F');
  
  // Texto de encabezado
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("PYME-Pulse AI", 20, 25);
  
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("MEMORIA TÉCNICA - PROYECTO FIN DE CURSO", 20, 33);
  doc.text(`CÓDIGO: BI-${Math.random().toString(36).substr(2, 5).toUpperCase()}`, 155, 25);
  doc.text(`EMISIÓN: ${date}`, 155, 30);

  // Títulos de sección en el cuerpo
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(title, 20, 60);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(100, 116, 139);
  doc.text(subtitle, 20, 67);

  doc.setDrawColor(226, 232, 240);
  doc.line(20, 75, 190, 75);

  // Cuerpo del informe
  doc.setTextColor(51, 65, 85);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  
  const splitText = doc.splitTextToSize(content, 170);
  let cursorY = 85;
  const margin = 20;

  splitText.forEach((line: string) => {
    if (cursorY > pageHeight - 25) {
      doc.addPage();
      // Dibujar pequeño encabezado en páginas nuevas
      doc.setFillColor(15, 23, 42);
      doc.rect(0, 0, 210, 15, 'F');
      cursorY = 25;
    }
    doc.text(line, margin, cursorY);
    cursorY += 7;
  });

  // Pie de página con numeración
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(`Página ${i} de ${totalPages} | PYME-Pulse AI © 2024`, 20, pageHeight - 10);
  }
  
  doc.save(`${filename}.pdf`);
};
