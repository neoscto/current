'use client';
import NeosButton from '@/components/NeosButton';
import { setFormBack, setUserData } from '@/features/common/commonSlice';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import EmailSuccess from '../emailSuccess/page';
// import { getAuthorizationUrl } from "@/services/docusign.service";
import { getTechnicalDataFromApi } from '@/features/calculateSolarPaybackPeriod';
import { useRouter } from 'next/navigation';

const ContractDetail = ({
  handleNext,
  formik,
  showForm,
  setShowForm,
  signature
}: any) => {
  const { userData } = useSelector((state: any) => state.commonSlice);
  const [displayValue, setDisplayValue] = useState(
    Number(userData?.totalPayment)?.toFixed(2) || 0
  );
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!userData._id && !userData.offerId) return router.push('/getoffer');
    const getPrice = async () => {
      const response = await fetch(`/api/users-offers/${userData.offerId}`);
      const { userOffer } = await response.json();
      setDisplayValue(Number(userOffer.totalPayment.toFixed(2)));
    };
    userData.offerId && getPrice();
  }, [userData.offerId, userData._id]);
  const dispatch = useDispatch();
  const labelStyle = 'font-medium text-base text-black';
  const infoStyle = 'text-base font-normal text-gray-300';
  const defaultTxtStyle = 'text-base font-normal text-[#bdbdbd]';
  // const [isChecked, setIsChecked] = useState(false);
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [userPlan, setUserPlan] = useState('neos');

  useEffect(() => {
    setShowForm('yourDetails');
    // const offerData: any = getDataFromSessionStorage('UserOffer');
    setUserPlan(userData?.plan || 'neos');
  }, []);
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
  };

  const redirectDocuSign = () => {
    // const authorizationUri = getAuthorizationUrl();
    // window.location.href = authorizationUri;
    signature();
  };

  const updateUserOffer = async () => {
    try {
      const userObj = {
        address: formik?.values?.address,
        postcode: formik?.values?.postcode,
        city: formik?.values?.city,
        // plan: offerData.plan ?? 'neos',
        cups: formik?.values?.cups,
        nie: formik?.values?.nie,
        addressNo: formik?.values?.addressNo,
        province: formik?.values?.province
      };
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...userObj,
          emailAddress: userData.emailAddress,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phoneNumber: userData.phoneNumber,
          dialCode: userData.dialCode
        })
      });
      const { data } = await response.json();
      if (data) {
        const technicalData = await getTechnicalDataFromApi(
          formik?.values?.cups
        );
        const isPlanNeos = formik?.values?.plan === 'neos';
        await fetch('/api/users-offers', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            offerData: {
              user: userData._id,
              ...(isPlanNeos && {
                typeConsumption: technicalData?.tipoPerfilConsumo
                  .slice(1)
                  .toUpperCase()
              }),
              filledInfo: true
            },
            offerId: userData.offerId
          })
        });
      }
      return data;
    } catch (error) {
      console.error(error);
      // throw new Error(error);
    }
  };
  const handleViewContract = async () => {
    if (!userData._id && !userData.offerId) return router.push('/getoffer');

    setIsButtonLoading(true);
    const isChecked = document.getElementById(
      'link-checkbox'
    ) as HTMLInputElement | null;
    const includeCups =
      formik?.values?.plan !== 'neos' ||
      formik?.values?.cups ||
      formik?.values?.offerType;
    if (
      isChecked &&
      isChecked?.checked &&
      formik?.values?.address &&
      formik?.values?.postcode &&
      formik?.values?.city &&
      formik?.values?.nie &&
      formik?.values?.province &&
      formik?.values?.addressNo &&
      includeCups
    ) {
      const userOfferData = await updateUserOffer();
      if (userOfferData) {
        dispatch(setUserData(userOfferData));
        redirectDocuSign();
        // setShowForm("emailSuccess");
        dispatch(setFormBack('emailDetails'));
        return userOfferData;
      }
    } else {
      alert(t('Details.alert'));
    }
    setIsButtonLoading(false);
  };
  return (
    <>
      {showForm === 'yourDetails' ? (
        <div className="max-w-[93%] md:max-w-[88%] lg:max-w-[83%] w-full mx-auto bg-white">
          <div className="flex flex-col-reverse md:flex-row  justify-center">
            <div className="w-full md:w-3/6 mb-10 md:mb-0">
              <h1 className="text-lg md:2xl lg:text-3xl font-bold mb-3.5">
                {t('Details.title')}
              </h1>
              <div className="w-full border border-[#E0E0E0] rounded-3xl py-2.5 px-4 md:px-6">
                <div className="border-b border-[#E0E0E0] py-3.5 flex flex-col md:flex-row">
                  <div className="w-full md:w-3/5">
                    <p className={labelStyle}>
                      {t('Get-offer-form.first-name')}
                    </p>
                    <p className={infoStyle}>
                      {formik?.values?.firstName || '-'}
                    </p>
                  </div>
                  <div className="w-full md:w-2/5 border-t border-[#E0E0E0] mt-2.5 pt-2.5 md:border-t-0 md:mt-0 md:pt-0">
                    <p className={labelStyle}>
                      {t('Get-offer-form.last-name')}
                    </p>
                    <p className={infoStyle}>
                      {formik?.values.lastName || '-'}
                    </p>
                  </div>
                </div>
                {/* Email and phone */}
                <div className="border-b border-[#E0E0E0] py-3.5 flex flex-col md:flex-row">
                  <div className="w-full md:w-3/5">
                    <p className={labelStyle}>{t('Get-offer-form.email')}</p>
                    <p className={infoStyle}>
                      {formik?.values.emailAddress || '-'}
                    </p>
                  </div>
                  <div className="w-full md:w-2/5 border-t border-[#E0E0E0] mt-2.5 pt-2.5 md:border-t-0 md:mt-0 md:pt-0">
                    <p className={labelStyle}>{t('Get-offer-form.phone')}</p>
                    <p className={infoStyle}>
                      {formik?.values.phoneNumber || '-'}
                    </p>
                  </div>
                </div>
                {/* cups */}
                {userPlan === 'neos' ? (
                  <div className="border-b border-[#E0E0E0] py-3.5 flex">
                    <div className="w-full">
                      <p className={labelStyle}>{t('Get-offer-form.cups')}</p>
                      <p className={defaultTxtStyle}>
                        {/* {
                        // userData?.firstName ||
                        "05"
                      } */}
                        <input
                          type="text"
                          name="cups"
                          placeholder="05"
                          value={formik.values.cups || ''}
                          onChange={handleInputChange}
                          className="outline-none border-none focus:outline-none focus:border-none focus:ring-0 text-black"
                        />
                      </p>
                    </div>
                  </div>
                ) : null}
                {/* DNI/NIF/NIE */}
                <div className="border-b border-[#E0E0E0] py-3.5 flex flex-col md:flex-row">
                  <div className="w-full md:w-3/5">
                    <p className={labelStyle}>{t('Get-offer-form.nie')}</p>
                    <p className={defaultTxtStyle}>
                      <input
                        type="text"
                        name="nie"
                        placeholder="Ingresa aquí"
                        value={formik.values.nie || ''}
                        onChange={handleInputChange}
                        className="outline-none border-none focus:outline-none focus:border-none focus:ring-0 text-black"
                      />
                    </p>
                  </div>
                  <div className="w-full md:w-2/5 border-t border-[#E0E0E0] mt-2.5 pt-2.5 md:border-t-0 md:mt-0 md:pt-0">
                    <p className={labelStyle}>
                      {t('Get-offer-form.address-no')}
                    </p>
                    <p className={defaultTxtStyle}>
                      <input
                        type="text"
                        name="addressNo"
                        placeholder="31"
                        value={formik.values.addressNo || ''}
                        onChange={handleInputChange}
                        className="outline-none border-none focus:outline-none focus:border-none focus:ring-0 text-black"
                      />
                    </p>
                  </div>
                </div>
                {/* Address and Address No */}
                <div className="border-b border-[#E0E0E0] py-3.5 flex flex-col md:flex-row">
                  <div className="w-full md:w-3/5">
                    <p className={labelStyle}>{t('Get-offer-form.address')}</p>
                    <p className={defaultTxtStyle}>
                      {/* {
                        // userData?.firstName ||
                        "2972 Westheimer Rd. Santa Ana, Illinois 85486"
                      } */}
                      <input
                        type="text"
                        name="address"
                        placeholder="Calle Princesa 31"
                        value={formik.values.address || ''}
                        onChange={handleInputChange}
                        className="outline-none border-none focus:outline-none focus:border-none focus:ring-0 text-black"
                      />
                    </p>
                  </div>
                  <div className="w-full md:w-2/5 border-t border-[#E0E0E0] mt-2.5 pt-2.5 md:border-t-0 md:mt-0 md:pt-0">
                    <p className={labelStyle}>{t('Get-offer-form.postcode')}</p>
                    <p className={defaultTxtStyle}>
                      <input
                        type="text"
                        name="postcode"
                        placeholder="28008"
                        value={formik.values.postcode || ''}
                        onChange={handleInputChange}
                        className="outline-none border-none focus:outline-none focus:border-none focus:ring-0 text-black"
                      />
                    </p>
                  </div>
                </div>
                <div className="py-3.5 flex flex-col md:flex-row">
                  <div className="w-full md:w-3/5">
                    <p className={labelStyle}>{t('Get-offer-form.city')}</p>
                    <p className={defaultTxtStyle}>
                      <input
                        type="text"
                        name="city"
                        placeholder="Madrid"
                        value={formik.values.city || ''}
                        onChange={handleInputChange}
                        className="outline-none border-none focus:outline-none focus:border-none focus:ring-0 text-black"
                      />
                    </p>
                  </div>
                  <div className="w-full md:w-2/5 mt-2.5 pt-2.5 md:border-t-0 md:mt-0 md:pt-0">
                    <p className={labelStyle}>{t('Get-offer-form.province')}</p>
                    <p className={defaultTxtStyle}>
                      <input
                        type="text"
                        name="province"
                        placeholder="Madrid"
                        value={formik.values.province || ''}
                        onChange={handleInputChange}
                        className="outline-none border-none focus:outline-none focus:border-none focus:ring-0 text-black"
                      />
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-start my-3.5">
                <input
                  id="link-checkbox"
                  type="checkbox"
                  className="w-12 h-12 md:mt-1 md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded text-8xl"
                />
                <label className="ms-2 mt-2 md:mt-0 text-[#4F4F4F] text-sm">
                  {t('Get-offer-form.form-t&c')}
                  <span className="text-[#FD7C7C]"> NEOS </span>
                  <Link
                    href="/terms-and-conditions"
                    target="_blank"
                    className="text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    {t('Get-offer-form.form-t&c-txt')}
                  </Link>
                  .
                </label>
              </div>
              {isMobile ? (
                <div className="block">
                  <NeosButton
                    sx={{ mt: 3 }}
                    category="colored"
                    title={t('Get-offer-form.view-contract-txt')}
                    onClick={handleViewContract}
                  />
                </div>
              ) : (
                ' '
              )}
            </div>
            <div className="flex justify-center items-center relative w-full md:w-3/6 pb-10 md:left-8 lg:left-12">
              <div className="inline-block md:px-4">
                <img src="description.png" alt="Description image" />
                <div className="-mt-12 text-center">
                  <h1 className="text-lg md:2xl lg:text-3xl font-bold">
                    {t('Your-offer.title')}: €{displayValue}
                  </h1>
                  {/* <div className='inline-flex'>
                                        <input id="link-checkbox" type="checkbox" value="" className="mt-[3px] w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  " />
                                        <select id="countries" className="border-0 text-[#4F4F4F] text-sm md:text-base font-medium rounded-lg dark:text-white focus:outline-none ">
                                            <option >Choose a country</option>
                                            <option value="US" selected>Commercialisation Agreement</option>
                                        </select>
                                    </div> */}
                  {isMobile ? (
                    ''
                  ) : (
                    <div className="block">
                      <NeosButton
                        sx={{ mt: 3 }}
                        category="colored"
                        title={t('Get-offer-form.view-contract-txt')}
                        onClick={handleViewContract}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      {showForm === 'emailSuccess' ? (
        <EmailSuccess handleNext={handleNext} formik={formik} />
      ) : (
        ''
      )}
    </>
  );
};

export default ContractDetail;
