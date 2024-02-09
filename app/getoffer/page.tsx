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
import Congrats from "@/components/Congrats";

const steps = ["Receive Offer", "Sign Contract", "Enjoy Solar"];

interface FormData {
  numberOfPeople: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  dialCode: string;
  numberofpeopleAdditionValue: number;
}

const HorizontalLinearStepper = () => {
  const dispath = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeStep = searchParams.get("activeStep") || 0;

  // const handleSuccessResponce = (res: any) => {
  //   saveDataToSessionStorage("UserOffer", res.data);
  // };

  const formikInitialValues = {
    offerType: "",
    numberOfPeople: "",
    cups: "",
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    dialCode: "44",
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
  function handleSuccessResponce(res: any) {
    saveDataToSessionStorage("UserOffer", res.data);
    setShowForm("yourOffer");
    const arrayData = Object.keys(res.data);
    arrayData.forEach((key: any) => {
      formik.setFieldValue(key, res.data[key]);
    });
  }
  const { loading, signature, signingUrl, downloadPdf } =
    useDocusignService(formik);

  useEffect(() => {
    window.addEventListener("message", (event) => {
      if (event.data === "redirect_success_url") {
        window.location.href = "/getoffer?activeStep=2";
        window.removeEventListener("message", (event) => { });
      }
    });

  }, [signingUrl])


  const [skipped, setSkipped] = useState<Set<number>>(new Set<number>());

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
    dialCode: "44",
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

  // useEffect(() => {
  //   const fetchToken = async () => {
  //     if (params.get("code")) {
  //       const code = params.get("code");
  //       var options = {
  //         method: "POST",
  //         url: `${process.env.NEXT_PUBLIC_API_URL}/calendly?code=${code}`,
  //         headers: {
  //           "Content-Type": "application/x-www-form-urlencoded",
  //         },
  //       };
  //       const response: any = await axios.request(options);
  //       if (response && response.data && response.data.token) {
  //         saveDataToSessionStorage("calendlyToken", response.data.token);
  //         setShowForm("yourOffer");
  //       }
  //     }
  //   };
  //   fetchToken();
  // }, [params]);

  return (
    <MainContainer>
      <div className="xl:max-w-[1200px] max-w-[calc(100%_-_40px)] relative rounded-[30px] bg-[#01092299] w-full mx-auto bg-white overflow-hidden">
        <div className="flex items-center gap-x-[12px] absolute lg:top-[2em] lg:left-[20px] md:top-[20px] md:left-[20px] top-[10px] left-[10px]">
          <span onClick={() => handleFormBack()}>
            <ArrowBackIcon className=" cursor-pointer  lg:text-[30px] md:text-[30px] sm:text-[30px] text-[22px]" />
          </span>
        </div>
        <Box sx={{ width: "100%" }}>
          <div className="max-w-[630px] w-full mx-auto pt-[35px] pb-[26px]">
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
                        height: "36px",
                        alignItems: "center",
                      },
                      "@media (max-width: 700px)": {
                        "& .MuiStepLabel-root": {
                          flexDirection: "column",
                          height: "32px",
                        },
                        "& .MuiStepLabel-label": {
                          marginLeft: "-10px",
                          fontSize: ["10px", "12px"],
                        },
                        svg: {
                          paddingLeft: "2px",
                        },
                      },
                      "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                        fill: "#fff",
                      },
                      "& .MuiStepLabel-label": {
                        color: "#000",
                        fontSize: ["10px", "14px"],
                        fontWeight: 500,
                        marginTop: "4px",
                        textAlign: "center",
                        marginLeft: "0px",
                      },
                      svg: {
                        width: "30px",
                        height: "30px",

                        color: "#EAEAED",
                      },
                    }}
                  >
                    <StepLabel
                      {...labelProps}
                      className="w-12 pl-2 sm:w-24 md:w-auto flex item"
                    >
                      {t(label)}
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </div>
          {signingUrl || loading ? (
            signingUrl ? (
              <div className="w-full mx-auto mx-5 border-[2px]" >
                <iframe
                  src={signingUrl}
                  width="100%"
                  height="800px"
                  className="mt-4 p-6"
                ></iframe>
              </div>
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
                  generatePDF={downloadPdf}
                  setShowForm={setShowForm}
                  showForm={showForm}
                  signature={signature}
                />
              )}
              {Number(activeStep) == 3 && (
                <Congrats
                  generatePDF={downloadPdf}
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
