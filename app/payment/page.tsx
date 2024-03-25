'use client';
import React, { useEffect, useState } from 'react';
import {
  CardElement,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from '@stripe/react-stripe-js';
import { Grid } from '@mui/material';
import NeosTextField from '@/components/NeosTextField';
import NeosButton from '@/components/NeosButton';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useTranslation } from 'react-i18next';
import {
  getDataFromSessionStorage,
  getPaybackDataFromSessionStorage
} from '@/utils/utils';
import { useRouter } from 'next/navigation';

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
  const { userData } = useSelector((state: RootState) => state.commonSlice);
  const solarData: any = getPaybackDataFromSessionStorage('SolarPayback');
  const offerData: any = getDataFromSessionStorage('UserOffer');
  const router = useRouter();
  useEffect(() => {
    if (!offerData?._id) return router.push('/getoffer');
    const getPaymentInfo = async () => {
      const userOffer: any = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users-offers/${offerData._id}`
      );
      if (userOffer && !userOffer.contractSign && userOffer.filledInfo)
        return router.push('/getoffer?activeStep=1');
    };
    getPaymentInfo();
  }, []);
  const displayValue = solarData?.totalPayment.toFixed(2);
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
        const offerData: any = getDataFromSessionStorage('UserOffer');
        const response = await fetch('/api/payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token: token.id,
            amount: displayValue,
            offerId: offerData?._id
          })
        });
        const paymentResponse = await response.json();
        if (paymentResponse.status === 'succeeded') {
          setIsPaymentSuccess(true);
          window.location.href = '/getoffer?activeStep=3';
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
      <h1 className="text-lg md:2xl lg:text-3xl font-bold  mt-2 mb-8 text-center">
        {t('Your-offer.title')}: €{displayValue}
      </h1>
      <div className="rounded-3xl border border-[#E0E0E0] p-6">
        <p className="text-lg font-medium text-black">{t('Payment.title')}</p>
        <p className="text-[#667085] text-sm mb-8">{t('Payment.desc')}</p>
        <Grid container rowSpacing={3} columnSpacing={3}>
          {/* Name on card */}
          <Grid item xs={8} sm={12} md={8}>
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

          {/* Expire date */}
          <Grid item xs={4} sm={12} md={4}>
            <label className="">{t('Payment.expiry')}</label>
            <CardExpiryElement className="border border-[#E0E0E0] rounded-[8px] p-3 mt-1" />
          </Grid>
          {/* CARD number */}
          <Grid item xs={8} sm={12} md={8}>
            <label className="">{t('Payment.card-number')}</label>
            <CardNumberElement
              className="border border-[#E0E0E0] rounded-[8px] p-3 mt-1"
              options={{
                showIcon: true
              }}
            />
          </Grid>
          {/* CVV */}
          <Grid item xs={4} sm={12} md={4}>
            <label className="">{t('Payment.expiry')}</label>
            <CardCvcElement className="border border-[#E0E0E0] rounded-[8px] p-3 mt-1" />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {error && <p className="text-[#d32f2f]">{error}</p>}
          </Grid>
        </Grid>
      </div>
      <div className="mt-8 text-center">
        <NeosButton
          category="colored"
          title="PAY NOW"
          type="submit"
          disabled={!stripe || loading || error}
        />
      </div>
    </form>
  );
};

export default CheckoutForm;
