import NeosButton from '@/components/NeosButton';
import { useTranslation } from 'react-i18next';
import { setFormBack } from '@/features/common/commonSlice';
import { useDispatch } from 'react-redux';
import PersonalizedOffer from './../../public/PersonalizedOffer.png';
import Image from 'next/image';
import { Button } from '@mantine/core';
import { useState } from 'react';

interface OfferCardProps {
  Data: {
    title: string;
    desc: string;
    is_premium?: boolean;
    feature: string[];
  };
  setShowForm: any;
}

const OfferCard = ({ Data, setShowForm }: OfferCardProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  const handleButtonClick = () => {
    setLoading(true);
    setShowForm(Data?.is_premium ? 'poffer' : 'soffer');
    dispatch(setFormBack(Data?.is_premium ? 'backpoffer' : 'backsoffer'));
    setLoading(false);
  };

  return (
    <div
      className={`border border-[#E0E0E0] rounded-2xl px-6 text-center py-7  ${
        Data?.is_premium
          ? 'bg-[#E7F5FA] border-[#E7F5FA]'
          : 'border-[#E0E0E0] bg-white'
      }`}
    >
      <h3 className="text-lg font-semibold flex justify-center items-center  h-[30px] gap-2">
        {Data?.is_premium && (
          <Image src={PersonalizedOffer} alt="image" width={30} />
        )}
        <span>{t(`Get-offer.${Data.title}`)}</span>
      </h3>
      <hr className="h-px my-6 bg-[#E0E0E0] border-0 "></hr>
      <p className="text-base font-medium mb-12 min-h-[46px] line-clamp-2">
        {t(`Get-offer.${Data.desc}`)}
      </p>
      {Data.feature.map((item, index) => {
        return (
          <p key={index} className="text-base font-normal pb-3 text-black">
            {t(`Get-offer.${item}`)}
          </p>
        );
      })}
      {/* <Button
        variant="filled"
        size="lg"
        className="mt-8" // added this line
        style={{
          backgroundColor: '#FD7C7C',
          borderRadius: '16px',
          height: '56px',
          fontSize: '14px'
        }}
        classNames={{}}
        loading={loading}
        onClick={() => {
          setLoading(true);
          setShowForm(Data?.is_premium ? 'poffer' : 'soffer');
          dispatch(setFormBack(Data?.is_premium ? 'backpoffer' : 'backsoffer'));
          setLoading(false);
        }}
      >
        {t('Get-offer.btn')}
      </Button> */}
      <NeosButton
        sx={{ fontSize: '14px !important' }}
        className="p-4 mt-8 text-base font-bold border rounded-xl w-auto h-full"
        category="colored"
        title={t('Get-offer.btn')}
        onClick={handleButtonClick}
        isLoading={loading}
      />
    </div>
  );
};

export default OfferCard;
