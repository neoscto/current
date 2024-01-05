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
import jsPDF from "jspdf";
import { pdfGenerate } from "./pdfGenerator";
import { setUserData } from "@/features/common/commonSlice";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";

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

  const [skipped, setSkipped] = useState<Set<number>>(new Set<number>());
  const [activeStep, setActiveStep] = useState(0);
  const [showForm, setShowForm] = useState<string>("allOffers");

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
    dispath(setUserData(formData));
  }, [formData]);

  const generatePDF = () => {
    pdfGenerate(formData);
  };

  return (
    <MainContainer>
      <div className="rounded-[30px] bg-[#01092299] max-w-[93%] md:max-w-[88%] lg:max-w-[83%] w-full mx-auto bg-white overflow-hidden">
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
                    <StepLabel {...labelProps}>{label}</StepLabel>
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
                  formData={formData}
                  handleChange={handleChange}
                  handleNext={handleNext}
                  showForm={showForm}
                  setShowForm={setShowForm}
                />
              )}
              {activeStep == 1 && (
                <ContractDetail handleNext={handleNext} formData={formData} />
              )}
              {activeStep == 2 && <Success generatePDF={generatePDF} />}
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
