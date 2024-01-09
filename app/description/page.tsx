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
      <div className="relative rounded-[30px] bg-[#01092299] max-w-[93%] md:max-w-[88%] lg:max-w-[83%] w-full mx-auto bg-white overflow-hidden">
        <div className="flex items-center gap-x-[12px] absolute top-[2em] left-[2em]">
          <span onClick={() => router.back()}>
            <ArrowBackIcon
              className="mb-[0.35em] cursor-pointer "
              sx={{ fontSize: "30px" }}
            />
          </span>
        </div>
        <div className="max-w-[93%] md:max-w-[88%] lg:max-w-[83%] w-full mx-auto bg-white  flex flex-col-reverse md:flex-row lg:flex-row justify-center">
          <div className="text-center md:text-left lg:text-left  pb-[24px] md:py-[70px] lg:py-[105px]">
            <h1 className="text-lg md:2xl lg:text-3xl font-bold">
              {t("Description.title")}
            </h1>
            <p className="text-sm md:text-base lg:text-base mb-3 mt-1 text-black px-5 md:px-0 lg:px-0 ">
              {t("Description.description")}
            </p>
            <div className="my-4 md:my-8 lg:my-8">
              {descriptionList.map((item, index) => (
                <div className="flex justify-center">
                  {index === 5 && (
                    <span
                      style={{
                        color: "transparent",
                        fontSize: "24px",
                        marginRight: "5px",
                        textShadow: "0 0 0 #fcda34",
                      }}
                      className="-mt-1.5"
                    >
                      &#9728;
                    </span>
                  )}
                  <p
                    className="text-sm md:text-base lg:text-base mb-5 text-black"
                    dangerouslySetInnerHTML={{
                      __html: t(`Description.${Object.keys(item)[0]}`),
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="text-center">
              <NeosButton
                category="colored"
                title={t("Calculate-saving-btn")}
                onClick={() => router.push("/getoffer")}
              />
            </div>
          </div>

          <div className="mx-auto mt-[10px] md:mt-[70px] lg:mt-[105px]">
            <img src="description.png" alt="Description image" />
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default Description;
