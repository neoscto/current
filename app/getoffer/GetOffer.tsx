'use client';
import { Grid } from '@mui/material';
import { GetOfferCardData } from '@/utils/StaticData';
import OfferCard from './offerCard';
import { useState } from 'react';
import YourOffer from '../youoffer/page';
import { useRouter } from 'next/navigation';

interface GetOfferProps {
  formik: any;
  handleChange: any;
  handleNext: any;
  setShowForm: any;
  showForm: any;
  signature: any;
}

const GetOffer: React.FC<GetOfferProps> = ({
  formik,
  handleChange,
  handleNext,
  setShowForm,
  showForm,
  signature
}) => {
  const [data, setData] = useState({
    total_price_before_tax: 0,
    neos_installation_tax: 0,
    number_of_panels: 0,
    required_capacity: 0,
    total_price_after_tax: 0,
    tableData: [
      {
        neosPanelProvider: '',
        neosPanelKeepProvider: '',
        rooftopPanelKeepProvider: '',
        keepProvider: ''
      },
      {
        neosPanelProvider: '',
        neosPanelKeepProvider: '',
        rooftopPanelKeepProvider: '',
        keepProvider: ''
      },
      {
        neosPanelProvider: '',
        neosPanelKeepProvider: '',
        rooftopPanelKeepProvider: '',
        keepProvider: ''
      },
      {
        neosPanelProvider: '',
        neosPanelKeepProvider: '',
        rooftopPanelKeepProvider: '',
        keepProvider: ''
      },
      {
        neosPanelProvider: '',
        neosPanelKeepProvider: '',
        rooftopPanelKeepProvider: '',
        keepProvider: ''
      }
    ],
    percent_savings_year1_w_neos: 0,
    percent_savings_year1_without_neos: 0,
    savings_retail_w_neos: 0,
    savings_retail_without_neos: 0,
    payback_w_neos: 0,
    payback_without_neos: 0,
    neos_total_emissions_saved_in_tons: 0,
    neos_not_provider_total_emissions_saved_in_tons: 0,
    neos_elephants_carbon_capture: 0,
    neos_not_provider_elephants_carbon_capture: 0,
    save_yearly_w_neos: [{ years: 0, saving: '' }],
    save_yearly_without_neos: [{ years: 0, saving: '' }]
  });

  const router = useRouter();

  const chooseOfferType = async (type: string) => {
    switch (type) {
      case 'soffer':
        formik.setFieldValue('offerType', 'Standard');
        router.push('/standardoffer');
        break;
      case 'poffer':
        formik.setFieldValue('offerType', 'Personalized');
        router.push('/personalizedoffer');
        break;
      default:
        break;
    }
  };
  return (
    <>
      {showForm == 'allOffers' && (
        <div className=" w-[90%] md:w-[80%] lg:w-[60%] mx-auto pb-6 md:pb-9 lg:pb-9">
          <div className="my-11 lg:my-12">
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              direction={{ xs: 'column-reverse', sm: 'row' }}
            >
              {GetOfferCardData.map((item, index) => (
                <Grid item xs={12} sm={6} md={6} key={index}>
                  <OfferCard Data={item} setShowForm={chooseOfferType} />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      )}
      {showForm == 'yourOffer' && (
        <YourOffer handleNext={handleNext} data={data} />
      )}
    </>
  );
};

export default GetOffer;
