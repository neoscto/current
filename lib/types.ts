import { PDFDocument, PDFPage } from 'pdf-lib';

export interface GeneratePDFProps {
  initialPDFPath: string;
  page4BackgroundImage: string;
  chartBackground: string;
  csvPath: string;
  globalCapacity: number;
  globalPanels: number;
  globalPercentage: number;
}

export interface Chart {
  pdfDoc: PDFDocument;
  xPos: number;
  chartImgWidth: number;
  chartImgHeight: number;
}

export interface DrawChartProps extends Chart {
  page: PDFPage;
  chartUrl: string;
  yPos: number;
}

export interface GenerateChartPageProps extends Chart {
  records: any;
  months: { name: string; index: number }[];
  chartBackground: string;
  imageWidth: number;
  imageHeight: number;
  pageWidth: number;
  pageHeight: number;
}
