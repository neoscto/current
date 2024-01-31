"use client";
import NeosButton from "@/components/NeosButton";
import MainContainer from "@/components/sharedComponents/MainContainer";
import { useRouter } from "next/navigation";
import { descriptionList } from "@/utils/StaticData";
import { useTranslation } from "react-i18next";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Description = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <MainContainer>
      <div className="relative rounded-[30px] bg-[#01092299] max-w-[1200px] md:max-w-[88%] lg:max-w-[1200px] w-full mx-auto bg-white overflow-hidden">
        <div className="flex items-center gap-x-[12px] absolute top-[1.1em] left-[.8em] md:top-[1.6em] md:left-[1.6em]">
          {/* <span onClick={() => router.back()}>
            <ArrowBackIcon
              className="mb-[0.35em] cursor-pointer "
              sx={{ fontSize: "30px" }}
            />
          </span> */}
        </div>
        <div className="w-full mx-auto bg-white  flex items-center gap-[3px] flex-col-reverse md:flex-row lg:flex-row justify-center pt-[72px] pb-[75px] pl-[51px]">
          <div className="text-center md:text-left lg:text-left max-w-[calc(60%_-_3px)] w-full">
            <h1 className="text-lg md:2xl lg:text-3xl font-bold">
              {t("Description.title")}
            </h1>

            <div className="w-full py-[13px] pr-[9px] pl-[16px] rounded-[8px] border-[1px] border-[#E0E0E0] mt-1.5">
              <p className="text-sm md:text-base lg:text-base text-black"
              dangerouslySetInnerHTML={{
                __html: t(`Description.description`),
              }}
              >
              </p>
            </div>
            <div className="my-4 md:my-8 lg:my-8 flex flex-wrap gap-[18px] ">
              {descriptionList.map((item, index) => {
                if (index % 4 === 1 || index % 4 === 2) {
                  return (<div className="flex flex-col gap-1 items-center max-w-[calc(50%_-_9px)] w-full pt-[19px] pb-[12px] bg-[#E7F5FA] rounded-3xl ">
                    <p
                      className="text-sm md:text-base lg:text-base text-black font-bold "
                      dangerouslySetInnerHTML={{
                        __html: t(`Description.${Object.keys(item)[0]}`),
                      }}
                    />
                    <p className="text-center h-[90px] px-1 flex justify-center items-center text-black text-lg leading-5">{`${t(`Description.${Object.keys(item)[1]}`)}`}</p>
                  </div>
                  )
                }
                else {

                  return (<div className="flex flex-col gap-1 items-center max-w-[calc(50%_-_9px)] w-full pt-[19px] pb-[12px] bg-[#1D3E6A] rounded-3xl ">
                    <p
                      className="text-sm md:text-base lg:text-base text-white font-bold "
                      dangerouslySetInnerHTML={{
                        __html: t(`Description.${Object.keys(item)[0]}`),
                      }}
                    />
                    <p className="text-center h-[90px] px-1 flex justify-center items-center text-white text-lg leading-5">{`${t(`Description.${Object.keys(item)[1]}`)}`}</p>
                  </div>
                  )
                }

              })}
            </div>

          </div>

          <div className="ml-auto relative">
            <img src="description.png" alt="Description image" />
            <div className="text-center absolute bottom-[-17px] left-1/2 -translate-x-2/4">
              <NeosButton
                className={'min-w-[233px] w-full px-[24px] py-[17px] text-base leading-5 font-semibold'}
                category="colored"
                title={t("Calculate-saving-btn")}
                onClick={() => router.push("/getoffer")}
              />
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default Description;
