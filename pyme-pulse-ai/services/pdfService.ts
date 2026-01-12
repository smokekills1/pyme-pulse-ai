
import { jsPDF } from 'jspdf';

/**
 * Genera un documento PDF con estética corporativa para informes de negocio.
 */
export const generateProfessionalPDF = (title: string, subtitle: string, content: string, filename: string) => {
  const doc = new jsPDF();
  const date = new Date().toLocaleDateString('es-ES');
  const pageHeight = doc.internal.pageSize.height;
  
  // Encabezado Corporativo
  doc.setFillColor(15, 23, 42); // Slate-900
  doc.rect(0, 0, 210, 45, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("PYME-Pulse AI", 20, 25);
  
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("SISTEMA DE INTELIGENCIA DE NEGOCIO", 20, 33);
  doc.text(`ID INFORME: ${Math.random().toString(36).substr(2, 9).toUpperCase()}`, 155, 25);
  doc.text(`FECHA EMISIÓN: ${date}`, 155, 30);

  // Títulos de Sección
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(title, 20, 60);
  
  doc.setFontSize(11);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(100, 116, 139);
  doc.text(subtitle, 20, 68);

  doc.setDrawColor(226, 232, 240);
  doc.line(20, 75, 190, 75);

  // Contenido Principal con Gestión de Páginas
  doc.setTextColor(51, 65, 85);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  
  // Limpiar el contenido de etiquetas si vienen de algún sitio, 
  // aunque aquí se espera texto plano formateado.
  const splitText = doc.splitTextToSize(content, 170);
  let cursorY = 85;
  const margin = 20;

  splitText.forEach((line: string) => {
    if (cursorY > pageHeight - margin) {
      doc.addPage();
      cursorY = margin;
    }
    doc.text(line, margin, cursorY);
    cursorY += 6;
  });

  // Pie de Página
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  // Fix: Call getNumberOfPages() directly on the jsPDF instance as doc.internal.getNumberOfPages() is deprecated/not available.
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.text(`Página ${i} de ${totalPages} - Documento Confidencial PYME-Pulse AI`, 20, pageHeight - 10);
  }
  
  doc.save(`${filename}.pdf`);
};
