'use server';

import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb } from 'pdf-lib';
import { parseCSV } from './parse-csv';
import { generateChart, generatePaybackChart } from './generate-chart';
import path from 'path';
import * as fs from 'fs';
import fetch from 'node-fetch';
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
  // const chartBackgroundImage = fs.readFileSync(
  //   path.join(process.cwd(), 'public', chartBackground)
  // );
  const chartBackgroundImage = await fetch(chartBackground).then((resp) =>
    resp.arrayBuffer()
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

const generatePage8 = async (
  imagePath: string,
  pdfDoc: PDFDocument,
  pageWidth: number,
  pageHeight: number,
  globalCapacity: number,
  helveticaFont: PDFFont,
  globalPrice: number,
  globalSavings: number,
  globalPaybackNeos: number,
  globalPaybackRooftop: number,
  globalTons: number
) => {
  // const imageUrl = fs.readFileSync(
  //   path.join(process.cwd(), 'public', imagePath)
  // );
  const imageUrl = await fetch(imagePath).then((resp) => resp.arrayBuffer());
  const image = await pdfDoc.embedPng(imageUrl);
  const imageDims = image.scaleToFit(pageWidth, pageHeight);

  // Add a page to the document
  const page = pdfDoc.addPage([pageWidth, pageHeight]);
  page.drawImage(image, {
    x: 0,
    y: 0,
    width: imageDims.width,
    height: imageDims.height
  });
  const fontSize = 10;
  page.drawText(`${globalCapacity.toFixed(1)}`, {
    x: 135,
    y: 632,
    size: fontSize,
    font: helveticaFont,
    color: rgb(0, 0, 0)
  });
  page.drawText(`${globalPrice.toFixed(2)}`, {
    x: 239,
    y: 632,
    size: fontSize,
    font: helveticaFont,
    color: rgb(0, 0, 0)
  });
  page.drawText(`${(globalPrice / globalCapacity).toFixed(2)}`, {
    x: 150,
    y: 601,
    size: fontSize,
    font: helveticaFont,
    color: rgb(0, 0, 0)
  });
  page.drawText(`${globalSavings.toFixed(2)}`, {
    x: 273,
    y: 232,
    size: fontSize,
    font: helveticaFont,
    color: rgb(0, 0, 0)
  });
  page.drawText(`${(globalSavings / globalPrice).toFixed(1)}`, {
    x: 60,
    y: 217,
    size: fontSize,
    font: helveticaFont,
    color: rgb(0, 0, 0)
  });
  page.drawText(`${globalPaybackNeos.toFixed(1)}`, {
    x: 396,
    y: 157,
    size: fontSize,
    font: helveticaFont,
    color: rgb(0, 0, 0)
  });
  page.drawText(`${globalPaybackRooftop.toFixed(1)}`, {
    x: 470,
    y: 142,
    size: fontSize,
    font: helveticaFont,
    color: rgb(0, 0, 0)
  });
  page.drawText(`${globalTons.toFixed(1)}`, {
    x: 99,
    y: 93,
    size: fontSize,
    font: helveticaFont,
    color: rgb(0, 0, 0)
  });
};

export const generatePDF = async ({
  initialPDFPath,
  page4BackgroundImage,
  page8BackgroundImage,
  lastPdfPage,
  chartBackground1,
  chartBackground2,
  csvPath,
  globalCapacity,
  globalPanels,
  globalPercentage,
  globalPrice,
  globalSavings,
  globalPaybackNeos,
  globalPaybackRooftop,
  globalTons,
  cumulativeSavings
}: GeneratePDFProps) => {
  try {
    console.log('🚀 Generating');
    const existingPdfBytes = await fetch(initialPDFPath).then((resp) =>
      resp.arrayBuffer()
    );
    // const existingPdfBytes = fs.readFileSync(
    //   path.join(process.cwd(), 'public', initialPDFPath)
    // );
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
    const imageUrl = await fetch(page4BackgroundImage).then((resp) =>
      resp.arrayBuffer()
    );
    // const imageUrl = fs.readFileSync(
    //   path.join(process.cwd(), 'public', page4BackgroundImage)
    // );
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
    // const csvReadStream = await fetch(csvPath).then((resp) => resp.body);
    // const records = await parseCSV(csvReadStream);

    // // Generate 3 Chart Pages
    // for (let i = 0; i < 3; i++) {
    //   await generateChartPage({
    //     records,
    //     months: spanishMonths.slice(i * 4, (i + 1) * 4),
    //     pdfDoc: newPdfDoc,
    //     xPos: 50,
    //     chartImgWidth: 383,
    //     chartImgHeight: 140,
    //     chartBackground: chartBackground1,
    //     imageWidth: imageDims.width,
    //     imageHeight: imageDims.height,
    //     pageWidth,
    //     pageHeight
    //   });
    // }

    // await generatePage8(
    //   page8BackgroundImage,
    //   newPdfDoc,
    //   pageWidth,
    //   pageHeight,
    //   globalCapacity,
    //   helveticaFont,
    //   globalPrice,
    //   globalSavings,
    //   globalPaybackNeos,
    //   globalPaybackRooftop,
    //   globalTons
    // );

    // const page9 = await embedChartBackground(
    //   newPdfDoc,
    //   chartBackground2,
    //   imageDims.width,
    //   imageDims.height,
    //   pageWidth,
    //   pageHeight
    // );
    // const chartUrl = await generatePaybackChart(cumulativeSavings, globalPrice);
    // chartUrl &&
    //   (await drawChart({
    //     pdfDoc: newPdfDoc,
    //     page: page9,
    //     chartUrl,
    //     xPos: 50,
    //     yPos: 100,
    //     chartImgWidth: 500,
    //     chartImgHeight: 600
    //   }));
    // // const lastPageBytes = fs.readFileSync(
    // //   path.join(process.cwd(), 'public', lastPdfPage)
    // // );
    // const lastPageBytes = await fetch(lastPdfPage).then((resp) =>
    //   resp.arrayBuffer()
    // );
    // const lastPdfDoc = await PDFDocument.load(lastPageBytes);
    // const [copiedPage] = await newPdfDoc.copyPages(
    //   lastPdfDoc,
    //   lastPdfDoc.getPageIndices()
    // );
    // newPdfDoc.addPage(copiedPage);
    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await newPdfDoc.save();
    console.log('🚀 Done');
    return pdfBytes;
  } catch (error) {
    console.log(error);
    return;
  }
};
