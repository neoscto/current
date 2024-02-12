"use client";
import React, { useEffect, useState, } from "react";
import { CompareOfferList, HowItWorksList } from "@/utils/StaticData";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useTranslation } from "react-i18next";
import { PopupModal, useCalendlyEventListener } from "react-calendly";
import NeosButton from "@/components/NeosButton";
import { useRouter } from "next/navigation";
import { getDataFromSessionStorage } from "@/utils/utils";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Label, CartesianAxis } from 'recharts';
import VideoPreview from "../videoPlayer/preview";
import Rating from '@mui/material/Rating';

const data = [
  {
    years: '0',
    saving: 500,
  },
  {
    years: '1',
    saving: 1000,
  },
  {
    years: '2',
    saving: 1500,
  },
  {
    years: '3',
    saving: 2000,
  },
  {
    years: '4',
    saving: 2500,
  },
  {
    years: '5',
    saving: 3000,
  },
  {
    years: '6',
    saving: 3500,
  },
  {
    years: '7',
    saving: 4000,
  },
  {
    years: '8',
    saving: 4500,
  },
  {
    years: '9',
    saving: 5000,
  },
  {
    years: '10',
    saving: 5500,
  },
  {
    years: '11',
    saving: 6000,
  },
  {
    years: '12',
    saving: 6500,
  },
  {
    years: '13',
    saving: 7000,
  },
  {
    years: '14',
    saving: 7500,
  },
  {
    years: '15',
    saving: 8000,
  },
  {
    years: '16',
    saving: 8500,
  },
  {
    years: '17',
    saving: 9000,
  },
  {
    years: '18',
    saving: 9500,
  },
  {
    years: '19',
    saving: 10000,
  },
  {
    years: '20',
    saving: 10500,
  },
  {
    years: '21',
    saving: 11000,
  },
  {
    years: '22',
    saving: 11500,
  },
  {
    years: '23',
    saving: 12000,
  },
  {
    years: '24',
    saving: 12500,
  },
  {
    years: '25',
    saving: 13000,
  }
];

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
  const [value, setValue] = useState<number | null>(5);
  const [isMobile, setIsMobile] = useState(false);
  const [userPlan, setUserPlan] = useState('neos');

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

  useEffect(() => {
    const offerData: any = getDataFromSessionStorage("UserOffer");
    setUserPlan((offerData?.plan) ? offerData?.plan : 'neos');
  }, []);

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


  const scrollToDiv = () => {
    const planSection = document.getElementById('plan-section');
    if (planSection) {
      planSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const updateUserPlanSelection = (plan: string) => () => {
    const offerData: any = getDataFromSessionStorage("UserOffer");
    offerData.plan = plan;
    sessionStorage.setItem("UserOffer", JSON.stringify(offerData));
    setUserPlan(plan);
  }

  return (
    <div className="max-w-[1200px] w-full mx-auto" id='content-id'>
      <div className="w-full bg-white lg:px-[70px] lg:pb-[18px] px-5 py-4" >

        {/* Offer and virtual solar */}
        <div className="flex lg:justify-end lg:gap-[131px] items-end flex-col lg:flex-row gap-[29px]">

          <div className="lg:max-w-[354px] w-full flex flex-col items-center max-w-full">
            <img src="virtual-solar-small.png" alt="Description image" width={348} height={296} />
            <div className="text-center mt-[7px]">
              <h1 className="lg:text-[30px] lg:leading-[37px] text-[24px] leading-[30px] font-bold">
                {t("Your-offer.title")}: €{displayValue}
              </h1>
              <p className=" mt-1 text-[#828282] font-medium lg:text-[18px] lg:leading-[22px] text-[16px] leading-[22px]">
                {t("Your-offer.desc")}
              </p>
            </div>

            <div className="flex justify-center items-end gap-[18px] lg:mt-5 mt-6 w-full">
              <div className="flex flex-col lg:gap-1.5 gap-4">
                <p className="text-center text-[14px] leading-[17px] font-medium">{t("Your-offer.Redeem-code-discount")}</p>
                <input
                  type="text"
                  name="cups"
                  placeholder="Enter here"
                  className="py-[13px] px-1 border-[1px] border-[#E0E0E0] rounded-[8px] placeholder:text-center text-center focus-within:outline-none h-[44px] lg:max-w-[219px] w-full"
                />
              </div>
              <div>
                <NeosButton
                  category="colored"
                  className='lg:px-5 lg:py-3 text-[16px] leading-5 font-semibold h-[44px] rounded-[15px] w-auto lg:w-full px-[9px] py-3'
                  title={t("Your-offer.validate-btn")}
                  onClick={handleNext}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center lg:max-w-[500px] max-w-full w-full">
            <div className="max-w-full w-full">
              <div className="py-[11px] text-black">
                <h1 className="flex flex-col justify-center lg:block">
                  <span className="lg:text-[30px] lg:leading-[37.8px] lg:text-left font-bold text-[22px] leading-[27px] text-center">{t("Your-offer.offer-title")}:</span>
                  <span className="lg:text-[24px] lg:leading-[30px] text-[20px] leading-[25px] pl-1 lg:text-left text-center">{displayValue} {t("Your-offer.offer-option1")} {displayValue}
                    {t("Your-offer.offer-option1-unit") + ")"}
                    {/* {(displayValue * 3.2).toFixed(2)}KWp) */}</span>
                </h1>
              </div>

              <div id='plan-section'>
                {/* Select plan */}
                <div className="lg:py-[22px] pt-[16px] ">
                  <p className="text-[20px] leading-[25px] font-semibold text-[#333333] text-center lg:p-0 p-1 pb-2">{t("offer.selectPlan")}</p>
                </div>

                {/* Plan Buttons */}
                <div className="flex lg:gap-4 lg:justify-normal justify-center md:flex-row flex-col gap-3" >
                  <NeosButton
                    category="outline"
                    className={`!text-black py-[14px] lg:px-[24px] !outline-[2px] !outline ${(userPlan == 'neos') ? '!outline-[#66BCDA]' : '!outline-[#E0E0E0]'} !font-medium text-[16px] !leading-5 !normal-case px-[53px] whitespace-pre md:whitespace-normal`}
                    title={t("offer.buyPanelProviderNeos")}
                    onClick={updateUserPlanSelection('neos')}
                  />

                  <NeosButton
                    category="outline"
                    className={`!text-black py-[14px] lg:px-[24px] !outline-[2px] !outline ${(userPlan == 'current') ? '!outline-[#66BCDA]' : '!outline-[#E0E0E0]'} !font-medium text-[16px] !leading-5 !normal-case px-[53px] whitespace-pre md:whitespace-normal`}
                    title={t("offer.buyPanelProviderCurrent")}
                    onClick={updateUserPlanSelection('current')}
                  />
                </div>
              </div>

              <div className="lg:py-[11px] mt-[22px] flex flex-col gap-2.5 py-[8.5px] ">
                <p className="text-[18px] leading-[22.68px] font-medium text-[#333333]">
                  • €{displayValue} {t("Your-offer.offer-saving-1")}
                </p>
                <p className="text-[18px] leading-[22.68px] font-medium text-[#333333]">
                  • €{displayValue} {t("Your-offer.offer-saving-2")}
                </p>
                <p className="text-[18px] leading-[22.68px] font-medium text-[#333333]">
                  • {displayValue} {t("Your-offer.offer-payback")}
                </p>
                <p className="text-[18px] leading-[22.68px] font-medium text-[#333333]">
                  • {displayValue}% {t("Your-offer.offer-consumption")}
                </p>
              </div>

              <div className="flex md:gap-4 lg:mt-[22px] mt-[16px] md:flex-row flex-col gap-3">
                <NeosButton
                  category="colored"
                  title={t("Your-offer.download-offer")}
                  className='lg:w-full w-auto lg:p-[17px]'
                />

                <NeosButton
                  category="colored"
                  title={t("Your-offer.contract-btn-txt")}
                  onClick={handleNext}
                  className='lg:w-full w-auto lg:p-[17px]'
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full gap-[30px] justify-between lg:mt-[46px] flex flex-col-reverse lg:flex-row mt-[23px]">
          <div className="overflow-x-auto w-full lg:max-w-[100%_-_253px]">
            <div className="flex">
              <div className="flex flex-col items-end max-w-[807px] min-w-[807px] w-full mx-auto">
                {/* header render */}
                <div className="flex justify-end max-w-[calc(100%_-_225px)] w-full">
                  {panelHeader.map((head, index) => {
                    return (<div key={index} className={`w-full py-[21px] px-4 whitespace-pre border text-[#4F4F4F] text-[14px] leading-[17.64px] font-semibold border-b-0 flex items-center ${index === 0 ? 'rounded-tl-3xl px-3 border-[#0F9DD0] bg-[#E8F5FA] max-w-[180px] min-w-[180px] w-full' : index === 1 ? 'max-w-[138px] min-w-[138px] w-full' : index === 3 ? ' border-[#E0E0E0] rounded-tr-3xl max-w-[108px] min-w-[108px] w-full' : 'border-[#E0E0E0] max-w-[156px] min-w-[156px] w-full'}`}>
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
                        <div className={`p-[18px] text-[#4F4F4F] text-[14px] leading-[17.64px] font-medium text-center border border-[#0F9DD0] bg-[#E8F5FA] border-b-0 max-w-[180px] min-w-[180px] w-full ${index === panelChargeDetails.length - 1 ? 'border-b-[1px]' : ''}`}>{tempData[index].neosPanelProvider || '-'}</div>
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
          </div>

          <div className="lg:max-w-[223px] w-full max-w-full flex justify-center items-center">
            <div className="relative w-full lg:h-[347px] max-w-[310px] lg:max-w-[223px] h-[405px] video-container !rounded-3xl overflow-hidden">
              <VideoPreview
                custonClass="lg:max-h-[347px] h-full lg:w-[223px] w-[310px] max-h-[405px]"
                url="https://videos.gotolstoy.com/public/41532226-45a4-45f6-a10f-a313cb492bc8/6c2ed4e4-393f-415d-8c6f-495ee6f13e80/6c2ed4e4-393f-415d-8c6f-495ee6f13e80.mp4"
                controls={false}
                muted
                autoPlay
              />
            </div>
          </div>
        </div>

        <div className="flex lg:items-center lg:justify-end lg:gap-[196px] lg:flex-row flex-col gap-8 items-center justify-center lg:mb-0 mb-[22px]">
          {/* Licensed  */}
          <div className="flex lg:justify-between align-center flex-1 md:flex-none lg:flex-none max-w-[548px] w-full lg:px-[43px] lg:py-[47px] lg:flex-row flex-col justify-center gap-3 lg:gap-0 mt-8 lg:mt-0">
            <p className="text-[20px] leading-[25px] text-black font-semibold text-center lg:text-left">
              {t("Footer.license")}
            </p>
            <div className="flex items-center justify-center flex-wrap lg:gap-[26px] gap-4">
              <img
                src="Footer/CNMC.png"
                alt="NEOS logo"
                width={55}
                height={33}
                className="lg:max-w-[55.38px] w-full max-h-[30px] h-full max-w-[51px]"
              />
              <img
                src="Footer/REE-removebg-preview.png"
                alt="NEOS logo"
                width={160}
                height={20}
                className="lg:max-w-[160px] w-full max-h-[20px] h-full max-w-[144px]"
              />
              <img
                src="Footer/OMIE-removebg-preview.png"
                alt="NEOS logo"
                width={62}
                height={30}
                className="lg:max-w-[62.46px] w-full max-h-[30px] h-full max-w-[58px]"
              />
            </div>
          </div>

          <NeosButton
            className={'px-[24px] lg:py-[14px] py-[17px] text-sm leading-4 font-semibold lg:!mr-[36px] w-auto'}
            category="colored"
            title={t("select-plan-btn")}
            onClick={scrollToDiv}
          />
        </div>

        {/* How does it work? */}
        <div className="w-full  pt-6 lg:px-[34px] px-4 pb-[22px] border border-[#E0E0E0] !rounded-3xl">

          <h1 className="text-black text-[20px] leading-[25px] font-semibold text-center">
            {t("How-it-work.title")}
          </h1>

          <div className="flex mt-[34px] lg:gap-6 lg:flex-row flex-col gap-[22px]">
            <div className="bg-[#E7F5FA] !rounded-3xl lg:p-5 w-full px-3 py-5 ">
              <h1 className="lg:text-[18px] lg:leading-[22.68px] text-[16px] leading-5 text-black text-center font-semibold">{t("How-it-work.chooseNeosPartner")}</h1>
              <ul className="flex flex-col gap-4 mt-[30px] list-disc pl-5">
                <li className="text-[14px] leading-[21px] text-black">{t("How-it-work.NeosPartner.point1")}</li>
                <li className="text-[14px] leading-[21px] text-black">{t("How-it-work.NeosPartner.point2")}</li>
                <li className="text-[14px] leading-[21px] text-black">{t("How-it-work.NeosPartner.point3")}</li>
              </ul>
            </div>

            <div className="bg-[#E7F5FA] !rounded-3xl lg:p-5 w-full px-3 py-5">
              <h1 className="text-[18px] leading-[22.68px] text-black text-center font-semibold">{t("How-it-work.keepProvider")}</h1>

              <ul className="flex flex-col gap-4 mt-[30px] list-disc pl-5">
                <li className="text-[14px] leading-[21px] text-black">{t("How-it-work.providerPartner.point1")}</li>
                <li className="text-[14px] leading-[21px] text-black">{t("How-it-work.providerPartner.point2")}</li>
                <li className="text-[14px] leading-[21px] text-black">{t("How-it-work.providerPartner.point3")}</li>
              </ul>
            </div>
          </div>
        </div>



        {/* Customer review starts */}
        <div className="flex lg:gap-[26px] lg:mt-8 mt-[19px] gap-[17px] lg:flex-row flex-col">
          <div className="lg:max-w-[635px] w-full lg:py-6 lg:pl-5 lg:pr-[31px] pt-[22px] pb-[17px] px-[16px] border flex flex-col justify-between gap-2 border-[#E0E0E0] !rounded-3xl max-w-full">
            <div className="">
              <h1 className="text-[18px] leading-[21px] font-bold flex flex-col lg:text-left text-center">{t("customer-review")}</h1>

              <div className="flex gap-4 lg:mt-4 mt-[18px]">
                <div className="w-[50px] radius-[50%] h-[50px]">
                  <img src="user.jpg" alt="user" width={50} height={50} className="object-cover" />
                </div>

                <div className="max-w-[calc(100%_-_66px)] w-full ">
                  <p className="text-[16px] leading-5 font-medium text-black">Manuel Fernández</p>
                  <div className="my-2">
                    <Rating
                      readOnly
                      size={'small'}
                      name="simple-controlled"
                      value={value || 0}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    />
                  </div>
                  <p className="text-[14px] leading-5 text-[#4F4F4F]" >"I love Neos! Thanks to them, my electricity bills are near €0,00 month after month! I live in a flat, so without them, I would have never been able to access solar panels.”</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <NeosButton
                className={'px-[24px] lg:py-[14px] py-[17px] text-sm leading-4 font-semibold w-auto mt-[21px] '}
                category="colored"
                title={t("select-plan-btn")}
                onClick={scrollToDiv}
              />
            </div>
          </div>

          <div className="lg:max-w-[399px] w-full bg-[#E7F5FA] !rounded-3xl py-5 px-5 max-w-full">
            <h1 className="whitespace-pre text-center text-[18px] leading-[21px] font-bold">{t("review-your-offer-with-ceo")}</h1>
            <div className="flex flex-col items-center mt-[14px] mb-[21px]">
              <img src="user.jpg" alt="user" className="w-[50px] h-[50px] rounded-[50%] object-cover" width={50} height={50} />

              <p className="text-[14px] leading-[17.64px] text-black font-medium mt-2 text-center">Jose Laffitte</p>
              <p className="text-[14px] leading-[17.64px] text-black text-center">jose@neosenergy.co</p>
            </div>
            <div className="flex justify-center">
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
        {/* Customer review ends */}



        {/* Chart Starts here */}
        <div className="flex justify-center flex-col w-full h-auto border mt-8 border-[#E0E0E0] !rounded-3xl px-4 pt-6 pb-4">

          {/*  chart header */}
          <div className="flex justify-between lg:gap-4 lg:mb-[40px] lg:flex-row flex-col gap-[14px] mb-2.5">
            <div className="flex flex-wrap lg:gap-[29px] gap-1.5 lg:items-center lg:flex-row flex-col items-start lg:pl-[18px]">
              <span className="text-[20px] leading-[25px] font-semibold text-black text-left">{t("panel-charge.payback")}</span>

              <div className="flex gap-4">
                <NeosButton
                  category="outline"
                  className='lg:px-[24px] lg:py-[14px] px-[14px] py-2 lg:text-[16px] text-[12px] leading-[15px] lg:leading-5 !font-medium !text-black !rounded-[24px] !border-2 !border-[#66BCDA] !normal-case h-12'
                  title={t("How-it-work.chooseNeosPartner")}
                />
                <NeosButton
                  category="outline"
                  className='g:px-[24px] lg:py-[14px] px-[14px] py-2 lg:text-[16px] text-[12px] leading-[15px] lg:leading-5 !font-medium !text-black !rounded-[24px] border-2 !border-[#E0E0E0] !normal-case h-12'
                  title={t("How-it-work.keepProvider")}
                />
              </div>
            </div>

            <div className="flex lg:flex-col lg:justify-end flex-row gap-[10px] justify-start lg:pr-[23px]">
              <div className="flex items-center gap-2.5 max-w-1/2 lg:w-auto">
                <div className="bg-[#436DC6] lg:w-[26px] w-[20px] h-[10px]"></div>
                <span className="lg:text-[16px] lg:leading-[21px] text-[12px] leading-[15px] !font-medium text-[#4F4F4F]">{t("chart.savingWithNeos")}</span>
              </div>
              <div className="flex items-center gap-2.5 max-w-1/2 lg:w-auto">
                <div className="bg-[#EB5757] lg:w-[26px] w-[20px] h-[10px]"></div>
                <span className="lg:text-[16px] lg:leading-[21px] text-[12px] leading-[15px] !font-medium text-[#4F4F4F]">{t("chart.installationCost")}</span>
              </div>
            </div>
          </div>

          {/* chart container */}
          <div className="md:h-[312px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={150} height={40} data={data} >
                <Bar dataKey="saving" fill="#436DC6" barSize={24} radius={[5, 5, 0, 0]} />
                <XAxis dataKey="years" tickLine={false} className="lg:text-[12px] lg:leading-[15px] text-[6px] leading-[7px] mt-[10px]">
                  <Label offset={-4} position="insideBottom" fontSize={20} value={t("Years")} className="lg:text-[12px] lg:leading-[15px] text-[6px] leading-[7px]" />
                </XAxis>
                <YAxis tickCount={4} tickLine={false} domain={[0, 15000]} tickFormatter={(value) => value > 0 ? `${value / 1000}K` : value} className="lg:text-[12px] lg:leading-[15px] text-[6px] leading-[7px]">
                  <Label offset={0} angle={-90} position={'insideLeft'} value={`${t("Savings")} (€)`} className="lg:text-[12px] lg:leading-[15px] text-[6px] leading-[7px]" />
                </YAxis>
                <CartesianAxis className="lg:text-[12px] lg:leading-[15px] text-[6px] leading-[7px]" />
                {/* <Tooltip /> */}
                <ReferenceLine y={4500} stroke="#EB5757" strokeDasharray="5 0" strokeWidth={3} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Chart ends */}

        <div className="flex justify-center my-8">
          <NeosButton
            category="colored"
            className='px-5 py-3 text-[16px] leading-5 font-semibold w-auto'
            title={t("select-plan-btn")}
            onClick={scrollToDiv}
          />
        </div>

        <div className="w-full !rounded-3xl lg:h-[388px] h-[651px] relative overflow-hidden">
          <img src="video-placeholder.png" alt="video" className="object-cover lg:h-[388px] h-[651px]" />
          <div className="lg:max-w-[340px] w-full bg-[#01092299] px-5 py-4 rounded-[30px] top-6 lg:left-6 absolute -translate-x-1/2 left-1/2 lg:translate-x-0 max-w-[calc(100%_-_30px)]">
            <p className="lg:text-[20px] lg:leading-[25px] text-[14px] leading-[17.64px] font-semibold text-white">{t("chart.peekSolarFarm")}</p>
          </div>

          <div className="lg:max-w-[280px] w-full bg-[#01092299] pt-[14px] pl-[22px] pr-[15px] pb-[18px] absolute lg:top-6 lg:right-6 rounded-[30px] bottom-6 max-w-[calc(100%_-_30px)] left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-auto lg:bottom-auto">
            <p className="text-[16px] leading-5 font-bold text-white">{t("chart.solar")}</p>

            <ul className="flex flex-col mt-3 list-disc pl-[12px] gap-[14px]">
              <li className="text-[14px] leading-[17.64px] font-medium text-white">{t("chart.solarPoints.point1")}</li>
              <li className="text-[14px] leading-[17.64px] font-medium text-white">{t("chart.solarPoints.point2")}</li>
              <li className="text-[14px] leading-[17.64px] font-medium text-white">{t("chart.solarPoints.point3")}</li>
            </ul>
          </div>
        </div>
      </div>
    </div >
  );
};

export default YourOffer;
