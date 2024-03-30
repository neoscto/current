'use client';
import NeosButton from '@/components/NeosButton';
import Image from 'next/image';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import CheckoutForm from '../payment/page';
import { useRouter } from 'next/navigation';

const Success = ({ generatePDF, setShowForm, showForm, isPDFLoading }: any) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { userData } = useSelector((state: any) => state.commonSlice);

  useEffect(() => {
    setShowForm('paymentForm');

    const getUserOfferDetails = async () => {
      if (userData.offerId && userData._id) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/users-offers/${userData.offerId}`
        );
        const { userOffer } = await response.json();
        if (!userOffer.contractSign && userOffer.filledInfo) {
          return router.push('/getoffer?activeStep=1');
        } else if (!userOffer.contractSign && !userOffer.filledInfo) {
          return router.push('/getoffer');
        }
      } else {
        return router.push('/getoffer');
      }
    };

    getUserOfferDetails();
  }, [userData.offerId, userData._id]);

  return (
    <div className="max-w-[93%] md:max-w-[88%] lg:max-w-[83%] w-full mx-auto flex flex-col lg:flex-row pb-14 mt-5">
      <div className="mx-auto flex flex-col justify-center items-center w-full lg:w-3/6">
        <div className="w-12 h-12 relative">
          <Image src="/success.png" alt="user image" fill />
        </div>
        <h1 className="text-lg md:2xl lg:text-3xl font-bold mb-3.5 mt-2">
          {t('Email-success.title')}
        </h1>
        <label className="ext-sm font-normal text-[#828282] text-center ">
          {t('Email-success.desc1')}
          <br></br>
          {t('Email-success.desc2')}
        </label>
        <div className="w-full border border-[#E0E0E0] rounded-xl py-3 px-4 flex justify-between items-center my-7">
          <div className="flex items-center">
            <Image src="/pdfIcon.png" alt="user image" width={34} height={34} />
            <p className="text-sm font-medium text-[#171717] ms-2">
              Solardetails.pdf
            </p>
          </div>
          <NeosButton
            sx={{ width: '140px !important' }}
            category="colored"
            onClick={generatePDF}
            title={t('Email-success.download-txt')}
            isLoading={isPDFLoading}
          />
        </div>
      </div>
      <div className="w-full w-6/6 lg:w-3/6 px-0 md:px-9">
        <div className="p-6">
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
};

export default Success;
