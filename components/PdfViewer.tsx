'use client';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();
const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/'
};

const PdfViewer = ({ fileUrl }: { fileUrl: string }) => {
  const [numPages, setNumPages] = useState<number>();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  function onDocumentLoadSuccess({
    numPages: nextNumPages
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
      setIsTablet(false);
    } else if (window.innerWidth < 1024) {
      setIsTablet(true);
      setIsMobile(false);
    } else {
      setIsMobile(false);
      setIsTablet(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    () => {
      window.removeEventListener('resize', handleResize);
    };
  }),
    [];
  return (
    <Document
      file={fileUrl}
      onLoadSuccess={onDocumentLoadSuccess}
      options={options}
      className="h-full"
      loading={
        <div className="flex items-center justify-center w-full h-[400px]">
          <CircularProgress className="w-5 h-5" />
        </div>
      }
    >
      {Array.from(new Array(numPages), (el, index) => (
        <Page
          key={`page_${index + 1}`}
          pageNumber={index + 1}
          pageIndex={index + 1}
          loading={<p></p>}
          scale={isMobile ? 0.7 : isTablet ? 0.9 : 1.1}
        />
      ))}
    </Document>
  );
};

export default PdfViewer;
