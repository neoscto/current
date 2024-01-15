"use client";
import React, { useCallback, useEffect, useState } from "react";
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import useDocusignService from "@/hooks/useDocusign";
import { saveDataToSessionStorage } from "@/utils/utils";
import { CircularProgress } from "@mui/material";

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
  const pathname = usePathname();

  const handleSuccessResponce = (res: any) => {
    saveDataToSessionStorage("UserOffer", res.data);
  };

  const formikInitialValues = {
    offerType: "",
    numberOfPeople: "",
    cups: "",
    firstName: "",
    lastName:  "",
    emailAddress:  "",
    phoneNumber: "",
    numberofpeopleAdditionValue: 1,
  };
  const [showForm, setShowForm] = useState<string>("allOffers");

  const [formik, isLoading]: any = useHandleForm({
    method: "POST",
    apiEndpoint: "/api/users-offers",
    formikInitialValues,
    validationSchema: offerStep1Schema,
    handleSuccessResponce,
    
  });
  const { loading, getAuthorizationUrl, signature, signingUrl } =
    useDocusignService(formik,showForm);

  const searchParams = useSearchParams();
  const [skipped, setSkipped] = useState<Set<number>>(new Set<number>());
  const activeStep = searchParams.get("activeStep") || 0;
  const { formBack }: any = useSelector(
    (state: RootState) => state.commonSlice
  );
  const { t } = useTranslation();
  const params = new URLSearchParams(searchParams.toString());
  const isStepOptional = (step: number): boolean => {
    return step === 1;
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const isStepSkipped = (step: number): boolean => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(Number(activeStep))) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(Number(activeStep));
    }

    router.push(
      pathname +
        "?" +
        createQueryString("activeStep", (Number(activeStep) + 1).toString())
    );
    setSkipped(newSkipped);
  };

  const handleBack = (): void => {
    router.push(
      pathname +
        "?" +
        createQueryString("activeStep", (Number(activeStep) - 1).toString())
    );
  };
  const handleSkip = (): void => {
    if (!isStepOptional(Number(activeStep))) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    router.push(
      pathname +
        "?" +
        createQueryString("activeStep", (Number(activeStep) + 1).toString())
    );
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(Number(activeStep));
      return newSkipped;
    });
  };

  const handleReset = (): void => {
    router.push(
      pathname + "?" + createQueryString("activeStep", (0).toString())
    );
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
      router.push(pathname + "?" + createQueryString("activeStep", "1"));
      setShowForm("emailSuccess");
      return;
    }
    if (showForm === "yourOffer") {
      setShowForm(formBack === "backpoffer" ? "poffer" : "soffer");
      return;
    }
    if (showForm === "yourDetails") {
      router.push(pathname + "?" + createQueryString("activeStep", "0"));
      setShowForm("yourOffer");
      return;
    }
    if (showForm === "emailSuccess" && formBack === "emailDetails") {
      setShowForm("yourDetails");
      return;
    }
    router.back();
  };

  useEffect(() => {
    const fetchToken = async () => {
      if (params.get("code")) {
        const code = params.get("code");
        var options = {
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_API_URL}/calendly?code=${code}`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        };
        const response: any = await axios.request(options);
        if (response && response.data && response.data.token) {
          saveDataToSessionStorage("calendlyToken", response.data.token);
          setShowForm("yourOffer");
        }
      }
    };
    fetchToken();
  }, [params]);

  return (
    <MainContainer>
      <div className="relative rounded-[30px] bg-[#01092299] max-w-[93%] md:max-w-[88%] lg:max-w-[83%] w-full mx-auto bg-white overflow-hidden">
        <div className="flex items-center gap-x-[12px] absolute lg:top-[2em] lg:left-[1.8em] md:top-[2em] md:left-[2em] top-[1.5em] left-[0.4em]">
          <span onClick={() => handleFormBack()}>
            <ArrowBackIcon
              className=" cursor-pointer "
              sx={{ fontSize: "30px" }}
            />
          </span>
        </div>
        <Box sx={{ width: "100%" }}>
          <div className="w-[90%] md:w-[80%] lg:w-[60%] ml-auto md:mx-auto py-6 md:py-9 lg:py-9">
            <Stepper activeStep={Number(activeStep)}>
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
          {signingUrl || loading ? (
            signingUrl ? (
              <iframe src={signingUrl} width="100%" height="800px"></iframe>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}
              >
                <CircularProgress />
              </div>
            )
          ) : activeStep === steps.length ? (
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
              {Number(activeStep) == 0 && (
                <GetOffer
                  formik={formik}
                  handleChange={handleChange}
                  handleNext={handleNext}
                  showForm={showForm}
                  setShowForm={setShowForm}
                  signature={signature}
                />
              )}
              {Number(activeStep) == 1 && (
                <ContractDetail
                  handleNext={handleNext}
                  formik={formik}
                  showForm={showForm}
                  setShowForm={setShowForm}
                  signature={signature}
                />
              )}
              {Number(activeStep) == 2 && (
                <Success
                  generatePDF={generatePDF}
                  setShowForm={setShowForm}
                  showForm={showForm}
                  signature={signature}
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
