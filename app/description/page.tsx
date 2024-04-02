'use client';
import MainContainer from '@/components/sharedComponents/MainContainer';
import { useRouter } from 'next/navigation';
import { descriptionList } from '@/utils/StaticData';
import { useTranslation } from 'react-i18next';
import parse from 'html-react-parser';
import { Button } from '@mantine/core';

const Description = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <MainContainer>
      <div className="max-w-[93%] md:max-w-[88%] lg:max-w-[83%] w-full mx-auto bg-white rounded-3xl mb-8">
        <div className="flex flex-col lg:flex-row gap-4 w-[94%] mx-auto py-6 md:py-9 lg:py-9 ">
          <div className=" flex flex-col justify-center items-center w-full px-4 mt-3">
            <h1 className="text-2xl font-bold mb-4 text-center">
              {t('Description.title')}
            </h1>

            <p className=" border p-4 border-[#E0E0E0] rounded-lg text-center">
              {parse(t('Description.description'))}
            </p>

            <div className=" flex justify-center items-center flex-col lg:hidden">
              <img
                src="description.png"
                alt="Description image"
                width={267}
                className=" "
              />

              <Button
                variant="filled"
                size="lg"
                style={{
                  backgroundColor: '#FD7C7C',
                  borderRadius: '16px',
                  height: '56px',
                  width: '240px',
                  fontSize: '14px'
                }}
                classNames={{}}
                onClick={() => router.push('/getoffer')}
              >
                {t('Calculate-saving-btn')}
              </Button>
            </div>

            <div className="flex flex-col justify-center items-center mt-4">
              <h1 className=" text-2xl font-bold mb-4">
                {t('Description.benefits')}
              </h1>
              <div className=" grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-3">
                {descriptionList.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="bg-[#1D3E6A] text-white flex flex-col justify-center items-center gap-3 text-center py-4 px-3 rounded-2xl"
                    >
                      <h3 className=" text-base font-bold h-1/5 flex justify-center items-center">
                        {parse(t(`Description.${Object.keys(item)[0]}`))}
                      </h3>
                      <p className=" h-4/5 flex justify-center items-center text-sm">{`${t(`Description.${Object.keys(item)[1]}`)}`}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className=" flex flex-col justify-center items-center relative ">
            <img
              src="description.png"
              alt="Description image"
              width={425}
              className="lg:flex hidden h-[90%] object-contain
            "
            />
            <div className=" ">
              <Button
                variant="filled"
                size="md"
                style={{
                  backgroundColor: '#FD7C7C',
                  borderRadius: '16px',
                  height: '56px',
                  width: '240px',
                  fontSize: '14px'
                }}
                className=""
                onClick={() => router.push('/getoffer')}
              >
                {t('Calculate-saving-btn')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default Description;
