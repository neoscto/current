'use client';
import NeosButton from '@/components/NeosButton';
import NeosTextField from '@/components/NeosTextField';
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
import { useSelector } from 'react-redux';

const CARD_ELEMENT_OPTIONS = {
  disableLink: true,
  style: {
    base: {
      iconColor: '#FD7C7C',
      color: '#000000',
      fontSize: '14px',
      ':-webkit-autofill': {
        color: '#fce883'
      },
      '::placeholder': {
        color: 'rgb(0, 0, 0, 0.3)',
        fontSize: '14px'
      }
    },
    invalid: {
      iconColor: '#d32f2f',
      color: '#d32f2f'
    }
  }
};

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
    if (!userData._id && !userData.offerId) return router.push('/getoffer');
    const getPrice = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users-offers/${userData.offerId}`
      );
      const { userOffer } = await response.json();
      setDisplayValue(
        userOffer.totalPayment.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })
      );
      setTotalPayment(userOffer.totalPayment);
    };
    userData.offerId && getPrice();
  }, [userData.offerId, userData._id]);

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // state for is payment success
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    if (!userData.offerId && !userData._id) return router.push('/getoffer');

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
              // amount: totalPayment,
              amount: 1,
              offerId: userData.offerId,
              userId: userData._id
            })
          }
        );
        const paymentResponse = await response.json();
        if (paymentResponse.status === 'succeeded') {
          setIsPaymentSuccess(true);
          router.push('/getoffer?activeStep=3');
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

  const validateName = (value: string) => {
    const nameRegex = /^[a-zA-Z\s]*$/;
    if (!nameRegex.test(value)) {
      return setError('Please enter valid name');
    }
    if (!value) return setError('Name is required');
    if (value.length < 3) {
      setError('Name is too short');
    } else {
      setError(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <h1 className="text-lg md:2xl lg:text-3xl font-bold  mt-2 mb-8 text-center">
        {t('Your-offer.title')}: €{displayValue}
      </h1> */}
      <h1 className="text-[1.5rem] min-[350px]:text-[1.65rem] leading-9 md:text-3xl md:leading-10 lg:text-[34px] lg:leading-[38px] font-bold text-center mt-2 mb-8">
        {t('Your-offer.contract-title')}:<br />€{displayValue}
      </h1>
      <div className="rounded-3xl border border-[#E0E0E0] p-6">
        <p className="text-lg font-medium text-black">{t('Payment.title')}</p>
        <p className="text-[#667085] text-sm mb-8">{t('Payment.desc')}</p>
        <Grid container rowSpacing={3} columnSpacing={3}>
          {/* Name on card */}
          <Grid item xs={12} sm={12} md={12}>
            <NeosTextField
              placeholder="Olivia Rhye"
              label={t('Payment.card-name')}
              onChange={(e) => {
                validateName(e.target.value);
              }}
              onBlur={(e) => {
                validateName(e.target.value);
              }}
            />
          </Grid>

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
          sx={{ width: '140px !important' }}
          category="colored"
          type="submit"
          title="PAY NOW"
          isLoading={loading}
          disabled={!stripe || loading || !totalPayment}
        />
      </div>
    </form>
  );
};

export default CheckoutForm;
