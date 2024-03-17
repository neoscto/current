'use server';

import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

interface GeneratePDFProps {
  initialPDFPath: string;
  page4BackgroundImage: string;
  globalCapacity: number;
  globalPanels: number;
  globalPercentage: number;
}

export const generatePDF = async ({
  initialPDFPath,
  page4BackgroundImage,
  globalCapacity,
  globalPanels,
  globalPercentage
}: GeneratePDFProps) => {
  try {
    const existingPdfBytes = await fetch(initialPDFPath, {
      cache: 'no-store'
    }).then((resp) => resp.arrayBuffer());
    const existingPdfDoc = await PDFDocument.load(existingPdfBytes);

    // Create a new PDFDocument
    const newPdfDoc = await PDFDocument.create();

    // Copy the pages from existingPdfDoc to newPdfDoc
    const copiedPages = await newPdfDoc.copyPages(
      existingPdfDoc,
      existingPdfDoc.getPageIndices()
    );
    copiedPages.forEach((page: any) => newPdfDoc.addPage(page));

    const pageWidth = 595; // A4 width in points
    const pageHeight = 842; // A4 height in points

    // Embed the Helvetica font
    const helveticaFont = await newPdfDoc.embedFont(
      StandardFonts.HelveticaBold
    );

    // Embed the background image
    const imageUrl = await fetch(page4BackgroundImage, {
      cache: 'no-store'
    }).then((resp) => resp.arrayBuffer());
    const image = await newPdfDoc.embedPng(imageUrl);

    // Scale the background image to fit the A4 page size
    const imageDims = image.scaleToFit(pageWidth, pageHeight);

    // Add a page to the document
    const page = newPdfDoc.addPage([pageWidth, pageHeight]);

    // Draw the image on the page
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: imageDims.width,
      height: imageDims.height
    });

    // Set the font size
    const fontSize = 10;

    page.drawText(
      `${globalCapacity.toFixed(1)} KWp (${globalPanels.toFixed(1)}) Paneles`,
      {
        x: 120,
        y: pageHeight - 225 - fontSize,
        size: fontSize,
        font: helveticaFont,
        color: rgb(0, 0, 0)
      }
    );
    page.drawText(`${(globalCapacity * 2250).toFixed(1)} KWh`, {
      x: pageWidth - 210,
      y: pageHeight - 225 - fontSize,
      size: fontSize,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    });
    page.drawText(`${globalCapacity.toFixed(1)}`, {
      x: pageWidth - 114,
      y: pageHeight - 322.5 - fontSize, // Adjust coordination system
      size: fontSize,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    });
    page.drawText(`${globalPanels.toFixed(1)}`, {
      x: 140,
      y: pageHeight - 338 - fontSize, // Adjust coordination system
      size: fontSize,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    });

    page.drawText(`${(globalCapacity * 2250).toFixed(1)}`, {
      x: pageWidth - 138,
      y: pageHeight - 338 - fontSize, // Adjust coordination system
      size: fontSize,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    });
    page.drawText(`${globalPercentage.toFixed(1)}`, {
      x: pageWidth - 311,
      y: pageHeight - 352 - fontSize,
      size: fontSize,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await newPdfDoc.save();

    return pdfBytes;
  } catch (error) {
    console.log(error);
    return;
  }
};
