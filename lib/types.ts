import { cupsErrorTypes } from '@/utils/utils';
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

export interface PanelSavingRecord {
  years: number;
  saving: string;
}

export interface PanelProvider {
  neosPanelProvider: string;
  neosPanelKeepProvider: string;
  rooftopPanelKeepProvider: string;
  keepProvider: string;
}

export interface ISolarPaybackError {
  error: boolean;
  message: string;
  cupsCode?: string;
  type: cupsErrorTypes;
}

export interface ISolarPaybackData {
  total_price_before_tax?: number;
  neos_installation_tax?: number;
  number_of_panels?: number;
  required_capacity?: number;
  vsi_required_capacity?: number;
  total_price_after_tax?: number;
  type_consumption_point?: any;
  percent_savings_year1_w_neos?: number;
  percent_savings_year1_without_neos?: number;
  savings_retail_w_neos?: number;
  savings_retail_without_neos?: number;
  payback_rooftop?: number;
  payback_w_neos?: number;
  payback_without_neos?: number;
  neos_total_emissions_saved_in_tons?: number;
  neos_not_provider_total_emissions_saved_in_tons?: number;
  neos_elephants_carbon_capture?: number;
  neos_not_provider_elephants_carbon_capture?: number;
  save_yearly_w_neos?: PanelSavingRecord[];
  save_yearly_without_neos?: PanelSavingRecord[];
  total_savings_w_neos?: number;
  total_savings_without_neos?: number;
  neos_cumulative_savings?: PanelSavingRecord[];
  current_cumulative_savings?: PanelSavingRecord[];
  yearly_consumption?: number;
  tableData?: PanelProvider[];
  error?: boolean;
  message?: string;
  cupsCode?: string;
  type?: cupsErrorTypes;
}
