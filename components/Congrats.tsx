'use client';
import TolstoyHero from '@/app/landingpage/TolstoyHero';
import NeosButton from '@/components/NeosButton';
import { removeDataFromSessionStorage } from '@/utils/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const Congrats = ({ generatePDF, isPDFLoading }: any) => {
  const { t } = useTranslation();
  const { userData } = useSelector((state: any) => state.commonSlice);
  const [hasVisited, setHasVisited] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const checkUserOfferDetails = async () => {
      if (userData.offerId && userData._id) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/users-offers/${userData.offerId}`
          );
          const { userOffer } = await response.json();
          if (userOffer.paid && userOffer.contractSign) {
            if (userOffer.congratsPageVisited || hasVisited) {
              removeDataFromSessionStorage('UserOffer');
              removeDataFromSessionStorage('docusignAccessToken');
              setHasVisited(false);
              router.push('/getoffer');
            } else {
              await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/users-offers`,
                {
                  method: 'POST',
                  headers: { 'content-type': 'application/json' },
                  body: JSON.stringify({
                    offerData: {
                      user: userData._id,
                      congratsPageVisited: true
                    },
                    offerId: userData.offerId
                  })
                }
              ).then((response) => {
                if (response.ok) {
                  setHasVisited(true);
                } else {
                  throw new Error('Failed to update visit status');
                }
              });
            }
          } else if (userOffer.contractSign) {
            router.push('/getoffer?activeStep=1');
          } else {
            router.push('/getoffer');
          }
        } catch (error) {
          console.error('Failed to check user offer details:', error);
        }
      } else {
        router.push('/getoffer');
      }
    };
    checkUserOfferDetails();
  }, []);

  return (
    <div className="max-w-[93%] md:max-w-[88%] lg:max-w-[83%] w-full mx-auto flex flex-col lg:flex-row pb-14 mt-[70px] md:mt-7 lg:mt-0">
      <div className="mx-auto flex flex-col justify-center items-center w-full lg:w-3/6">
        <div className="w-12 h-12 relative">
          <Image src="/success.png" alt="user image" fill />
        </div>
        <h1 className="text-lg md:2xl lg:text-3xl font-bold mb-3.5 mt-2">
          {t('congrats.title')}
        </h1>
        <label className="ext-sm font-normal text-[#828282] text-center ">
          {t('congrats.desc1')}
          <br></br>
          {t('congrats.desc2')}
        </label>
        <div className="w-full border border-[#E0E0E0] rounded-xl py-3 px-4 flex justify-between items-center my-7">
          <div className="flex items-center">
            <Image src="/pdfIcon.png" alt="user image" width={34} height={34} />
            <p className="text-sm font-medium text-[#171717] ms-2">
              Contrato - Firmado.pdf
            </p>
          </div>
          <NeosButton
            sx={{ width: '140px!important' }}
            category="colored"
            onClick={generatePDF}
            title={t('Email-success.download-txt')}
            isLoading={isPDFLoading}
          />
        </div>
      </div>

      <div className="mx-auto flex justify-center items-center w-full lg:w-3/6">
        <div className="relative w-full lg:h-[520px] max-w-[310px] h-full video-container !rounded-3xl overflow-hidden">
          {/* <VideoPreview
            custonClass="h-full w-full"
            url="https://videos.gotolstoy.com/public/41532226-45a4-45f6-a10f-a313cb492bc8/6c2ed4e4-393f-415d-8c6f-495ee6f13e80/6c2ed4e4-393f-415d-8c6f-495ee6f13e80.mp4"
            controls={false}
            muted
            autoPlay
          /> */}
          <TolstoyHero src="https://player.gotolstoy.com/2jaoummpafsuk" />
        </div>
      </div>
    </div>
  );
};

export default Congrats;
