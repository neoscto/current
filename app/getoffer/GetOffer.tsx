'use client';
import { Grid } from '@mui/material';
import { GetOfferCardData } from '@/utils/StaticData';
import OfferCard from './offerCard';
import { useRouter } from 'next/navigation';

const GetOffer = () => {
  const router = useRouter();

  const chooseOfferType = async (type: string) => {
    switch (type) {
      case 'soffer':
        router.push('/standardoffer');
        break;
      case 'poffer':
        router.push('/personalizedoffer');
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div className=" w-[90%] md:w-[80%] lg:w-[60%] mx-auto pb-6 md:pb-9 lg:pb-9">
        <div className="my-14 max-md:mb-4">
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
    </>
  );
};

export default GetOffer;
