import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(req: Request, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const body = await req.json();
      console.log({ body });
      const browser = await puppeteer.launch();
      console.log('Browser launched');

      const page = await browser.newPage();
      console.log('New page created');

      // Set content to your HTML
      const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Dummy HTML Content</title>
      </head>
      <body>
          <img src="https://user-images.githubusercontent.com/10379601/29446482-04f7036a-841f-11e7-9872-91d1fc2ea683.png" alt="Description image" width="348" height="296" />

      </body>
      </html>
    `;
      console.log('HTML content set');

      // Set the HTML content of the page
      await page.setContent(htmlContent);
      console.log('Content set to page');

      // Generate PDF
      const pdfBuffer = await page.pdf({ format: 'A4' });
      console.log('PDF generated');

      await browser.close();
      console.log('Browser closed');

      // Set headers
      const headers = {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=output.pdf'
      };

      // Return NextResponse with PDF buffer and headers
      return new NextResponse(pdfBuffer, {
        status: 200,
        headers: headers
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).send('Error generating PDF');
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
