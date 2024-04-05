import { PDFDocument, PDFPage } from 'pdf-lib';

export interface SavingRecord {
  years: number;
  saving: number;
}

export interface GeneratePDFProps {
  initialPDFPath: string;
  page4BackgroundImage: string;
  page6BackgroundImage: string;
  lastPdfPage: string;
  chartBackground1: string;
  chartBackground2: string;
  csvPath: string;
  codecRegularPath: string;
  globalCapacity: number;
  globalPanels: number;
  globalPrice: number;
  globalSavings: number;
  globalPayback: number;
  globalPaybackRooftop: number;
  globalTons: number;
  cumulativeSavings: SavingRecord[];
  yearlyConsumption: number;
  planName: string;
}

export interface Chart {
  pdfDoc: PDFDocument;
  chartImgWidth: number;
  chartImgHeight: number;
}

export interface DrawChartProps extends Chart {
  page: PDFPage;
  xPos: number;
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
  maxProduction: number;
}
