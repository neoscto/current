import { useState } from "react";
import { FormikState, FormikValues, useFormik } from "formik";
import { InferType } from "yup";

interface HandleFormType {
  method: string;
  apiEndpoint: string;
  formikInitialValues: FormikValues;
  validationSchema: any | (() => any);
  handleSuccessResponce(res: any): void;
}

export default function useHandleForm({
  method,
  apiEndpoint,
  formikInitialValues,
  validationSchema,
  handleSuccessResponce = (res) => {},
}: HandleFormType) {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: formikInitialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: (values, { resetForm }) => {
      switch (method) {
        case "POST":
          POST(values, resetForm);
          break;

        default:
          break;
      }
    },
  });

  async function POST(
    value: any,
    resetForm: (nextState?: Partial<FormikState<{}>> | undefined) => void
  ) {
    setIsLoading(true); // Loading Start
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: JSON.stringify(value),
      });
      const data = await response.json();
      if (data?.type === "validationError") {
        const validationError: InferType<typeof validationSchema> = data?.error;
        const arrayData = Object.keys(data?.error);
        arrayData.forEach((errorForm) =>
          formik.setFieldError(errorForm, validationError[errorForm])
        );
      } else {
        resetForm();
      }
      if (handleSuccessResponce && data?.status === "success")
        handleSuccessResponce(data);
      return data;
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false); // Loading End
    }
  }

  return [formik, isLoading];
}
