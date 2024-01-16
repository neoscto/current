"use client";
import { Grid } from "@mui/material";
import { GetOfferCardData } from "@/utils/StaticData";
import NeosTextField from "@/components/NeosTextField";
import NeosButton from "@/components/NeosButton";
import YourOffer from "../youoffer/page";
import OfferCard from "./offerCard";
import { useTranslation } from "react-i18next";
// import axios from "axios";

interface GetOfferProps {
  formik: any;
  handleChange: any;
  handleNext: any;
  setShowForm: any;
  showForm: any;
  signature: any;
}

const GetOffer: React.FC<GetOfferProps> = ({
  formik,
  handleChange,
  handleNext,
  setShowForm,
  showForm,
  signature,
}) => {
  const handleyourSaving = async () => {
    formik.handleSubmit();
    // setShowForm("yourOffer");
  };
  const chooseOfferType = async (type: string) => {
    switch (type) {
      case "soffer":
        formik.setFieldValue("offerType", "Standard");
        break;
      case "poffer":
        formik.setFieldValue("offerType", "Personalised");
        break;
      default:
        break;
    }
    setShowForm(type);
    // formik.setErrors({});
  };
  const { t } = useTranslation();
  return (
    <>
      <div className=" w-[90%] md:w-[80%] lg:w-[60%] mx-auto pb-6 md:pb-9 lg:pb-9">
        {showForm == "soffer" && (
          <div className="w-[100%] md:w-[85%] lg:w-[85%]  mx-auto mt-6 md:mt-16 lg:mt-16 ">
            <h1 className="font-bold text-3xl mb-8 md:mb-11 lg:mb-11 text-center">
              {t("Get-offer.Standard Offer")}
            </h1>
            <Grid container rowSpacing={3} columnSpacing={3}>
              <Grid item xs={12}>
                <NeosTextField
                  placeholder={t("Get-offer-form.form-placeholder")}
                  label={t("Get-offer-form.field-label1")}
                  type="number"
                  name="numberOfPeople"
                  value={formik.values.numberOfPeople}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.numberOfPeople)}
                  helperText={t(formik.errors.numberOfPeople)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <NeosTextField
                  placeholder={t("Get-offer-form.form-placeholder")}
                  label={t("Get-offer-form.first-name")}
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.firstName)}
                  helperText={t(formik.errors.firstName)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <NeosTextField
                  placeholder={t("Get-offer-form.form-placeholder")}
                  label={t("Get-offer-form.last-name")}
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.lastName)}
                  helperText={t(formik.errors.lastName)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <NeosTextField
                  placeholder={t("Get-offer-form.form-placeholder")}
                  label={t("Get-offer-form.email")}
                  name="emailAddress"
                  value={formik.values.emailAddress}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.emailAddress)}
                  helperText={t(formik.errors.emailAddress)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <NeosTextField
                  placeholder={t("Get-offer-form.form-placeholder")}
                  label={t("Get-offer-form.phone")}
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.phoneNumber)}
                  helperText={t(formik.errors.phoneNumber)}
                />
              </Grid>
            </Grid>
            <div className="text-center mt-8 md:mt-24 lg:mt-24">
              <NeosButton
                category="colored"
                title={t("Calculate-saving-btn")}
                onClick={() => handleyourSaving()}
              />
            </div>
          </div>
        )}

        {showForm == "poffer" && (
          <div className="w-[100%] md:w-[85%] lg:w-[85%]  mx-auto mt-6 md:mt-16 lg:mt-16 ">
            <h1 className="font-bold text-3xl mb-8 md:mb-11 lg:mb-11 text-center">
              {t("Get-offer.Personalised Offer")}
            </h1>
            <Grid container rowSpacing={3} columnSpacing={3}>
              <Grid item xs={12}>
                <NeosTextField
                  placeholder={t("Get-offer-form.form-placeholder")}
                  label={t("Get-offer-form.cups")}
                  type="number"
                  name="cups"
                  value={formik.values.cups}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.cups)}
                  helperText={t(formik.errors.cups)}
                />
                <p className="font-sm text-[#2D9CDB] mt-1">
                  {t("Get-offer-form.field-desc")}
                </p>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <NeosTextField
                  placeholder={t("Get-offer-form.form-placeholder")}
                  label={t("Get-offer-form.first-name")}
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.firstName)}
                  helperText={t(formik.errors.firstName)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <NeosTextField
                  placeholder={t("Get-offer-form.form-placeholder")}
                  label={t("Get-offer-form.last-name")}
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.lastName)}
                  helperText={t(formik.errors.lastName)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <NeosTextField
                  placeholder={t("Get-offer-form.form-placeholder")}
                  label={t("Get-offer-form.email")}
                  name="emailAddress"
                  value={formik.values.emailAddress}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.emailAddress)}
                  helperText={t(formik.errors.emailAddress)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <NeosTextField
                  placeholder={t("Get-offer-form.form-placeholder")}
                  label={t("Get-offer-form.phone")}
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.phoneNumber)}
                  helperText={t(formik.errors.phoneNumber)}
                />
              </Grid>
            </Grid>
            <div className="text-center mt-8 md:mt-24 lg:mt-24">
              <NeosButton
                category="colored"
                title={t("Calculate-saving-btn")}
                onClick={() => handleyourSaving()}
              />
            </div>
          </div>
        )}
        {showForm == "allOffers" && (
          <div className="my-11 lg:my-12">
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              direction={{ xs: "column-reverse", sm: "row" }}
            >
              {GetOfferCardData.map((item, index) => (
                <Grid item xs={12} sm={6} md={6} key={index}>
                  <OfferCard Data={item} setShowForm={chooseOfferType} />
                </Grid>
              ))}
            </Grid>
          </div>
        )}
      </div>
      {showForm == "yourOffer" && <YourOffer handleNext={handleNext} />}
    </>
  );
};

export default GetOffer;
