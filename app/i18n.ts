import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import translationEnglish from "@/public/Translation/English/translation.json";
import translationSpanish from "@/public/Translation/Spanish/translation.json";
import translationPortuguese from "@/public/Translation/Portuguese/translation.json";

const resources = {
  en: {
    translation: translationEnglish,
  },
  es: {
    translation: translationSpanish,
  },
  pt: {
    translation: translationPortuguese,
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "es",
});
