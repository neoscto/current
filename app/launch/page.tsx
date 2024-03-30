'use client';
import React, { useState } from 'react';
import NeosButton from '@/components/NeosButton';
import MainContainer from '@/components/sharedComponents/MainContainer';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import VideoPreview from '../videoPlayer/preview';
import Licensed from '@/components/Licensed';
import { useForm } from '@mantine/form';
import { Button, TextInput } from '@mantine/core';
import classes from './launch.module.css';

type SubmitValue = {
  input: string;
};

const Launch = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const form = useForm({
    initialValues: {
      input: ''
    }
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: SubmitValue) => {
    setLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/collect-email`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          input: values.input
        })
      }
    );
    form.reset();
    setLoading(false);
  };
  return (
    <MainContainer>
      <div>
        <div
          style={{
            maxWidth: '64rem',
            // width: '100%',
            backgroundColor: 'white',
            padding: '1rem 4rem'
          }}
        >
          {/* Offer and virtual solar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2.5rem'
            }}
          >
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '100%'
              }}
            >
              <img
                src="description.png"
                alt="Description image"
                width={348}
                height={296}
              />
              <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>
                  Precio: € 1,976.63
                </h1>
                <h1 style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>
                  (más IVA: € €197.66 )
                </h1>

                <p
                  style={{
                    color: '#828282',
                    fontWeight: '500',
                    fontSize: '1rem'
                  }}
                >
                  por 25 años de energía solar
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  gap: '1rem',
                  marginTop: '1.25rem',
                  width: '100%'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.375rem'
                  }}
                >
                  <label
                    style={{
                      textAlign: 'center',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}
                  >
                    Código de referencia para un descuento
                  </label>
                  <input
                    type="text"
                    name="cups"
                    placeholder="Entre aquí"
                    style={{
                      paddingTop: '0.75rem',
                      paddingBottom: '0.75rem',
                      paddingLeft: '0.25rem',
                      paddingRight: '0.25rem',
                      border: '1px solid #E0E0E0',
                      borderRadius: '0.5rem',
                      textAlign: 'center',
                      height: '2.75rem'
                    }}
                  />
                </div>
                <div>
                  <button
                    style={{
                      backgroundColor: '#FD7C7C',
                      padding: '0.75rem',
                      color: '#ffffff',
                      borderRadius: '0.75rem',
                      fontWeight: 'bold'
                    }}
                  >
                    VALIDAR
                  </button>
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: '32rem',
                width: '100%'
              }}
            >
              <div style={{ maxWidth: '100%', width: '100%' }}>
                <div
                  style={{
                    paddingTop: '0.75rem',
                    paddingBottom: '0.75rem',
                    color: '#000000'
                  }}
                >
                  <h1 style={{ display: 'block', textAlign: 'center' }}>
                    <span
                      style={{
                        fontSize: '1.875rem',
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }}
                    >
                      Tu Oferta:
                    </span>
                    <br />
                    <span
                      style={{
                        fontSize: '1.5rem',
                        padding: '0.25rem',
                        textAlign: 'left'
                      }}
                    >
                      <b>2.71</b> Paneles (Equivalentes a <b>1.24</b> kWp)
                    </span>
                  </h1>
                </div>

                <p
                  style={{
                    padding: '1rem',
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: '#333333',
                    textAlign: 'center'
                  }}
                >
                  Elige Tu Plan
                </p>
                <div
                  style={{
                    width: '100%',
                    fontWeight: '500',
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'normal',
                    flexDirection: 'row'
                  }}
                >
                  <button
                    style={{
                      width: '100%',
                      fontWeight: '500',
                      borderWidth: '2px',
                      borderRadius: '1rem',
                      padding: '1rem',
                      border: '2px solid #66BCDA'
                    }}
                  >
                    Instalación Neos
                    <br />y Suministro Neos
                  </button>
                  <button
                    style={{
                      width: '100%',
                      fontWeight: '500',
                      borderWidth: '2px',
                      borderRadius: '1rem',
                      padding: '1rem',
                      border: '2px solid #E0E0E0'
                    }}
                  >
                    Instalación Neos
                    <br />y Suministro Actual
                  </button>
                </div>

                <p
                  style={{
                    fontWeight: 'bold',
                    marginTop: '1rem',
                    marginBottom: '1rem'
                  }}
                >
                  Cambia entre los dos planes anteriores para comparar nuestras
                  estimaciones: :
                </p>

                <ul
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: '500',
                    color: '#333333',
                    listStyle: 'disc'
                  }}
                >
                  <li>
                    Porcentaje de ahorro en tu primer año: <b>54.17%</b>
                  </li>
                  <li>
                    Ahorro total durante 25 años: <b>€ 11,698.12</b>
                  </li>
                  <li>
                    Amortización de la inversión en: <b>6.95 años</b>
                  </li>
                  <li>
                    Emisiones de CO2 evitadas:
                    <b> 44.91 toneladas</b> ( 11.23 elefantes)
                  </li>
                </ul>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem',
                    marginTop: '1.25rem',
                    flexDirection: 'row'
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <button
                      style={{
                        backgroundColor: '#cccccc',
                        color: '#666666',
                        padding: '16px',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        border: '1px solid #999999',
                        borderRadius: '0.75rem',
                        width: '100%',
                        height: '100%',
                        textTransform: 'uppercase'
                      }}
                    >
                      descargar oferta
                    </button>
                    <p
                      style={{
                        fontSize: '14px',
                        color: '#2D9CDB',
                        marginTop: '4px'
                      }}
                    >
                      Próximamente...
                    </p>
                  </div>

                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <button
                      style={{
                        backgroundColor: '#cccccc',
                        color: '#666666',
                        padding: '16px',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        border: '1px solid #999999',
                        borderRadius: '0.75rem',
                        width: '100%',
                        height: '100%',
                        textTransform: 'uppercase'
                      }}
                      disabled
                    >
                      gerar contrato
                    </button>
                    <p
                      style={{
                        fontSize: '14px',
                        color: '#2D9CDB',
                        marginTop: '4px'
                      }}
                    >
                      Próximamente...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              marginTop: '2.5rem'
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  height: '5rem'
                }}
              >
                <div style={{ width: '225px' }}></div>
                <div
                  style={{
                    width: '180px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopLeftRadius: '1.5rem',
                    borderColor: '#0F9DD0',
                    borderWidth: '1px',
                    padding: '1rem 0.25rem',
                    textAlign: 'center',
                    fontWeight: '600',
                    fontSize: '0.875rem'
                  }}
                >
                  <img
                    src="PersonalizedOffer.png"
                    width={32}
                    alt="premium"
                    style={{
                      padding: '0 0.375rem'
                    }}
                  />
                  Instalación Neos
                  <br /> y Suministro Neos
                </div>
                <div
                  style={{
                    width: '138px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: '#E0E0E0',
                    borderWidth: '1px',
                    padding: '1rem 0.25rem',
                    textAlign: 'center',
                    fontWeight: '600',
                    fontSize: '14px'
                  }}
                >
                  Instalación Neos
                  <br /> y Suministro Actual
                </div>
                <div
                  style={{
                    width: '156px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: '#E0E0E0',
                    borderWidth: '1px',
                    padding: '1rem 0.25rem',
                    textAlign: 'center',
                    fontWeight: '600',
                    fontSize: '14px'
                  }}
                >
                  Instalación en Tejado
                  <br /> y Suministro Actual
                </div>
                <div
                  style={{
                    width: '108px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: '#E0E0E0',
                    borderWidth: '1px',
                    padding: '1rem 0.25rem',
                    textAlign: 'center',
                    fontWeight: '600',
                    fontSize: '14px',
                    borderTopRightRadius: '1.5rem'
                  }}
                >
                  Suministro
                  <br /> Actual
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  height: '5rem'
                }}
              >
                <div
                  style={{
                    width: '225px',
                    paddingLeft: '1.25rem',
                    borderWidth: '1px',
                    borderColor: '#E0E0E0',
                    borderRightWidth: '0px',
                    borderBottomWidth: '0px',
                    color: '#4F4F4F',
                    fontSize: '14px',
                    fontWeight: '500',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  Coste de Instalación con Impuestos (€)
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '18px',
                    color: '#4F4F4F',
                    fontSize: '14px',
                    fontWeight: '500',
                    textAlign: 'center',
                    borderWidth: '1px',
                    borderColor: '#0F9DD0',
                    backgroundColor: '#E8F5FA',
                    borderBottomWidth: '0px',
                    borderTopWidth: '0px',
                    width: '180px'
                  }}
                >
                  2,550.72
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '18px',
                    color: '#4F4F4F',
                    fontSize: '14px',
                    fontWeight: '500',
                    textAlign: 'center',
                    borderWidth: '1px',
                    borderColor: '#E0E0E0',
                    borderRightWidth: '0px',
                    borderBottomWidth: '0px',
                    borderTopWidth: '0px',
                    width: '138px'
                  }}
                >
                  2,550.72
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '18px',
                    color: '#4F4F4F',
                    fontSize: '14px',
                    fontWeight: '500',
                    textAlign: 'center',
                    borderWidth: '1px',
                    borderColor: '#E0E0E0',
                    borderRightWidth: '0px',
                    borderBottomWidth: '0px',
                    borderTopWidth: '0px',
                    width: '156px'
                  }}
                >
                  3,164.41
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '18px',
                    color: '#4F4F4F',
                    fontSize: '14px',
                    fontWeight: '500',
                    textAlign: 'center',
                    borderWidth: '1px',
                    borderColor: '#E0E0E0',
                    borderBottomWidth: '0px',
                    borderTopWidth: '0px',
                    width: '108px'
                  }}
                >
                  -
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  height: '5rem'
                }}
              >
                <div
                  style={{
                    width: '225px',
                    paddingLeft: '1.25rem',
                    borderWidth: '1px',
                    borderColor: '#E0E0E0',
                    borderRightWidth: '0px',
                    borderBottomWidth: '0px',
                    color: '#4F4F4F',
                    fontSize: '14px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  *Ahorro en 25 Años (%)
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '18px',
                    color: '#4F4F4F',
                    fontSize: '14px',
                    fontWeight: '500',
                    textAlign: 'center',
                    borderWidth: '1px',
                    borderColor: '#0F9DD0',
                    backgroundColor: '#E8F5FA',
                    borderBottomWidth: '0px',
                    width: '180px'
                  }}
                >
                  61.29
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '18px',
                    color: '#4F4F4F',
                    fontSize: '14px',
                    fontWeight: '500',
                    textAlign: 'center',
                    borderWidth: '1px',
                    borderColor: '#E0E0E0',
                    borderRightWidth: '0px',
                    borderBottomWidth: '0px',
                    width: '138px'
                  }}
                >
                  42.86
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '18px',
                    color: '#4F4F4F',
                    fontSize: '14px',
                    fontWeight: '500',
                    textAlign: 'center',
                    borderWidth: '1px',
                    borderColor: '#E0E0E0',
                    borderRightWidth: '0px',
                    borderBottomWidth: '0px',

                    width: '156px'
                  }}
                >
                  36.87
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '18px',
                    color: '#4F4F4F',
                    fontSize: '14px',
                    fontWeight: '500',
                    textAlign: 'center',
                    borderWidth: '1px',
                    borderColor: '#E0E0E0',
                    borderBottomWidth: '0px',

                    width: '108px'
                  }}
                >
                  0
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  height: '5rem'
                }}
              >
                <div
                  style={{
                    width: '225px',
                    paddingLeft: '1.25rem',
                    borderWidth: '1px',
                    borderColor: '#E0E0E0',
                    borderRightWidth: '0px',
                    borderBottomWidth: '0px',
                    color: '#4F4F4F',
                    fontSize: '14px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  *Ahorro en 25 Años (€)
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '18px',
                    color: '#4F4F4F',
                    fontSize: '14px',
                    fontWeight: '500',
                    textAlign: 'center',
                    borderWidth: '1px',
                    borderColor: '#0F9DD0',
                    backgroundColor: '#E8F5FA',
                    borderBottomWidth: '0px',
                    width: '180px'
                  }}
                >
                  14,035.01
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '18px',
                    color: '#4F4F4F',
                    fontSize: '14px',
                    fontWeight: '500',
                    textAlign: 'center',
                    borderWidth: '1px',
                    borderColor: '#E0E0E0',
                    borderRightWidth: '0px',
                    borderBottomWidth: '0px',
                    width: '138px'
                  }}
                >
                  9,815.87
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '18px',
                    color: '#4F4F4F',
                    fontSize: '14px',
                    fontWeight: '500',
                    textAlign: 'center',
                    borderWidth: '1px',
                    borderColor: '#E0E0E0',
                    borderRightWidth: '0px',
                    borderBottomWidth: '0px',

                    width: '156px'
                  }}
                >
                  8,442.83
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '18px',
                    color: '#4F4F4F',
                    fontSize: '14px',
                    fontWeight: '500',
                    textAlign: 'center',
                    borderWidth: '1px',
                    borderColor: '#E0E0E0',
                    borderBottomWidth: '0px',

                    width: '108px'
                  }}
                >
                  0
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  height: '5rem'
                }}
              >
                <div
                  style={{
                    width: '225px',
                    paddingLeft: '1.25rem',
                    borderWidth: '1px',
                    borderColor: '#E0E0E0',
                    borderRightWidth: '0px',
                    borderBottomWidth: '0px',
                    color: '#4F4F4F',
                    fontSize: '14px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  Amortización (Años)
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '18px',
                    color: '#4F4F4F',
                    fontSize: '14px',
                    fontWeight: '500',
                    textAlign: 'center',
                    borderWidth: '1px',
                    borderColor: '#0F9DD0',
                    backgroundColor: '#E8F5FA',
                    borderBottomWidth: '0px',
                    width: '180px'
                  }}
                >
                  6.75
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '18px',
                    color: '#4F4F4F',
                    fontSize: '14px',
                    fontWeight: '500',
                    textAlign: 'center',
                    borderWidth: '1px',
                    borderColor: '#E0E0E0',
                    borderRightWidth: '0px',
                    borderBottomWidth: '0px',
                    width: '138px'
                  }}
                >
                  8.93
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '18px',
                    color: '#4F4F4F',
                    fontSize: '14px',
                    fontWeight: '500',
                    textAlign: 'center',
                    borderWidth: '1px',
                    borderColor: '#E0E0E0',
                    borderRightWidth: '0px',
                    borderBottomWidth: '0px',

                    width: '156px'
                  }}
                >
                  12.42
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '18px',
                    color: '#4F4F4F',
                    fontSize: '14px',
                    fontWeight: '500',
                    textAlign: 'center',
                    borderWidth: '1px',
                    borderColor: '#E0E0E0',
                    borderBottomWidth: '0px',

                    width: '108px'
                  }}
                >
                  -
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  height: '5rem'
                }}
              >
                <div
                  style={{
                    width: '225px',
                    paddingLeft: '1.25rem',
                    borderWidth: '1px',
                    borderColor: '#E0E0E0',
                    borderRightWidth: '0px',

                    color: '#4F4F4F',
                    fontSize: '14px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    borderBottomLeftRadius: '1.5rem'
                  }}
                >
                  Ahorro de Emisiones de CO2 (Toneladas)
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '18px',
                    color: '#4F4F4F',
                    fontSize: '14px',
                    fontWeight: '500',
                    textAlign: 'center',
                    borderWidth: '1px',
                    borderColor: '#0F9DD0',
                    backgroundColor: '#E8F5FA',

                    width: '180px'
                  }}
                >
                  52.69
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '18px',
                    color: '#4F4F4F',
                    fontSize: '14px',
                    fontWeight: '500',
                    textAlign: 'center',
                    borderWidth: '1px',
                    borderColor: '#E0E0E0',
                    borderRightWidth: '0px',

                    width: '138px'
                  }}
                >
                  52.69
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '18px',
                    color: '#4F4F4F',
                    fontSize: '14px',
                    fontWeight: '500',
                    textAlign: 'center',
                    borderWidth: '1px',
                    borderColor: '#E0E0E0',
                    borderRightWidth: '0px',

                    width: '156px'
                  }}
                >
                  39.78
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '18px',
                    color: '#4F4F4F',
                    fontSize: '14px',
                    fontWeight: '500',
                    textAlign: 'center',
                    borderWidth: '1px',
                    borderColor: '#E0E0E0',
                    borderBottomRightRadius: '1.5rem',
                    width: '108px'
                  }}
                >
                  0
                </div>
              </div>
            </div>
          </div>

          {/* Licensed  */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2.5rem 0',
              flexDirection: 'row',
              gap: '2rem'
            }}
          >
            <p
              style={{
                fontSize: '1.25rem',
                color: 'black',
                fontWeight: '600'
              }}
            >
              Licenciado por
            </p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '2.5rem'
              }}
            >
              <img
                src="Footer/CNMC.png"
                alt="Neos logo"
                width="56"
                height="32"
              />
              <img
                src="Footer/REE-removebg-preview.png"
                alt="Neos logo"
                width="160"
                height="20"
              />
              <img
                src="Footer/OMIE-removebg-preview.png"
                alt="Neos logo"
                width="62"
                height="30"
              />
            </div>
          </div>

          <div
            style={{
              width: '100%',
              padding: '1.5rem',
              border: '1px solid #E0E0E0',
              borderRadius: '1.5rem',
              color: 'black'
            }}
          >
            <h1
              style={{
                fontSize: '1.25rem ',
                fontWeight: '600',
                textAlign: 'center'
              }}
            >
              ¿Cómo funciona?
            </h1>

            <div
              style={{
                display: 'flex',
                marginTop: '34px',
                gap: '1.5rem',
                flexDirection: 'row'
              }}
            >
              <div
                style={{
                  backgroundColor: '#E7F5FA',
                  borderRadius: '1.5rem',
                  padding: '1.25rem',
                  width: '100%'
                }}
              >
                <h1
                  style={{
                    fontSize: '1.125rem',
                    textAlign: 'center',
                    fontWeight: '600'
                  }}
                >
                  Instalación Neos y Suministro Neos
                </h1>
                <ul
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    padding: '1rem 0',
                    listStyleType: 'disc',
                    margin: '0 1.25rem',
                    fontSize: '0.875rem'
                  }}
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
                style={{
                  backgroundColor: '#E7F5FA',
                  borderRadius: '1.5rem',
                  padding: '1.25rem',
                  width: '100%'
                }}
              >
                <h1
                  style={{
                    fontSize: '1.125rem',
                    textAlign: 'center',
                    fontWeight: '600'
                  }}
                >
                  Instalación Neos y Suministro Actual
                </h1>

                <ul
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    padding: '1rem 0',
                    listStyleType: 'disc',
                    margin: '0 1.25rem',
                    fontSize: '0.875rem'
                  }}
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

          {/* Customer review starts */}
          <div
            style={{
              display: 'flex',
              gap: '1.5rem',
              marginTop: '2rem',
              flexDirection: 'row'
            }}
          >
            <div
              style={{
                width: '100%',
                padding: '1.5rem',
                border: '1px solid #E0E0E0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1rem',
                borderRadius: '1.5rem'
              }}
            >
              <h1
                style={{
                  fontSize: '1.125rem',
                  fontWeight: '700',
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'left'
                }}
              >
                Nuestros clientes nos recomiendan
              </h1>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <img
                  src="customer.png"
                  alt="user"
                  width={50}
                  height={50}
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />

                <div style={{ width: '100%' }}>
                  <p
                    style={{
                      fontSize: '1rem',
                      fontWeight: '500',
                      color: 'black'
                    }}
                  >
                    Manuel Fernández
                  </p>
                  <div
                    style={{
                      margin: '0.5rem 0',
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '0.25rem'
                    }}
                  >
                    <img src="star.png" alt="rating" width={16} />
                    <img src="star.png" alt="rating" width={16} />
                    <img src="star.png" alt="rating" width={16} />
                    <img src="star.png" alt="rating" width={16} />
                    <img src="star.png" alt="rating" width={16} />
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#4F4F4F' }}>
                    "¡Me encanta Neos! Gracias a ellos, mis facturas de
                    electricidad se acercan a ¡0,00 € mes tras mes! Vivo en un
                    piso, así que sin ellos nunca habría podido acceder a los
                    paneles solares."
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  style={{
                    backgroundColor: '#FD7C7C',
                    padding: '0.5rem 0.75rem',
                    color: '#ffffff',
                    borderRadius: '0.75rem',
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}
                >
                  Elige Tu Plan
                </button>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#E7F5FA',
                borderRadius: '1.5rem',
                padding: '1.25rem 3.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <h1
                style={{
                  textAlign: 'center',
                  fontSize: '1rem',
                  fontWeight: 'bold'
                }}
              >
                Revise su oferta en una llamada con uno de nuestros expertos
              </h1>
              <img
                src="ceo-image.jpg"
                alt="user"
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
                width={50}
                height={50}
              />

              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'black',
                  fontWeight: '500',
                  textAlign: 'center'
                }}
              >
                Jose Laffitte
              </p>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'black',
                  textAlign: 'center'
                }}
              >
                jose@neosenergy.co
              </p>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  style={{
                    backgroundColor: '#FD7C7C',
                    padding: '0.5rem 0.75rem',
                    color: '#ffffff',
                    borderRadius: '0.75rem',
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}
                >
                  HABLA CON UN EXPERTO
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default Launch;
