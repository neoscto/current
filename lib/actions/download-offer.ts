'use server';

import fontkit from '@pdf-lib/fontkit';
import fetch from 'node-fetch';
import { PDFDocument, PDFFont, rgb } from 'pdf-lib';
import {
  DrawChartProps,
  GenerateChartPageProps,
  GeneratePDFProps
} from '../types';
import {
  chartPageHorizontalPositions,
  chartPageVerticalPositions,
  dataURLToUint8Array,
  findMaxProduction,
  formatNumber,
  spanishMonths
} from '../utils';
import { parseCSV } from './parse-csv';

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
  chartImgWidth,
  chartImgHeight,
  chartBackground,
  imageWidth,
  imageHeight,
  pageWidth,
  pageHeight,
  maxProduction
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
    // const chartUrl = await generateChart(records, month.index, month.name);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/generate-chart`,
      {
        method: 'POST',
        body: JSON.stringify({
          records,
          filterMonth: month.index,
          title: month.name,
          maxProduction
        })
      }
    );
    const chartUrl = await response.text();
    const verticalPositions = chartPageVerticalPositions(3);
    chartUrl &&
      (await drawChart({
        pdfDoc,
        page,
        chartUrl,
        xPos: chartPageHorizontalPositions[i % 3],
        yPos: verticalPositions[i],
        chartImgWidth,
        chartImgHeight
      }));
  }
};

const generatePage6 = async (
  imagePath: string,
  pdfDoc: PDFDocument,
  pageWidth: number,
  pageHeight: number,
  globalCapacity: number,
  codecFont: PDFFont,
  globalPrice: number,
  globalSavings: number,
  globalPayback: number,
  globalPaybackRooftop: number,
  globalTons: number
) => {
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
  const fontSize = 11;
  page.drawText(
    `El precio de la Instalación Solar Virtual de ${formatNumber(globalCapacity)} kWp es de €${formatNumber(globalPrice * 1.21)} (IVA incluido).`,
    {
      x: 60,
      y: 647,
      size: fontSize,
      font: codecFont,
      color: rgb(0, 0, 0)
    }
  );
  page.drawText(
    `Esto equivale a €${formatNumber(globalPrice / globalCapacity)}/kWp sin 21% IVA.`,
    {
      x: 60,
      y: 617,
      size: fontSize,
      font: codecFont,
      color: rgb(0, 0, 0)
    }
  );
  page.drawText(
    'Asumiendo una inflación del 3% anual en el precio de la energía, el ahorro total obtenido',
    {
      x: 60,
      y: 250,
      size: fontSize,
      font: codecFont,
      color: rgb(0, 0, 0)
    }
  );
  page.drawText(
    `por la Instalación Solar Virtual será de €${formatNumber(globalSavings)}. Esto supondrá un ahorro total ${formatNumber(globalSavings / (globalPrice * 1.21))} veces`,
    {
      x: 60,
      y: 234,
      size: fontSize,
      font: codecFont,
      color: rgb(0, 0, 0)
    }
  );
  page.drawText('mayor al coste total de la inversión.', {
    x: 60,
    y: 217,
    size: fontSize,
    font: codecFont,
    color: rgb(0, 0, 0)
  });
  page.drawText(
    'Gracias a la superioridad productiva de nuestros parques solares, y al menor tamaño de',
    {
      x: 60,
      y: 172,
      size: fontSize,
      font: codecFont,
      color: rgb(0, 0, 0)
    }
  );
  page.drawText(
    `la inversión inicial, la Instalación Solar Virtual se amortizará en ${formatNumber(globalPayback)} años. Con su curva de`,
    {
      x: 60,
      y: 157,
      size: fontSize,
      font: codecFont,
      color: rgb(0, 0, 0)
    }
  );
  page.drawText(
    `consumo, el periodo medio de amortización de autoconsumo tradicional sería ${formatNumber(globalPaybackRooftop)} años.`,
    {
      x: 60,
      y: 142,
      size: fontSize,
      font: codecFont,
      color: rgb(0, 0, 0)
    }
  );
  page.drawText(
    `Evitará ${formatNumber(globalTons)} toneladas de CO2 gracias a la producción de energía renovable y sostenible.`,
    {
      x: 60,
      y: 93,
      size: fontSize,
      font: codecFont,
      color: rgb(0, 0, 0)
    }
  );
};

export const generatePDF = async ({
  initialPDFPath,
  page4BackgroundImage,
  page6BackgroundImage,
  lastPdfPage,
  chartBackground1,
  chartBackground2,
  csvPath,
  codecRegularPath,
  globalCapacity,
  globalPanels,
  globalPrice,
  globalSavings,
  globalPayback,
  globalPaybackRooftop,
  globalTons,
  cumulativeSavings,
  yearlyConsumption,
  planName
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
    newPdfDoc.registerFontkit(fontkit);
    // Copy the pages from existingPdfDoc to newPdfDoc
    const copiedPages = await newPdfDoc.copyPages(
      existingPdfDoc,
      existingPdfDoc.getPageIndices()
    );
    copiedPages.forEach((page: any) => newPdfDoc.addPage(page));

    const pageWidth = 595; // A4 width in points
    const pageHeight = 842; // A4 height in points

    // Embed the Helvetica font
    const fontBytes = await fetch(codecRegularPath).then((resp) =>
      resp.arrayBuffer()
    );
    const codecFont = await newPdfDoc.embedFont(fontBytes);

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
    const fontSize = 11;

    page.drawText(
      `Esta oferta refleja el plan “${planName}”.`,
      {
        x: 60,
        y: 660,
        size: fontSize,
        font: codecFont,
        color: rgb(0, 0, 0)
      }
    );
    page.drawText(
      `${formatNumber(globalCapacity)} kWp (${formatNumber(globalPanels)} Paneles)`,
      {
        x: 120,
        y: 552,
        size: fontSize,
        font: codecFont,
        color: rgb(0, 0, 0)
      }
    );
    page.drawText(`${formatNumber(globalCapacity * 2220)} kWh`, {
      x: 385,
      y: 552,
      size: fontSize,
      font: codecFont,
      color: rgb(0, 0, 0)
    });
    page.drawText(
      'Considerando el consumo eléctrico real, así como el perfil de producción energética de',
      {
        x: 60,
        y: 515,
        size: fontSize,
        font: codecFont,
        color: rgb(0, 0, 0)
      }
    );
    page.drawText(
      'nuestros parques solares, se ha realizado un estudio que calcula con exactitud el tamaño',
      {
        x: 60,
        y: 500,
        size: fontSize,
        font: codecFont,
        color: rgb(0, 0, 0)
      }
    );
    page.drawText('ideal de su Instalación Solar Virtual.', {
      x: 60,
      y: 485,
      size: fontSize,
      font: codecFont,
      color: rgb(0, 0, 0)
    });

    page.drawText(
      `En base a este estudio, se aconseja al cliente una Instalación Solar Virtual de ${formatNumber(globalCapacity)} kWp,`,
      {
        x: 60,
        y: 470,
        size: fontSize,
        font: codecFont,
        color: rgb(0, 0, 0)
      }
    );
    page.drawText(
      `equivalente a ${formatNumber(globalPanels)} paneles. Dicha Instalación Solar Virtual producirá ${formatNumber(globalCapacity * 2220)} kWh`,
      {
        x: 60,
        y: 455,
        size: fontSize,
        font: codecFont,
        color: rgb(0, 0, 0)
      }
    );

    page.drawText(
      `de electricidad al año, el equivalente a un ${(((globalCapacity * 2220) / yearlyConsumption) * 100).toFixed(2)}% del consumo total.`,
      {
        x: 60,
        y: 440,
        size: fontSize,
        font: codecFont,
        color: rgb(0, 0, 0)
      }
    );

    const csvReadStream = await fetch(csvPath).then((resp) => resp.body);
    const records = await parseCSV(csvReadStream, globalCapacity);
    const maxProduction = findMaxProduction(records);
    // Generate Chart Page

    await generateChartPage({
      records,
      months: spanishMonths,
      pdfDoc: newPdfDoc,
      chartImgWidth: 170,
      chartImgHeight: 140,
      chartBackground: chartBackground1,
      imageWidth: imageDims.width,
      imageHeight: imageDims.height,
      pageWidth,
      pageHeight,
      maxProduction
    });

    await generatePage6(
      page6BackgroundImage,
      newPdfDoc,
      pageWidth,
      pageHeight,
      globalCapacity,
      codecFont,
      globalPrice,
      globalSavings,
      globalPayback,
      globalPaybackRooftop,
      globalTons
    );

    // Generate Payback Chart Page

    const page7 = await embedChartBackground(
      newPdfDoc,
      chartBackground2,
      imageDims.width,
      imageDims.height,
      pageWidth,
      pageHeight
    );
    // const chartUrl = await generatePaybackChart(cumulativeSavings, globalPrice);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/generate-payback-chart`,
      {
        method: 'POST',
        body: JSON.stringify({
          cumulativeSavings,
          globalPrice,
          planName
        })
      }
    );
    const chartUrl = await response.text();
    chartUrl &&
      (await drawChart({
        pdfDoc: newPdfDoc,
        page: page7,
        chartUrl,
        xPos: 50,
        yPos: 225,
        chartImgWidth: 500,
        chartImgHeight: 450
      }));
    // const lastPageBytes = fs.readFileSync(
    //   path.join(process.cwd(), 'public', lastPdfPage)
    // );
    const lastPageBytes = await fetch(lastPdfPage).then((resp) =>
      resp.arrayBuffer()
    );
    const lastPdfDoc = await PDFDocument.load(lastPageBytes);
    const [copiedPage] = await newPdfDoc.copyPages(
      lastPdfDoc,
      lastPdfDoc.getPageIndices()
    );
    newPdfDoc.addPage(copiedPage);
    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await newPdfDoc.save();
    console.log('🚀 Done');
    return pdfBytes;
  } catch (error) {
    console.log(error);
    return;
  }
};
