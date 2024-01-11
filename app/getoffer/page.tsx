"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MainContainer from "@/components/sharedComponents/MainContainer";
import GetOffer from "./GetOffer";
import ContractDetail from "../contractDetail/page";
import Success from "../success/page";
import { pdfGenerate } from "./pdfGenerator";
import { setUserData } from "@/features/common/commonSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import useHandleForm from "@/hooks/useHandleForm";
import { offerStep1Schema } from "@/utils/validations/offers.validation";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const steps = ["Receive Offer", "Sign Contract", "Enjoy Solar"];

interface FormData {
  numberOfPeople: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  numberofpeopleAdditionValue: number;
}

const HorizontalLinearStepper = () => {
  const dispath = useDispatch<AppDispatch>();
  const router = useRouter();
  const formikInitialValues = {
    offerType: "",
    numberOfPeople: "",
    cups: "",
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    numberofpeopleAdditionValue: 1,
  };

  const handleSuccessResponce = (res: any) => {};
  const [formik, isLoading]: any = useHandleForm({
    method: "POST",
    apiEndpoint: "/api/users-offers",
    formikInitialValues,
    validationSchema: offerStep1Schema,
    handleSuccessResponce,
  });

  const [skipped, setSkipped] = useState<Set<number>>(new Set<number>());
  const [activeStep, setActiveStep] = useState(0);
  const [showForm, setShowForm] = useState<string>("allOffers");
  const { formBack }: any = useSelector(
    (state: RootState) => state.commonSlice
  );
  const { t } = useTranslation();

  const isStepOptional = (step: number): boolean => {
    return step === 1;
  };

  const isStepSkipped = (step: number): boolean => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = (): void => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = (): void => {
    setActiveStep(0);
  };

  const [formData, setFormData] = useState<FormData>({
    numberOfPeople: "",
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    numberofpeopleAdditionValue: 1,
  });

  const handleChange = (key: string) => (event: any) => {
    if (key === "numberOfPeople") {
      setFormData((prevData) => ({
        ...prevData,
        [key]: event.target.value.toString(),
        ["numberofpeopleAdditionValue"]: event.target.value.toString(),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [key]: event.target.value,
      }));
    }
  };

  useEffect(() => {
    dispath(setUserData(formik.values));
  }, [formik.values]);

  const generatePDF = () => {
    pdfGenerate(formik.values);
  };
  const handleFormBack = () => {
    if (showForm === "poffer" || showForm === "soffer") {
      setShowForm("allOffers");
      return;
    }
    if (showForm === "paymentForm") {
      setActiveStep(1);
      setShowForm("emailSuccess");
      return;
    }
    if (showForm === "yourOffer") {
      setShowForm(formBack === "backpoffer" ? "poffer" : "soffer");
      return;
    }
    if (showForm === "yourDetails") {
      setActiveStep(0);
      setShowForm("yourOffer");
      return;
    }
    if (showForm === "emailSuccess" && formBack === "emailDetails") {
      setShowForm("yourDetails");
      return;
    }
    router.back();
  };

  return (
    <MainContainer>
      <div className="relative rounded-[30px] bg-[#01092299] max-w-[93%] md:max-w-[88%] lg:max-w-[83%] w-full mx-auto bg-white overflow-hidden">
        <div className="flex items-center gap-x-[12px] absolute lg:top-[2.25em] lg:left-[2em] md:top-[2.25em] md:left-[2em] top-[1.5em] left-[0.3em]">
          <span onClick={() => handleFormBack()}>
            <ArrowBackIcon
              className=" cursor-pointer "
              sx={{ fontSize: "30px" }}
            />
          </span>
        </div>
        <Box sx={{ width: "100%" }}>
          <div className=" w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-6 md:py-9 lg:py-9">
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                  optional?: React.ReactNode;
                } = {};
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step
                    key={label}
                    {...stepProps}
                    sx={{
                      "& .MuiStepLabel-root": {
                        flexDirection: ["column", "row"],
                      },
                      "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                        fill: "#fff",
                      },
                      "& .MuiStepLabel-label": {
                        color: "#000",
                        fontSize: ["12px", "14px"],
                        fontWeight: 500,
                      },
                      svg: {
                        width: "30px",
                        height: "30px",
                        color: "#EAEAED",
                      },
                    }}
                  >
                    <StepLabel {...labelProps}>{t(label)}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </div>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {activeStep == 0 && (
                <GetOffer
                  formik={formik}
                  handleChange={handleChange}
                  handleNext={handleNext}
                  showForm={showForm}
                  setShowForm={setShowForm}
                />
              )}
              {activeStep == 1 && (
                <ContractDetail
                  handleNext={handleNext}
                  formik={formik}
                  showForm={showForm}
                  setShowForm={setShowForm}
                />
              )}
              {activeStep == 2 && (
                <Success
                  generatePDF={generatePDF}
                  setShowForm={setShowForm}
                  showForm={showForm}
                />
              )}
              {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button 
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box> */}
            </React.Fragment>
          )}
        </Box>
      </div>
    </MainContainer>
  );
};

export default HorizontalLinearStepper;
