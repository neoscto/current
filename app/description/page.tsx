'use client';
import NeosButton from '@/components/NeosButton';
import MainContainer from '@/components/sharedComponents/MainContainer';
import { useRouter } from 'next/navigation';
import { descriptionList } from '@/utils/StaticData';
import { useTranslation } from 'react-i18next';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import parse from 'html-react-parser';

const Description = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <MainContainer>
      <div className=" my-8 relative rounded-[30px] bg-[#01092299] md:w-full max-w-[calc(100%_-_40px)] xl:max-w-[1200px] w-full mx-auto bg-white overflow-hidden">
        <div className="w-full mx-auto bg-white  flex lg:flex-row flex-col flex-1 items-center lg:gap-[23px] justify-center lg:pt-[40px] lg:pb-[75px] lg:pl-[51px] lg:pr-4 pt-[34px] pb-[40px] pl-4 pr-6 gap-[27px]">
          <div className="text-center md:text-left lg:text-left lg:max-w-[calc(62%_-_13px)] w-full max-w-full">
            <h1 className="text-[28px] leading-[35px] font-bold text-center">
              {t('Description.title')}
            </h1>

            <div className="w-full py-[13px] pr-[9px] pl-[16px] rounded-[8px] border-[1px] border-[#E0E0E0] mt-[17px] md:mt-2.5">
              <p className="lg:text-[20px] lg:leading-[25px] text-[16px] leading-6 text-black text-left">
                {parse(t('Description.description'))}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center lg:hidden mt-3">
              <img
                src="virtual-solar-small.png"
                alt="Description image"
                width={267}
              />
              <div className="text-center mt-[23px]">
                <NeosButton
                  className={
                    'px-[24px] py-[14px] text-sm leading-4 font-semibold'
                  }
                  category="colored"
                  title={t('Calculate-saving-btn')}
                  onClick={() => router.push('/getoffer')}
                />
              </div>
            </div>

            <div className="lg:mt-[29px] mt-[27px]">
              <h1 className="text-[28px] leading-[35px] font-bold text-center">
                {t('Description.benefits')}
              </h1>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-[18px] sm:gap-4 mt-5 lg:mt-2.5">
                {descriptionList.map((item, index) => {
                  return (
                    <div
                      className={`flex flex-col gap-2.5 lg:gap-1 items-center w-full lg:px-0 p-4 lg:pt-[19px] lg:pb-[12px] lg:bg-[#1D3E6A] rounded-3xl bg-[#1D3E6A]`}
                    >
                      <p
                        className={` text-xl text-center font-bold text-white `}
                      >
                        {parse(t(`Description.${Object.keys(item)[0]}`))}
                      </p>
                      <p
                        className={`text-center lg:min-h-[90px] p-5  text-lg text-white`}
                      >{`${t(`Description.${Object.keys(item)[1]}`)}`}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className=" lg:ml-auto relative ml-0 h-full lg:max-w-[calc(38%_-_13px)] w-full flex lg:flex-col items-center justify-center">
            <img
              src="description.png"
              alt="Description image"
              width={425}
              className="lg:flex hidden"
            />
            <div className="lg:mt-[36px] mb-0">
              <NeosButton
                className={
                  'px-[24px] lg:py-[17px] py-[14px] text-sm leading-4 font-semibold'
                }
                category="colored"
                title={t('Calculate-saving-btn')}
                onClick={() => router.push('/getoffer')}
              />
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default Description;
