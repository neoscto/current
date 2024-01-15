"use client";
import {
  getDataFromSessionStorage,
  saveDataToSessionStorage,
} from "@/utils/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const useDocusignService = (formik: any, showForm: string) => {
  const clientId = process.env.NEXT_PUBLIC_DOCUSIGN_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_DOCUSIGN_AUTH_REDIRECT;

  const searchParams = useSearchParams();

  const [signingUrl, setSigningUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [userOffer, setUserOffer] = useState(null);
  const route = useRouter();
  useEffect(() => {
    (async () => {
      const code = searchParams.get("code");

      const offerData: any = getDataFromSessionStorage("UserOffer");
      if (formik && offerData) {
        const arrayData = Object.keys(offerData);
        arrayData.forEach((key: any) => {
          formik.setFieldValue(key, offerData[key]);
        });
      }
      if (code) {
        setLoading(true);
        try {
          setUserOffer(offerData);
          const response = await fetch("/api/docusign/auth", {
            method: "POST",
            body: JSON.stringify({ code, offerData }),
          });
          const data = await response.json();

          const handleMessage = (event: any) => {
            if (event.data === "changeRoute") {
              route.push("/getoffer?activeStep=2");
              setSigningUrl("");
            }
          };
          window.addEventListener("message", handleMessage);
          setSigningUrl(data.signingUrl);
        } catch (error) {
        } finally {
          setLoading(false);
          saveDataToSessionStorage("UserOffer", "");
        }
      }
    })();
  }, [searchParams, showForm]);

  const getAuthorizationUrl = () => {
    return `https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature&client_id=${clientId}&redirect_uri=${redirectUri}`;
  };

  const signature = () => {
    const authorizationUri = getAuthorizationUrl();
    window.location.href = authorizationUri;
  };
  return {
    loading,
    signingUrl,
    userOffer,
    signature,
    getAuthorizationUrl,
  };
};

export default useDocusignService;
