'use server';

import { PDFDocument, PDFPage, StandardFonts, rgb } from 'pdf-lib';
import { parseCSV } from './parse-csv';
import { generateChart } from './generate-chart';
import path from 'path';
import * as fs from 'fs';
import {
  chartPageVerticalPositions,
  dataURLToUint8Array,
  spanishMonths
} from '../utils';
import {
  DrawChartProps,
  GenerateChartPageProps,
  GeneratePDFProps
} from '../types';

const embedChartBackground = async (
  pdfDoc: PDFDocument,
  chartBackground: string,
  imageWidth: number,
  imageHeight: number,
  pageWidth: number,
  pageHeight: number
) => {
  // Add another page to the document
  const chartBackgroundImage = fs.readFileSync(
    path.join(process.cwd(), 'public', chartBackground)
  );
  const chartBg = await pdfDoc.embedPng(chartBackgroundImage);

  const page = pdfDoc.addPage([pageWidth, pageHeight]);
  // Draw the image on the page
  page.drawImage(chartBg, {
    x: 0,
    y: 0,
    width: imageWidth,
    height: imageHeight
  });
  return page;
};

const drawChart = async ({
  pdfDoc,
  page,
  chartUrl,
  xPos,
  yPos,
  chartImgWidth,
  chartImgHeight
}: DrawChartProps) => {
  const chartBytes = dataURLToUint8Array(chartUrl);
  const chartImage = await pdfDoc.embedPng(chartBytes);

  page.drawImage(chartImage, {
    x: xPos,
    y: yPos,
    width: chartImgWidth,
    height: chartImgHeight
  });
};

const generateChartPage = async ({
  records,
  months,
  pdfDoc,
  xPos,
  chartImgWidth,
  chartImgHeight,
  chartBackground,
  imageWidth,
  imageHeight,
  pageWidth,
  pageHeight
}: GenerateChartPageProps) => {
  const page = await embedChartBackground(
    pdfDoc,
    chartBackground,
    imageWidth,
    imageHeight,
    pageWidth,
    pageHeight
  );
  for (let i = 0; i < months.length; i++) {
    const month = months[i];
    const chartUrl = await generateChart(records, month.index, month.name);
    chartUrl &&
      (await drawChart({
        pdfDoc,
        page,
        chartUrl,
        xPos,
        yPos: chartPageVerticalPositions[i],
        chartImgWidth,
        chartImgHeight
      }));
  }
};

export const generatePDF = async ({
  initialPDFPath,
  page4BackgroundImage,
  chartBackground,
  csvPath,
  globalCapacity,
  globalPanels,
  globalPercentage
}: GeneratePDFProps) => {
  try {
    // const existingPdfBytes = await fetch(initialPDFPath, {
    //   cache: 'no-store'
    // }).then((resp) => resp.arrayBuffer());
    const existingPdfBytes = fs.readFileSync(
      path.join(process.cwd(), 'public', initialPDFPath)
    );
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
    // const imageUrl = await fetch(page4BackgroundImage, {
    //   cache: 'no-store'
    // }).then((resp) => resp.arrayBuffer());
    const imageUrl = fs.readFileSync(
      path.join(process.cwd(), 'public', page4BackgroundImage)
    );
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

    const records = await parseCSV(csvPath);

    // Generate 3 Chart Pages
    for (let i = 0; i < 3; i++) {
      await generateChartPage({
        records,
        months: spanishMonths.slice(i * 4, (i + 1) * 4),
        pdfDoc: newPdfDoc,
        xPos: 50,
        chartImgWidth: 383,
        chartImgHeight: 140,
        chartBackground,
        imageWidth: imageDims.width,
        imageHeight: imageDims.height,
        pageWidth,
        pageHeight
      });
    }

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await newPdfDoc.save();
    return pdfBytes;
  } catch (error) {
    console.log(error);
    return;
  }
};
