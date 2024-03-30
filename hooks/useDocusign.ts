'use client';
import {
  getDataFromSessionStorage,
  saveDataToSessionStorage
} from '@/utils/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const useDocusignService = (formik: any) => {
  const clientId = process.env.NEXT_PUBLIC_DOCUSIGN_INTEGRATION_KEY;
  const redirectUri = process.env.NEXT_PUBLIC_DOCUSIGN_AUTH_REDIRECT;
  const [isPDFLoading, setIsPDFLoading] = useState(false);
  const searchParams = useSearchParams();

  const [signingUrl, setSigningUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [userOffer, setUserOffer] = useState<any>();
  const route = useRouter();
  useEffect(() => {
    (async () => {
      const code = searchParams.get('code');

      const userData: any = getDataFromSessionStorage('UserOffer');
      setUserOffer(userData);
      if (formik && userData) {
        const arrayData = Object.keys(userData);
        arrayData.forEach((key: any) => {
          formik.setFieldValue(key, userData[key]);
        });
      }
      if (code) {
        setLoading(true);
        try {
          // setUserOffer(offerData);
          const response = await fetch('/api/docusign/auth', {
            method: 'POST',
            body: JSON.stringify({ code, userData })
          });
          const { signingUrl, envelopeId, accessToken } = await response.json();
          // offerData.envelopeId = envelopeId;
          // setUserOffer(offerData);

          const handleMessage = async (event: any) => {
            if (event.data === 'changeRoute') {
              route.push('/getoffer?activeStep=2');
              setSigningUrl('');
            }
            if (event.data === 'gotToHomePage') {
              route.push('/');
            }
          };
          window.addEventListener('message', handleMessage);
          saveDataToSessionStorage('docusignAccessToken', accessToken);
          // saveDataToSessionStorage('UserOffer', offerData);
          setSigningUrl(signingUrl);
        } catch (error) {
        } finally {
          setLoading(false);
          // saveDataToSessionStorage("UserOffer", "");
        }
      }
    })();
  }, [searchParams]);

  const getAuthorizationUrl = () => {
    return `https://${process.env.NEXT_PUBLIC_DOCUSIGN_ACCOUNT}/oauth/auth?response_type=code&scope=signature&client_id=${clientId}&redirect_uri=${redirectUri}`;
  };

  const downloadPdf = async () => {
    try {
      setIsPDFLoading(true);
      const envelopeId = userOffer.envelopeId;
      const docusignAccessToken: any = getDataFromSessionStorage(
        'docusignAccessToken'
      );
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${docusignAccessToken}`
      };

      const url = `/api/docusign/download?envelopeId=${envelopeId}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: headers
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const blob = await response.blob();

      const link = document.createElement('a');

      link.download =
        userOffer.plan === 'neos'
          ? 'Contrato - Instalación Neos y Suministro Neos.pdf'
          : 'Contrato - Instalación Neos y Suministro Actual.pdf';

      link.href = window.URL.createObjectURL(blob);

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsPDFLoading(false);
    }
  };

  const signature = async () => {
    // const authorizationUri = getAuthorizationUrl();
    // window.location.href = authorizationUri;
    const offerData: any = getDataFromSessionStorage('UserOffer');
    setUserOffer(offerData);
    if (formik && offerData) {
      const arrayData = Object.keys(offerData);
      arrayData.forEach((key: any) => {
        formik.setFieldValue(key, offerData[key]);
      });
    }
    setLoading(true);
    try {
      // setUserOffer(offerData);
      const response = await fetch('/api/docusign/auth', {
        method: 'POST',
        body: JSON.stringify({ code: '', offerData })
      });
      const { signingUrl, envelopeId, accessToken } = await response.json();
      offerData.envelopeId = envelopeId;
      setUserOffer(offerData);

      // const handleMessage = (event: any) => {
      //   if (event.data === "changeRoute") {
      //     route.push("/getoffer?activeStep=2");
      //     setSigningUrl("");
      //   }
      //   if (event.data === "gotToHomePage") {
      //     route.push("/");
      //   }
      // };
      // window.addEventListener("message", handleMessage);
      saveDataToSessionStorage('docusignAccessToken', accessToken);
      saveDataToSessionStorage('UserOffer', offerData);
      setSigningUrl(signingUrl);
    } catch (error) {
    } finally {
      setLoading(false);
      // saveDataToSessionStorage("UserOffer", "");
    }
  };
  return {
    loading,
    signingUrl,
    userOffer,
    signature,
    getAuthorizationUrl,
    downloadPdf,
    isPDFLoading
  };
};

export default useDocusignService;
