'use client';
import NeosButton from '@/components/NeosButton';
import WhatsappWidget from '@/components/WhatsappWidget';
import { setUserData } from '@/features/common/commonSlice';
import { Grid } from '@mui/material';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

const CheckoutForm = () => {
  const { userData } = useSelector((state: any) => state.commonSlice);
  const [displayValue, setDisplayValue] = useState(
    userData?.totalPayment.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }) || 0
  );
  const [totalPayment, setTotalPayment] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!userData._id) return router.push('/personalizedoffer');
    const getPrice = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users-offers/${userData._id}`
      );
      const { offer } = await response.json();
      setDisplayValue(
        offer.totalPayment.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })
      );
      setTotalPayment(offer.totalPayment);
    };
    userData._id && getPrice();
  }, []);

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  // state for is payment success
  // const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    if (!userData._id) return router.push('/personalizedoffer');

    setLoading(true);

    try {
      if (!stripe || !elements) {
        throw new Error(t('Payment.stripe-not-found-err'));
      }

      const cardElement = elements?.getElement(CardNumberElement);
      if (!cardElement) {
        throw new Error(t('Payment.element-not-found-err'));
      }

      const { token, error } = await stripe!.createToken(cardElement);
      if (error?.code === 'insufficient_funds') {
        setError(error.message || '');
      }
      if (error) {
        console.log('PAYMENT ERROR ==>', error);
        setError(error.message || '');
      }
      if (token) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              token: token.id,
              amount: totalPayment,
              // amount: 1,
              userOffer: userData._id,
              emailAddress: userData.emailAddress,
              firstName: userData.firstName,
              lastName: userData.lastName,
              phoneNumber: userData.phoneNumber,
              dialCode: userData.dialCode
            })
          }
        );
        const paymentResponse = await response.json();
        if (paymentResponse.status === 'succeeded') {
          // setIsPaymentSuccess(true);
          dispatch(setUserData({ ...userData, hasPaid: true }));
          router.push('/personalizedoffer?activeStep=3');
        }
      }
      // Send the token to your server to complete the payment
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // const validateName = (value: string) => {
  //   setName(value);
  //   const nameRegex = /^[a-zA-Z\s]*$/;
  //   if (!nameRegex.test(value)) {
  //     setError('Please enter valid name');
  //     return false;
  //   }
  //   if (!value) return setError('Name is required');
  //   if (value.length < 3) {
  //     setError('Name is too short');
  //     return false;
  //   } else {
  //     setError(null);
  //     return true;
  //   }
  // };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-[1.5rem] min-[350px]:text-[1.65rem] leading-9 md:text-3xl md:leading-10 lg:text-[34px] lg:leading-[38px] font-bold text-center mt-2 mb-8">
        {t('Your-offer.contract-title')}:<br />€{displayValue}
      </h1>
      <div className="rounded-3xl border border-[#E0E0E0] p-6">
        <p className="text-lg font-medium text-black">{t('Payment.title')}</p>
        <p className="text-[#667085] text-sm mb-8">{t('Payment.desc')}</p>
        <Grid container rowSpacing={3} columnSpacing={3}>
          {/* CARD number */}
          <Grid item xs={12} sm={12} md={12}>
            <label className="">{t('Payment.card-number')}</label>
            <CardNumberElement
              className="border border-[#E0E0E0] rounded-[8px] p-3 mt-1"
              options={{
                showIcon: true
              }}
            />
          </Grid>

          {/* Expire date */}
          <Grid item xs={6} sm={6} md={6}>
            <label className="">{t('Payment.expiry')}</label>
            <CardExpiryElement className="border border-[#E0E0E0] rounded-[8px] p-3 mt-1" />
          </Grid>

          {/* CVC */}
          <Grid item xs={6} sm={6} md={6}>
            <label className="">{t('Payment.cvc')}</label>
            <CardCvcElement className="border border-[#E0E0E0] rounded-[8px] p-3 mt-1" />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {error && <p className="text-[#d32f2f]">{error}</p>}
          </Grid>
        </Grid>
      </div>
      <div className="mt-8 text-center">
        <NeosButton
          sx={{
            height: '56px !important',
            maxWidth: '273px',
            fontSize: '18px !important'
          }}
          type="submit"
          category="colored"
          buttonsize="lg"
          title="PAY NOW"
          isLoading={loading}
          disabled={!stripe || loading || !totalPayment}
        />
      </div>
      <WhatsappWidget />
    </form>
  );
};

export default CheckoutForm;
