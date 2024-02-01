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

  const panelChargeDetails = [
    { title: 'installation-cost' },
    { title: 'grid-electricity' },
    { title: 'payback' },
    { title: 'savings' },
    { title: 'c02-reduction' }
  ]

  const panelHeader = [
    { title: 'neos-panel-neos-provider' },
    { title: 'neos-panels-keep-provider' },
    { title: 'rooftop-panels-keep-provider' },
    { title: 'keep-provider' }
  ]

  const tempData = [
    {
      neosPanelProvider: '€ 3,600',
      neosPanelKeepProvider: '€3600',
      rooftopPanelKeepProvider: '€ 5000',
      keepProvider: ''
    },
    {
      neosPanelProvider: '€ 8,000',
      neosPanelKeepProvider: '€ 14,000',
      rooftopPanelKeepProvider: '€ 14,000',
      keepProvider: '€ 26,000'
    },
    {
      neosPanelProvider: '6 years',
      neosPanelKeepProvider: '8 years',
      rooftopPanelKeepProvider: '13 years',
      keepProvider: ''
    },
    {
      neosPanelProvider: '€ 14,400',
      neosPanelKeepProvider: '€ 8,400',
      rooftopPanelKeepProvider: '€ 6,600',
      keepProvider: '0'
    },
    {
      neosPanelProvider: '1.8 tons',
      neosPanelKeepProvider: '1.5 tons',
      rooftopPanelKeepProvider: '1.3 tons',
      keepProvider: ''
    }
  ]

  return (
    <div className="max-w-[1200px] w-full mx-auto">
      <div className="w-full bg-white lg:pt-12 lg:px-[70px] lg:pb-[67px]">

        {/* Offer and virtual solar */}
        <div className="flex justify-end gap-[131px] items-end">
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

            <div className="flex justify-between items-end gap-[18px] mt-5 w-full">
              <div className="flex flex-col gap-1.5">
                <p className="text-center text-[14px] leading-[17px] font-medium">{t("Your-offer.Redeem-code-discount")}</p>
                <input
                  type="text"
                  name="cups"
                  placeholder="Enter here"
                  className="py-[13px] px-1 border-[1px] border-[#E0E0E0] rounded-xl placeholder:text-center text-center focus-within:outline-none"
                />
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

        <div className="w-full gap-[30px] mt-[46px]">
          <div className="flex flex-col items-end w-[75%]">
            {/* header render */}
            <div className="flex justify-end max-w-[calc(100%_-_225px)] w-full">
              {panelHeader.map((head, index) => {
                return (<div key={index} className={`w-full py-[21px] px-4 whitespace-pre border text-[#4F4F4F] text-[14px] leading-[17.64px] font-semibold border-b-0 flex items-center ${index === 0 ? 'rounded-tl-3xl border-[#0F9DD0] bg-[#E8F5FA] max-w-[180px] w-full' : index === 1 ? 'max-w-[138px] w-full' : index === 3 ? ' border-[#E0E0E0] rounded-tr-3xl max-w-[108px] w-full' : 'border-[#E0E0E0] max-w-[156px] w-full'}`}>
                  {index === 0 && <img src="premium.png" alt='premium' className="px-1.5" />}
                  {t(`panel-header.${head.title}`)}
                </div>)
              })}
            </div>

            {/* table body rendering start*/}
            <div className="w-full">
              {panelChargeDetails?.map((charge, index) => {
                return (<div className="flex w-full" key={index}>
                  <div className={`w-[225px] pl-[20px] p-[18px] border border-[#E0E0E0] border-r-0 border-b-0 text-[#4F4F4F] text-[14px] leading-[17.64px] font-medium ${index === panelChargeDetails.length - 1 ? 'rounded-bl-3xl border-b-[1px]' : ''}`}>{t(`panel-charge.${charge.title}`)}</div>
                  <div className="flex max-w-[calc(100%_-_225px)] w-full">
                    <div className={`p-[18px] text-[#4F4F4F] text-[14px] leading-[17.64px] font-medium text-center border border-[#0F9DD0] bg-[#E8F5FA] border-b-0 max-w-[180px] w-full ${index === panelChargeDetails.length - 1 ? 'border-b-[1px]' : ''}`}>{tempData[index].neosPanelProvider || '-'}</div>
                    <div className={`p-[18px] text-[#4F4F4F] text-[14px] leading-[17.64px] font-medium text-center border border-[#E0E0E0] border-r-0 border-b-0 max-w-[138px] w-full ${index === panelChargeDetails.length - 1 ? 'border-b-[1px]' : ''}`}>{tempData[index].neosPanelKeepProvider || '-'}</div>
                    <div className={`p-[18px] text-[#4F4F4F] text-[14px] leading-[17.64px] font-medium text-center border border-[#E0E0E0] border-r-0 border-b-0 max-w-[156px] w-full ${index === panelChargeDetails.length - 1 ? 'border-b-[1px]' : ''}`}>{tempData[index].rooftopPanelKeepProvider || '-'}</div>
                    <div className={`p-[18px] text-[#4F4F4F] text-[14px] leading-[17.64px] font-medium text-center border border-[#E0E0E0] border-b-0 max-w-[108px] w-full ${index === panelChargeDetails.length - 1 ? 'rounded-br-3xl border-b-[1px]' : ''}`}>{tempData[index].keepProvider || '-'}</div>
                  </div>
                </div>)
              })}
            </div>
            {/*  table body rendering ends*/}
          </div>
        </div>


        <div className="flex flex-col md:flex-row mt-[46px]">
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
