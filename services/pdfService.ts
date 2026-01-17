import { jsPDF } from 'jspdf';

/**
 * Limpia el texto para jsPDF (maneja tildes y caracteres especiales)
 */
const cleanText = (text: string): string => {
  return text
    .replace(/á/g, 'a').replace(/Á/g, 'A')
    .replace(/é/g, 'e').replace(/É/g, 'E')
    .replace(/í/g, 'i').replace(/Í/g, 'I')
    .replace(/ó/g, 'o').replace(/Ó/g, 'O')
    .replace(/ú/g, 'u').replace(/Ú/g, 'U')
    .replace(/ñ/g, 'n').replace(/Ñ/g, 'N')
    .replace(/ü/g, 'u').replace(/Ü/g, 'U');
};

/**
 * Genera un documento PDF con estetica corporativa profesional, minimalista y limpia.
 */
export const generateProfessionalPDF = (title: string, subtitle: string, content: string, filename: string) => {
  const doc = new jsPDF();
  const date = new Date().toLocaleDateString('es-ES');
  const pageHeight = doc.internal.pageSize.height;
  
  // Limpiar textos
  const cleanTitle = cleanText(title);
  const cleanSubtitle = cleanText(subtitle);
  const cleanContent = cleanText(content);
  
  // Encabezado Clasico (Minimalista y Limpio)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(15, 23, 42); // Slate-900
  doc.text("PYME-Pulse AI", 20, 30);
  
  doc.setDrawColor(79, 70, 229); // Indigo-600
  doc.setLineWidth(1);
  doc.line(20, 35, 50, 35); // Linea de acento sutil

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139); // Slate-500
  doc.text("SISTEMAS DE INTELIGENCIA DE NEGOCIO", 20, 42);
  
  // Datos alineados a la derecha
  doc.text(`FECHA DE EMISION: ${date}`, 190, 30, { align: 'right' });
  doc.text(`ID-DOCUMENTO: ${Math.random().toString(36).substr(2, 6).toUpperCase()}`, 190, 35, { align: 'right' });

  // Separador principal sutil
  doc.setDrawColor(241, 245, 249); // Slate-100
  doc.setLineWidth(0.2);
  doc.line(20, 50, 190, 50);

  // Titulos de seccion del informe
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(cleanTitle, 20, 65);
  
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(100, 116, 139);
  doc.text(cleanSubtitle, 20, 72);

  // Cuerpo del informe con tipografia optimizada
  doc.setTextColor(51, 65, 85); // Slate-700
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  
  const splitText = doc.splitTextToSize(cleanContent, 170);
  let cursorY = 85;
  const margin = 20;
  const lineHeight = 7.5; // Interlineado profesional

  splitText.forEach((line: string) => {
    // Detectar si la linea es un encabezado numerico (ej: "1. TITULO")
    const isHeader = /^\d+\./.test(line.trim());
    
    // Gestion de salto de pagina
    if (cursorY > pageHeight - 30) {
      doc.addPage();
      cursorY = 30;
      // Pequeno indicador de pagina en el nuevo encabezado
      doc.setFontSize(7);
      doc.setTextColor(148, 163, 184);
      doc.text("PYME-Pulse AI | Continuacion del Informe Tecnico", 20, 20);
      doc.line(20, 22, 190, 22);
      doc.setFontSize(10);
    }

    if (isHeader) {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(15, 23, 42);
      cursorY += 4; // Espacio extra antes de secciones
    } else {
      doc.setFont("helvetica", "normal");
      doc.setTextColor(51, 65, 85);
    }

    doc.text(line, margin, cursorY);
    cursorY += lineHeight;
  });

  // Pie de pagina con numeracion y fecha de generacion clara
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(`Informe emitido el ${date} | Pagina ${i} de ${totalPages} | Proyecto Fin de Curso`, 20, pageHeight - 15);
    doc.text("Generado por el Motor de Inteligencia de Negocio PYME-Pulse AI", 190, pageHeight - 15, { align: 'right' });
  }
  
  doc.save(`${filename}.pdf`);
};