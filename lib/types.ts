import { PDFDocument, PDFPage } from 'pdf-lib';

export interface SavingRecord {
  years: number;
  saving: number;
}

export interface GeneratePDFProps {
  initialPDFPath: string;
  page4BackgroundImage: string;
  page8BackgroundImage: string;
  lastPdfPage: string;
  chartBackground1: string;
  chartBackground2: string;
  csvPath: string;
  globalCapacity: number;
  globalPanels: number;
  globalPercentage: number;
  globalPrice: number;
  globalSavings: number;
  globalPaybackNeos: number;
  globalPaybackRooftop: number;
  globalTons: number;
  cumulativeSavings: SavingRecord[];
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
