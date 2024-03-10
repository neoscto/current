import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(req: Request, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const body = await req.json();
      const browser = await puppeteer.launch();
      console.log('Browser launched');

      const page = await browser.newPage();
      console.log('New page created');

      const total_price_before_tax =
        body.data.total_price_before_tax.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });

      const neos_installation_tax =
        body.data.neos_installation_tax.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });

      const number_of_panels = body.data.number_of_panels.toLocaleString(
        'en-US',
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }
      );
      const required_capacity = body.data.required_capacity.toLocaleString(
        'en-US',
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }
      );

      const percent_savings_year1_w_neos =
        body.data.percent_savings_year1_w_neos.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
      const savings_retail_w_neos =
        body.data.savings_retail_w_neos.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
      const payback_w_neos = body.data.payback_w_neos.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      const neos_total_emissions_saved_in_tons =
        body.data.neos_total_emissions_saved_in_tons.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
      const neos_elephants_carbon_capture =
        body.data.neos_elephants_carbon_capture.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
      const tableData = body.data.tableData;

      // Set content to your HTML
      const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Dummy HTML Content</title>
          <link href='https://fonts.googleapis.com/css?family=Outfit' rel='stylesheet'>
          <style>
              html {
                -webkit-print-color-adjust: exact;
              }
              body {
                font-family: 'Outfit';font-size: 22px;
              }
          </style>
      </head>
      <body>
          <div style="min-width: 64rem;  background-color: white; padding: 1rem 4rem;">
          <div style="display: flex; justify-content: center; align-items: center; gap: 2.5rem;">
          <div style="width: 100%; display: flex; flex-direction: column; align-items: center; max-width: 100%;">
            <img src="https://www.neosenergy.co/description.png" alt="Description image" height="296" />
            <div style="text-align: center;">
              <h1 style="font-size: 1.875rem; font-weight: bold;">Precio: € ${total_price_before_tax}</h1>
              <h1 style="font-size: 1.125rem; font-weight: bold;">(más IVA: € ${neos_installation_tax} )</h1>
              <p style="color: #828282; font-weight: 500; font-size: 1rem;">por 25 años de energía solar</p>
          </div>
          <div style="display: flex; justify-content: center; align-items: flex-end; gap: 1rem; margin-top: 1.25rem; width: 100%;">
          <div style="display: flex; flex-direction: column; gap: 0.375rem;">
        <label style="text-align: center; font-size: 0.875rem; font-weight: medium;">Código de referencia para un descuento</label>
         <input type="text" name="cups" placeholder="Entre aquí" style=" padding-left: 0.25rem; padding-right: 0.25rem; border: 1px solid #E0E0E0; border-radius: 0.5rem; text-align: center; height: 2.75rem;"/>
      </div>
      <div>
       <button style="background-color: #FD7C7C; padding: 0.75rem; color: #ffffff; border-radius: 0.75rem; font-weight: bold; border:0px">VALIDAR</button>
      </div>
    </div>
  </div>
  <div style="display: flex; justify-content: center; align-items: center; max-width: 32rem; width: 100%;">
    <div style="max-width: 100%; width: 100%;">
      <div style="color: #000000;">
        <h1 style="display: block; text-align: center;">
          <span style="font-size: 1.875rem; font-weight: bold; text-align: center;">Tu Oferta:</span>
          <br />
          <span style="font-size: 1.5rem; padding: 0.25rem; text-align: left;"><b>${number_of_panels}</b> Paneles (Equivalentes a <b>${required_capacity}</b> kWp)</span>
        </h1>
      </div>  
      <p style="font-size: 1.25rem; font-weight: bold;color: #333333; text-align: center;">Elige Tu Plan</p>
      <div style="width: 100%; font-weight: 500; display: flex; gap: 1rem; justify-content: normal; flex-direction: row;">
        <button style="width: 100%; font-weight: 500; border-width: 2px; border-radius: 1rem; padding: 1rem; border: 2px solid #66BCDA; background-color: transparent;">Instalación Neos<br />y Suministro Neos</button>
        <button style="width: 100%; font-weight: 500; border-width: 2px; border-radius: 1rem; padding: 1rem; border: 2px solid #E0E0E0; background-color: transparent;">Instalación Neos<br />y Suministro Actual</button>
      </div>
      <p style="font-weight: bold; margin: 1rem 0;font-size: 1rem;">Cambia entre los dos planes anteriores para comparar nuestras estimaciones:</p>
      <ul style="font-size: 1.125rem; font-weight: 500; color: #333333; list-style: disc;">
        <li>Porcentaje de ahorro en tu primer año: <b>${percent_savings_year1_w_neos}%</b></li>
        <li>Ahorro total durante 25 años: <b>€ ${savings_retail_w_neos}</b></li>
        <li>Amortización de la inversión en: <b>${payback_w_neos} años</b></li>
        <li>Emisiones de CO2 evitadas: <b>${neos_total_emissions_saved_in_tons} toneladas</b> ( ${neos_elephants_carbon_capture} elefantes)</li>
      </ul>
      <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 1.25rem; flex-direction: row;">
    <div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
        <button style="background-color: #cccccc; color: #666666; padding: 16px; font-size: 1rem; font-weight: bold; border: 1px solid #999999; border-radius: 0.75rem; width: 100%; height: 100%; text-transform: uppercase;">
            descargar oferta
        </button>
        <p style="font-size: 14px; color: #2D9CDB; margin-top: 4px;">
            Próximamente...
        </p>
    </div>
    <div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
        <button style="background-color: #cccccc; color: #666666; padding: 16px; font-size: 1rem; font-weight: bold; border: 1px solid #999999; border-radius: 0.75rem; width: 100%; height: 100%; text-transform: uppercase;" disabled>
            gerar contrato
        </button>
        <p style="font-size: 14px; color: #2D9CDB; margin-top: 4px;">
            Próximamente...
        </p>
    </div>
</div>

    </div>
  </div>
</div>


          <div style="display: flex; gap: 0.5rem; margin-top: 2.5rem;"
          >
            <div>
              <div
                style="display: flex; flex-direction: row; height: 5rem;"
              >
                <div style="width: 225px;padding-left: 1.25rem;"}></div>
                <div
                  style="width: 180px; display: flex; justify-content: center; align-items: center; border-top-left-radius: 1.5rem; border-color: #0F9DD0; border-width: 1px; padding: 1rem 0.25rem; text-align: center; font-weight: 600; font-size: 0.875rem; border: 1px solid #0F9DD0;"
                >
                  <img
                    src="https://www.neosenergy.co/PersonalizedOffer.png"
                    width="24"
                    height="24"
                    alt="premium"
                    style="padding: 0 0.375rem;"

                  />
                  Instalación Neos
                  <br /> y Suministro Neos
                </div>
                <div
                  style="width: 138px; display: flex; justify-content: center; align-items: center; border-color: #E0E0E0; border-width: 1px; padding: 1rem 0.25rem; text-align: center; font-weight: 600; font-size: 14px;border: 1px solid #E0E0E0;"

                >
                  Instalación Neos
                  <br /> y Suministro Actual
                </div>
                <div
                  style="width: 156px; display: flex; justify-content: center; align-items: center; border-color: #E0E0E0; border-width: 1px; padding: 1rem 0.25rem; text-align: center; font-weight: 600; font-size: 14px;border: 1px solid #E0E0E0;"

                >
                  Instalación en Tejado
                  <br /> y Suministro Actual
                </div>
                <div
                  style="width: 108px; display: flex; justify-content: center; align-items: center; border-color: #E0E0E0; border-width: 1px; padding: 1rem 0.25rem; text-align: center; font-weight: 600; font-size: 14px; border-top-right-radius: 1.5rem;border: 1px solid #E0E0E0;"

                >
                  Suministro
                  <br /> Actual
                </div>
              </div>

              <div
                style="display: flex; flex-direction: row; height: 5rem;"

              >
                <div
                  style="width: 225px; padding-left: 1.25rem; border-width: 1px; border-color: #E0E0E0; border-right-width: 0px; border-bottom-width: 0px; color: #4F4F4F; font-size: 14px; font-weight: 500; display: flex; justify-content: center; align-items: center;border: 1px solid #E0E0E0;"

                >
                  Coste de Instalación con Impuestos (€)
                </div>
                <div
                  style="display: flex; justify-content: center; align-items: center; padding: 1rem 0.20rem; color: #4F4F4F; font-size: 14px; font-weight: 500; text-align: center; border-width: 1px; border-color: #0F9DD0; background-color: #E8F5FA; border-bottom-width: 0px; border-top-width: 0px; width: 180px; border: 1px solid #E0E0E0;"

                >
                  ${tableData[0].neosPanelProvider}
                </div>
                <div
                  style="display: flex; justify-content: center; align-items: center;  color: #4F4F4F; font-size: 14px; font-weight: 500; text-align: center; border-width: 1px; border-color: #E0E0E0; border-right-width: 0px; border-bottom-width: 0px; border-top-width: 0px; width: 138px;border: 1px solid #E0E0E0;padding: 1rem 0.25rem;"

                >
                  ${tableData[0].neosPanelKeepProvider}
                </div>
                <div
                  style="display: flex; justify-content: center; align-items: center; color: #4F4F4F; font-size: 14px; font-weight: 500; text-align: center; border-width: 1px; border-color: #E0E0E0; border-right-width: 0px; border-bottom-width: 0px; border-top-width: 0px; width: 156px;border: 1px solid #E0E0E0;padding: 1rem 0.25rem;"

                >
                  ${tableData[0].rooftopPanelKeepProvider}
                </div>
                <div
                  style="display: flex; justify-content: center; align-items: center;  color: #4F4F4F; font-size: 14px; font-weight: 500; text-align: center; border-width: 1px; border-color: #E0E0E0; border-bottom-width: 0px; border-top-width: 0px; width: 108px;border: 1px solid #E0E0E0;padding: 1rem 0.25rem;"

                >
                  -
                </div>
              </div>

              <div
                style="display: flex; flex-direction: row; height: 5rem;"

              >
                <div
                  style="width: 225px; padding-left: 1.25rem; border-width: 1px; border-color: #E0E0E0; border-right-width: 0px; border-bottom-width: 0px; color: #4F4F4F; font-size: 14px; font-weight: 500; display: flex; align-items: center;border: 1px solid #E0E0E0;"

                >
                  *Ahorro en 25 Años (%)
                </div>
                <div
                  style="display: flex; justify-content: center; align-items: center; padding: 1rem 0.20rem; color: #4F4F4F; font-size: 14px; font-weight: 500; text-align: center; border-width: 1px; border-color: #0F9DD0; background-color: #E8F5FA; border-bottom-width: 0px; width: 180px;border: 1px solid #E0E0E0;"

                >
                  ${tableData[1].neosPanelProvider}
                </div>
                <div
                  style="display: flex; justify-content: center; align-items: center;  color: #4F4F4F; font-size: 14px; font-weight: 500; text-align: center; border-width: 1px; border-color: #E0E0E0; border-right-width: 0px; border-bottom-width: 0px; width: 138px;border: 1px solid #E0E0E0;padding: 1rem 0.25rem;"

                >
                  ${tableData[1].neosPanelKeepProvider}
                </div>
                <div
                  style="display: flex; justify-content: center; align-items: center;  color: #4F4F4F; font-size: 14px; font-weight: 500; text-align: center; border-width: 1px; border-color: #E0E0E0; border-right-width: 0px; border-bottom-width: 0px; width: 156px;border: 1px solid #E0E0E0;padding: 1rem 0.25rem;"

                >
                  ${tableData[1].rooftopPanelKeepProvider}
                </div>
                <div
                  style="display: flex; justify-content: center; align-items: center;  color: #4F4F4F; font-size: 14px; font-weight: 500; text-align: center; border-width: 1px; border-color: #E0E0E0; border-bottom-width: 0px; width: 108px;border: 1px solid #E0E0E0;padding: 1rem 0.25rem;"

                >
                  ${tableData[1].keepProvider}
                </div>
              </div>
              
              <div
                style="display: flex; flex-direction: row; height: 5rem;"

              >
                <div
                  style="width: 225px; padding-left: 1.25rem; border-width: 1px; border-color: #E0E0E0; border-right-width: 0px; border-bottom-width: 0px; color: #4F4F4F; font-size: 14px; font-weight: 500; display: flex; align-items: center;border: 1px solid #E0E0E0;"

                >
                  *Ahorro en 25 Años (€)

                </div>
                <div
                  style="display: flex; justify-content: center; align-items: center; padding: 1rem 0.20rem; color: #4F4F4F; font-size: 14px; font-weight: 500; text-align: center; border-width: 1px; border-color: #0F9DD0; background-color: #E8F5FA; border-bottom-width: 0px; width: 180px;border: 1px solid #E0E0E0;"

                >
                  ${tableData[2].neosPanelProvider}
                </div>
                <div
                  style="display: flex; justify-content: center; align-items: center;  color: #4F4F4F; font-size: 14px; font-weight: 500; text-align: center; border-width: 1px; border-color: #E0E0E0; border-right-width: 0px; border-bottom-width: 0px; width: 138px;border: 1px solid #E0E0E0;padding: 1rem 0.25rem;"

                >
                  ${tableData[2].neosPanelKeepProvider}
                </div>
                <div
                  style="display: flex; justify-content: center; align-items: center;  color: #4F4F4F; font-size: 14px; font-weight: 500; text-align: center; border-width: 1px; border-color: #E0E0E0; border-right-width: 0px; border-bottom-width: 0px; width: 156px;border: 1px solid #E0E0E0;padding: 1rem 0.25rem;"

                >
                   ${tableData[2].rooftopPanelKeepProvider}
                </div>
                <div
                  style="display: flex; justify-content: center; align-items: center;  color: #4F4F4F; font-size: 14px; font-weight: 500; text-align: center; border-width: 1px; border-color: #E0E0E0; border-bottom-width: 0px; width: 108px;border: 1px solid #E0E0E0;padding: 1rem 0.25rem;"

                >
                  ${tableData[2].keepProvider}
                </div>
              </div>

              <div
                style="display: flex; flex-direction: row; height: 5rem;"

              >
                <div
                  style="width: 225px; padding-left: 1.25rem; border-width: 1px; border-color: #E0E0E0; border-right-width: 0px; border-bottom-width: 0px; color: #4F4F4F; font-size: 14px; font-weight: 500; display: flex; align-items: center;border: 1px solid #E0E0E0;"

                >
                  Amortización (Años)


                </div>
                <div
                  style="display: flex; justify-content: center; align-items: center; padding: 1rem 0.20rem; color: #4F4F4F; font-size: 14px; font-weight: 500; text-align: center; border-width: 1px; border-color: #0F9DD0; background-color: #E8F5FA; border-bottom-width: 0px; width: 180px;border: 1px solid #E0E0E0;"

                >
                  ${tableData[3].neosPanelProvider}
                </div>
                <div
                  style="display: flex; justify-content: center; align-items: center;  color: #4F4F4F; font-size: 14px; font-weight: 500; text-align: center; border-width: 1px; border-color: #E0E0E0; border-right-width: 0px; border-bottom-width: 0px; width: 138px;border: 1px solid #E0E0E0;padding: 1rem 0.25rem;"

                >
                 ${tableData[3].neosPanelKeepProvider}
                </div>
                <div
                  style="display: flex; justify-content: center; align-items: center;  color: #4F4F4F; font-size: 14px; font-weight: 500; text-align: center; border-width: 1px; border-color: #E0E0E0; border-right-width: 0px; border-bottom-width: 0px; width: 156px;border: 1px solid #E0E0E0;padding: 1rem 0.25rem;"

                >
                  ${tableData[3].rooftopPanelKeepProvider}
                </div>
                <div
                  style="display: flex; justify-content: center; align-items: center;  color: #4F4F4F; font-size: 14px; font-weight: 500; text-align: center; border-width: 1px; border-color: #E0E0E0; border-bottom-width: 0px; width: 108px;border: 1px solid #E0E0E0;padding: 1rem 0.25rem;"

                >
                  ${tableData[3].keepProvider}
                </div>
              </div>

              <div
                style="display: flex; flex-direction: row; height: 5rem;"

              >
                <div
                  style="width: 225px; padding-left: 1.25rem; border-width: 1px; border-color: #E0E0E0; border-right-width: 0px; border-bottom-width: 0px; color: #4F4F4F; font-size: 14px; font-weight: 500; display: flex; align-items: center;border: 1px solid #E0E0E0;border-bottom-left-radius: 1.5rem;"

                >
                  Ahorro de Emisiones de CO2 (Toneladas)

                </div>
                <div
                  style="display: flex; justify-content: center; align-items: center; padding: 1rem 0.20rem; color: #4F4F4F; font-size: 14px; font-weight: 500; text-align: center; border-width: 1px; border-color: #0F9DD0; background-color: #E8F5FA; border-bottom-width: 0px; width: 180px;border: 1px solid #E0E0E0;"

                >
                  ${tableData[4].neosPanelProvider}
                </div>
                <div
                  style="display: flex; justify-content: center; align-items: center;  color: #4F4F4F; font-size: 14px; font-weight: 500; text-align: center; border-width: 1px; border-color: #E0E0E0; border-right-width: 0px; border-bottom-width: 0px; width: 138px;border: 1px solid #E0E0E0;padding: 1rem 0.25rem;"

                >
                  ${tableData[4].neosPanelKeepProvider}
                </div>
                <div
                  style="display: flex; justify-content: center; align-items: center;  color: #4F4F4F; font-size: 14px; font-weight: 500; text-align: center; border-width: 1px; border-color: #E0E0E0; border-right-width: 0px; border-bottom-width: 0px; width: 156px;border: 1px solid #E0E0E0;padding: 1rem 0.25rem;"

                >
                  ${tableData[4].rooftopPanelKeepProvider}
                </div>
                <div
                  style="display: flex; justify-content: center; align-items: center;  color: #4F4F4F; font-size: 14px; font-weight: 500; text-align: center; border-width: 1px; border-color: #E0E0E0; border-bottom-width: 0px; width: 108px;border: 1px solid #E0E0E0;padding: 1rem 0.25rem;border-bottom-right-radius: 1.5rem;"

                >
                  ${tableData[4].keepProvider}
                </div>
              </div>
            </div>
          </div>

<div
            style="display: flex; justify-content: center; align-items: center; padding: 2.5rem 0; flex-direction: row; gap: 2rem;"

          >
            <p
              style="font-size: 1.25rem; color: black; font-weight: 600;"

            >
              Licenciado por
            </p>
            <div
              style="display: flex; justify-content: center; align-items: center; gap: 2.5rem;"

            >
              <img
                src="https://neosenergy.co/Footer/CNMC.png"
                alt="Neos logo"
                width="56"
                height="32"
              />
              <img
                src="https://neosenergy.co/Footer/REE-removebg-preview.png"
                alt="Neos logo"
                width="160"
                height="20"
              />
              <img
                src="https://neosenergy.co/Footer/OMIE-removebg-preview.png"
                alt="Neos logo"
                width="62"
                height="30"
              />
            </div>
          </div>




          <div
            style="width: 100%; padding: 1.5rem; border: 1px solid #E0E0E0; border-radius: 1.5rem; color: black;"

          >
            <h1
              style="font-size: 1.25rem; font-weight: 600; text-align: center;"

            >
              ¿Cómo funciona?
            </h1>

            <div
              style="display: flex; margin-top: 34px; gap: 1.5rem; flex-direction: row;"

            >
              <div
                style="background-color: #E7F5FA; border-radius: 1.5rem; padding: 1.25rem; width: 100%;"

              >
                <h1
                  style="font-size: 1.125rem; text-align: center; font-weight: 600;"

                >
                  Instalación Neos y Suministro Neos
                </h1>
                <ul
                  style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem 0; list-style-type: disc; margin: 0 1.25rem; font-size: 0.875rem;"

                >
                  <li>
                    Neos se convierte en su proveedor de electricidad. No se
                    preocupe, nosotros nos encargamos del papeleo.
                  </li>
                  <li>
                    Usted consumirá gratuitamente la electricidad generada por
                    su Instalación Neos. Si no está produciendo electricidad,
                    como por la noche, cubriremos su consumo con electricidad
                    del mercado mayorista, sin margen de beneficio, a diferencia
                    de otros proveedores. Cualquier excedente de electricidad
                    producido por su Instalación Neos genera ingresos y reduce
                    aún más el coste de la electricidad que le suministramos.
                  </li>
                  <li>
                    Benefíciese de todo lo anterior por una cuota mensual de
                    €6,00.
                  </li>
                </ul>
              </div>

              <div
                style="background-color: #E7F5FA; border-radius: 1.5rem; padding: 1.25rem; width: 100%;"
              >
                <h1
                  style="font-size: 1.125rem; text-align: center; font-weight: 600;"
                >
                  Instalación Neos y Suministro Actual
                </h1>

                <ul
                  style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem 0; list-style-type: disc; margin: 0 1.25rem; font-size: 0.875rem;"

                >
                  <li>
                    Puedes comprar Paneles Neos y mantener tu comercializadora
                    actual. También podrás cambiar de comercializadora tantas
                    veces como desees durante la vida útil de los Paneles Neos.
                  </li>
                  <li>
                    Tu factura de la luz no cambiará, y será responsabilidad de
                    tu comercializadora. Mes a mes, Neos ingresará el ahorro de
                    tus Paneles Neos en tu cuenta bancaria. Por tanto, en vez de
                    ver el ahorro reflejado en tu factura, lo verás en tu cuenta
                    bancaria.
                  </li>
                  <li>
                    Es probable que tu comercializadora te cobre precios más
                    altos de los que te cobrará Neos, por lo que tu ahorro total
                    disminuirá.
                  </li>
                </ul>
              </div>
            </div>
          </div>



          <div
            style="display: flex; gap: 1.5rem; margin-top: 2rem; flex-direction: row;"

          >
            <div
              style="width: 100%; padding: 1.5rem; border: 1px solid #E0E0E0; display: flex; flex-direction: column; justify-content: space-between; gap: 1rem; border-radius: 1.5rem;"

            >
              <h1
                style="font-size: 1.125rem; font-weight: 700; display: flex; flex-direction: column; text-align: left;"

              >
                Nuestros clientes nos recomiendan
              </h1>

              <div style="display: flex; gap: 1rem;"
>
                <img
                  src="https://neosenergy.co/customer.png"
                  alt="user"
                  width="50"
                  height="50"
                  style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;"

                />

                <div style="width: 100%;">
                  <p
                    style="font-size: 1rem; font-weight: 500; color: black;"

                  >
                    Manuel Fernández
                  </p>
                  
                  <p style="font-size: 0.875rem; color: #4F4F4F;">
                    "¡Me encanta Neos! Gracias a ellos, mis facturas de
                    electricidad se acercan a ¡0,00 € mes tras mes! Vivo en un
                    piso, así que sin ellos nunca habría podido acceder a los
                    paneles solares."
                  </p>
                </div>
              </div>

              <div style="display: flex; justify-content: center;"
>
                <button
                  style="background-color: #FD7C7C; padding: 0.5rem 0.75rem; color: #ffffff; border-radius: 0.75rem; font-weight: bold; font-size: 16px;border:0px"

                >
                  Elige Tu Plan
                </button>
              </div>
            </div>

            <div
              style="background-color: #E7F5FA; border-radius: 1.5rem; padding: 1.25rem 3.5rem; display: flex; flex-direction: column; justify-content: space-between; align-items: center; gap: 1rem;"

            >
              <h1
                style="text-align: center; font-size: 1rem; font-weight: bold;"

              >
                Revise su oferta en una llamada con uno de nuestros expertos
              </h1>
              <div
                style="display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 0.5rem;"

              >
                <img
                  src="https://neosenergy.co/ceo-image.jpg"
                  alt="user"
                  style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;"

                  width="50"
                  height="50"
                />

                <p
                  style="font-size: 0.875rem; color: black; font-weight: 500; text-align: center;"

                >
                  Jose Laffitte
                </p>
                <p
                  style="font-size: 0.875rem; color: black; text-align: center;"

                >
                  jose@neosenergy.co
                </p>
              </div>
              <div style="display: flex; justify-content: center;"
>
                <button
                  style="background-color: #FD7C7C; padding: 0.5rem 0.75rem; color: #ffffff; border-radius: 0.75rem; font-weight: bold; font-size: 16px;border:0px"

                >
                  HABLA CON UN EXPERTO
                </button>
              </div>
            </div>
          </div>




</div>

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
