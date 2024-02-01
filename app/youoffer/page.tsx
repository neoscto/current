"use client";
import NeosButton from "@/components/NeosButton";
import { CompareOfferList, HowItWorksList } from "@/utils/StaticData";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useTranslation } from "react-i18next";
import { PopupModal, useCalendlyEventListener } from "react-calendly";
import { useRouter } from "next/navigation";
import { getDataFromSessionStorage } from "@/utils/utils";

const YourOffer = ({ handleNext }: any) => {
  const { userData }: any = useSelector(
    (state: RootState) => state.commonSlice
  );
  const displayValue =
    Number(
      userData?.numberOfPeople ? userData?.numberOfPeople : userData?.cups
    ) + 1;
  const router = useRouter();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  });

  useCalendlyEventListener({
    onEventScheduled: (e: any) => {
      const offerData: any = getDataFromSessionStorage("UserOffer");
      const saveEvent = async () => {
        const eventId = String(e.data.payload.event.uri).split("/").pop() || "";
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/calendly/${eventId}`,
          {
            method: "PATCH",
            body: JSON.stringify({ userId: offerData?._id }),
          }
        );
        const data = await response.json();
        console.log("response", data);
      };
      saveEvent();
      setOpen(false);
    },
  });

  const handleCalender = async () => {
    setOpen(true);
    // const token = getDataFromSessionStorage("calendlyToken");
    // if (token) {
    //   return;
    // }
    // router.push(
    //   `https://auth.calendly.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_CALENDLY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_CALENDLY_REDIRECT_URL}`
    // );
  };

  return (
    <div className="max-w-[1200px] w-full mx-auto">
      <div className="w-full bg-white lg:pt-12 lg:px-[70px] lg:pb-[67px]">

        {/* Offer and virtual solar */}
        <div className="flex justify-end gap-[131px]">
          <div className="max-w-[354px] w-full flex flex-col items-center">
            <img src="virtual-solar-small.png" alt="Description image" width={348} height={296} />
            <div className="text-center mt-[7px]">
              <h1 className="text-lg md:2xl lg:text-3xl font-bold">
                {t("Your-offer.title")}: €{displayValue}
              </h1>
              <p className="text-sm md:text-base lg:text-base mt-1 text-[#828282] font-medium">
                {t("Your-offer.desc")}
              </p>
            </div>

            <div className="flex justify-between items-end gap-[18px] mt-5">
              <div>
                <p></p>

              </div>
              <div>
                <NeosButton
                  sx={{ width: "100%" }}
                  category="colored"
                  className='px-5 py-3 text-[16px] leading-5 font-semibold'
                  title={t("Your-offer.validate-btn")}
                  onClick={handleNext}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center max-w-[500px] w-full">
            <div className="max-w-full w-full">
              <div className="py-[11px] text-black">
                <h1 className="lg:text-[30px] leading-[37.8px] font-bold">
                  {t("Your-offer.offer-title")}:
                  <span className="font-medium text-[24px] leading-[30px] pl-1">{displayValue} {t("Your-offer.offer-option1")} {displayValue}
                    {t("Your-offer.offer-option1-unit")}
                    {/* {(displayValue * 3.2).toFixed(2)}KWp) */}</span>
                </h1>
              </div>

              {/* Select plan */}
              <div className="my-[22px]">
                <p className="text-[20px] leading-[25px] font-semibold text-[#333333] text-center">{t("offer.selectPlan")}</p>
              </div>

              {/* Plan Buttons */}
              <div className="flex gap-4">
                <NeosButton
                  category="outline"
                  className='text-black py-[14px] px-[24px] outline-[2px] outline outline-[#66BCDA] font-medium text-[16px] leading-5 normal-case'
                  title={t("offer.buyPanelProviderNeos")}
                />

                <NeosButton
                  category="outline"
                  className='text-black py-[14px] px-[24px] outline-[2px] outline outline-[#66BCDA] font-medium text-[16px] leading-5 normal-case'
                  title={t("offer.buyPanelProviderCurrent")}
                />
              </div>

              <div className="py-[11px] mt-[22px] flex flex-col gap-2.5">
                <p className="text-[18px] leading-[22.68px] font-medium text-black">
                  • €{displayValue} {t("Your-offer.offer-saving-1")}
                </p>
                <p className="text-[18px] leading-[22.68px] font-medium text-black">
                  • € {displayValue} {t("Your-offer.offer-saving-2")}
                </p>
                <p className="text-[18px] leading-[22.68px] font-medium text-black">
                  • {displayValue} {t("Your-offer.offer-payback")}
                </p>
                <p className="text-[18px] leading-[22.68px] font-medium text-black">
                  • {displayValue}% {t("Your-offer.offer-consumption")}
                </p>
              </div>

              <div className="flex gap-4">
                <NeosButton
                  sx={{ width: "100%" }}
                  category="colored"
                  title={t("Your-offer.download-offer")}
                  onClick={handleNext}
                />

                <NeosButton
                  sx={{ width: "100%" }}
                  category="colored"
                  title={t("Your-offer.contract-btn-txt")}
                  onClick={handleNext}
                />
              </div>


            </div>
          </div>
        </div>

        <div className="max-w-full lg:max-w-[508px] w-full border border-[#E0E0E0] p-4 mt-3 -mb-1 lg:mt-2 rounded-3xl mx-auto lg:mx-0 lg:ml-auto">
          <div className="flex justify-center md:justify-between items-center md:items-start flex-1 flex-col md:flex-row">
            <p className="text-base text-black font-medium me-4 lg:me-11 whitespace-nowrap pb-4 md:pb-0">
              {t("Footer.license")}
            </p>
            <div className="flex align-center flex-wrap">
              <img
                src="Footer/CNMC.png"
                alt="NEOS logo"
                className="object-contain w-[45px]"
              />
              <img
                src="Footer/OMIE-removebg-preview.png"
                alt="NEOS logo"
                className="object-contain w-[45px] mx-4"
              />
              <img
                src="Footer/REE-removebg-preview.png"
                alt="NEOS logo"
                className="object-contain w-[100px]"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row mb-7">
          {isMobile ? (
            <div className="w-full border border-[#E0E0E0] rounded-3xl px-4 py-7 mt-5 md:mt-0">
              <h1 className="text-base md:2xl  font-bold text-center mb-7">
                {t("Compare-our-offer.title")}
              </h1>
              <ul className="ps-4 work-list-marker">
                {CompareOfferList.map((item, index) => (
                  <li key={index} className="text-sm text-black mb-4 list-disc">
                    {`${displayValue}% ${t(
                      `Compare-our-offer.${Object.keys(item)[0]}`
                    )}`}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="md:w-3/6 border border-[#E0E0E0] rounded-3xl px-4 py-7 md:mr-3">
              <h1 className="text-base md:2xl  font-bold text-center mb-7">
                {t("How-it-work.title")}
              </h1>
              <ul className="ps-4 work-list-marker">
                {HowItWorksList.map((item, index) => (
                  <li key={index} className="text-sm text-black mb-4 list-disc">
                    {t(`How-it-work.${Object.keys(item)[0]}`)}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="ms-1 md:w-3/6 mt-4 md:mt-0">
            {isMobile ? (
              <div className="md:w-3/6 border border-[#E0E0E0] rounded-3xl px-4 py-7 md:mr-3">
                <h1 className="text-base md:2xl font-bold text-center mb-7">
                  {t("How-it-work.title")}
                </h1>
                <ul className="ps-4 work-list-marker">
                  {HowItWorksList.map((item, index) => (
                    <li
                      key={index}
                      className="text-sm text-black mb-4 list-disc"
                    >
                      {t(`How-it-work.${Object.keys(item)[0]}`)}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="w-full border border-[#E0E0E0] rounded-3xl px-4 py-7 mt-5 md:mt-0">
                <h1 className="text-base md:2xl  font-bold text-center mb-7">
                  {t("Compare-our-offer.title")}
                </h1>
                <ul className="ps-4 work-list-marker">
                  {CompareOfferList.map((item, index) => (
                    <li
                      key={index}
                      className="text-sm text-black mb-4 list-disc"
                    >
                      {`${displayValue}% ${t(
                        `Compare-our-offer.${Object.keys(item)[0]}`
                      )}`}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex justify-center flex-col items-center bg-[#E7F5FA]  rounded-3xl pt-5 mt-5 pb-7 px-5">
              <h1 className="text-base md:2xl  font-bold text-center w-[220px]">
                {t("Get-offer.review-expert-txt")}
              </h1>
              <div className="w-12 h-12 relative my-4">
                <Image src="/user_demo.png" alt="user image" fill />
              </div>
              <p className="text-sm font-medium">Sebastian Gonzalez</p>
              <p className="font-normal text-sm">sebastian@solarmente.se</p>
              <NeosButton
                sx={{ mt: 2 }}
                id="btn"
                category="colored"
                title={t("Get-offer.book-expert-txt")}
                onClick={() => handleCalender()}
              />
              {typeof window !== "undefined" && (
                <PopupModal
                  url={process.env.NEXT_PUBLIC_CALENDLY_URL || ""}
                  onModalClose={() => setOpen(false)}
                  open={open}
                  rootElement={document.getElementById("btn") as any}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourOffer;
