"use client";
import { Grid } from "@mui/material";
import { GetOfferCardData } from "@/utils/StaticData";
import NeosTextField from "@/components/NeosTextField";
import NeosButton from "@/components/NeosButton";
import YourOffer from "../youoffer/page";
import OfferCard from "./offerCard";

interface GetOfferProps {
  formData: any;
  handleChange: any;
  handleNext: any;
  setShowForm: any;
  showForm: any;
}

const GetOffer: React.FC<GetOfferProps> = ({
  formData,
  handleChange,
  handleNext,
  setShowForm,
  showForm,
}) => {
  const handleyourSaving = () => {
    if (
      formData?.firstName !== "" &&
      formData?.lastName !== "" &&
      formData?.numberOfPeople !== "" &&
      formData?.phoneNumber !== "" &&
      formData?.emailAddress !== ""
    ) {
      setShowForm("yourOffer");
    } else {
      alert("Please fill all data.");
    }
  };
  return (
    <>
      <div className=" w-[90%] md:w-[80%] lg:w-[60%] mx-auto pb-6 md:pb-9 lg:pb-9">
        {showForm == "soffer" && (
          <div className="w-[100%] md:w-[85%] lg:w-[85%]  mx-auto mt-6 md:mt-16 lg:mt-16 ">
            <h1 className="font-bold text-3xl mb-8 md:mb-11 lg:mb-11 text-center">
              Standard Offer
            </h1>
            <Grid container rowSpacing={3} columnSpacing={3}>
              <Grid item xs={12}>
                <NeosTextField
                  placeholder="Enter here"
                  label="Number of people living in house"
                  type="number"
                  value={formData.numberOfPeople}
                  onChange={handleChange("numberOfPeople")}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <NeosTextField
                  placeholder="Enter here"
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleChange("firstName")}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <NeosTextField
                  placeholder="Enter here"
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleChange("lastName")}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <NeosTextField
                  placeholder="Enter here"
                  label="Email Address"
                  value={formData.emailAddress}
                  onChange={handleChange("emailAddress")}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <NeosTextField
                  placeholder="Enter here"
                  label="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange("phoneNumber")}
                />
              </Grid>
            </Grid>
            <div className="text-center mt-8 md:mt-24 lg:mt-24">
              <NeosButton
                category="colored"
                title=" CALCULATE YOUR SAVINGS"
                onClick={() => handleyourSaving()}
              />
            </div>
          </div>
        )}

        {showForm == "poffer" && (
          <div className="w-[100%] md:w-[85%] lg:w-[85%]  mx-auto mt-6 md:mt-16 lg:mt-16 ">
            <h1 className="font-bold text-3xl mb-8 md:mb-11 lg:mb-11 text-center">
              Personalized Offer
            </h1>
            <Grid container rowSpacing={3} columnSpacing={3}>
              <Grid item xs={12}>
                <NeosTextField placeholder="Enter here" label="CUPS" />
                <p className="font-sm text-[#2D9CDB] mt-1">
                  You can find your CUPS number in any of your electricity bills
                </p>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <NeosTextField
                  placeholder="Enter here"
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleChange("firstName")}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <NeosTextField
                  placeholder="Enter here"
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleChange("lastName")}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <NeosTextField
                  placeholder="Enter here"
                  label="Email Address"
                  value={formData.emailAddress}
                  onChange={handleChange("emailAddress")}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <NeosTextField
                  placeholder="Enter here"
                  label="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange("phoneNumber")}
                />
              </Grid>
            </Grid>
            <div className="text-center mt-8 md:mt-24 lg:mt-24">
              <NeosButton
                category="colored"
                title=" CALCULATE YOUR SAVINGS"
                onClick={() => setShowForm("yourOffer")}
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
                  <OfferCard Data={item} setShowForm={setShowForm} />
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
