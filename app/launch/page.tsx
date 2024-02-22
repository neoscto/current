"use client";
import React, { useState } from "react";
import NeosButton from "@/components/NeosButton";
import MainContainer from "@/components/sharedComponents/MainContainer";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import VideoPreview from "../videoPlayer/preview";
import Licensed from "@/components/Licensed";
import { useForm } from "@mantine/form";
import { Button, TextInput } from "@mantine/core";
import classes from "./launch.module.css";

type SubmitValue = {
  input: string;
};

const Launch = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const form = useForm({
    initialValues: {
      input: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: SubmitValue) => {
    setLoading(true);
    const response = await fetch("/api/collect-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: values.input,
      }),
    });
    form.reset();
    setLoading(false);
  };
  return (
    <MainContainer>
      <div className="flex flex-col items-center justify-center gap-5 text-center my-8 ">
        <div className=" w-11/12 md:w-[72%] mx-auto bg-[#01092299] text-white rounded-xl p-10">
          <h1 className=" text-3xl md:text-4xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mx-auto ">
            {t("launch.Pre_Sale_Launch")}
          </h1>

          <div className=" text-base md:text-xl font-normal my-6 md:my-12 md:px-9 flex flex-col justify-center items-center gap-3 xl:gap-4">
            <p>{t("launch.description1")}</p>

            <p>{t("launch.description2")}</p>

            <p>{t("launch.description3")}</p>

            <p>
              <u>
                <b>{t("launch.Exclusive_Early_Access")}:</b>
              </u>{" "}
              {t("launch.description4")}
            </p>
          </div>

          <form
            className=" flex flex-col sm:flex-row justify-center items-center sm:gap-8 gap-4 "
            onSubmit={form.onSubmit((values) =>
              handleSubmit(values as SubmitValue)
            )}
          >
            <TextInput
              className="px-8 border border-white rounded-md text-white bg-transparent flex justify-center items-center"
              classNames={{ input: classes.textInput }}
              size="md"
              placeholder={t("launch.Email_or_Phone_Number")}
              {...form.getInputProps("input")}
            />

            <Button
              type="submit"
              classNames={{ root: classes.root }}
              size="md"
              loading={loading}
            >
              <span className=" drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.4)] font-bold text-xl">
                {t("launch.SUBMIT")}
              </span>
            </Button>
          </form>
        </div>
        <Licensed />
      </div>
    </MainContainer>
  );
};

export default Launch;
