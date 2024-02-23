// create nextjs component to accept cookie
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import NeosButton from "./NeosButton";

const AcceptCookie = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cookieAccept = localStorage.getItem("cookieAccept");
      if (!cookieAccept) {
        setShow(true);
      }
    }
  }, []);

  const handleAccept = () => {
    setShow(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("cookieAccept", "true");
    }
  };

  return (
    <>
      {show && (
        <div className="fixed bottom-0 w-full bg-white bg-opacity-75 border-t border-gray-300 p-2 flex items-center justify-center text-sm">
          <p className="text-blue-900">{t("Home.cookie.description")}</p>
          <button
            onClick={handleAccept}
            className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
          >
            {t("Home.cookie.acceptBtn")}
          </button>
        </div>
      )}
    </>
  );
};

export default AcceptCookie;
