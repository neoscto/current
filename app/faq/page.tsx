"use client";
import { useState } from "react";
import MainContainer from "@/components/sharedComponents/MainContainer";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import parse from "html-react-parser";
import { useTranslation } from "react-i18next";
import { faqData } from "./faq.data";

const faq = () => {
  const [expandedId, setExpandedId] = useState("");
  const { t } = useTranslation();

  return (
    <MainContainer>
      <Box sx={{ width: "100%" }} marginBottom={6} marginTop={4}>
        <div className="rounded-[30px] bg-[#01092299] max-w-[93%] md:max-w-[88%] lg:max-w-[83%] w-full mx-auto bg-white">
          <div className="w-[94%] mx-auto py-6 md:py-9 lg:py-9 ">
            <Typography variant="h4" className="text-center" gutterBottom>
              {t("faq.title")}
            </Typography>
            <div
              style={{
                height: "lg:49vh md:60vh",
                // overflowY: "scroll",
                padding: "0.5rem",
              }}
              className="flex flex-wrap"
            >
              {faqData?.map((faq, index) => (
                <Accordion
                  expanded={expandedId === index.toString()}
                  key={index}
                  sx={accorSyle}
                  className="lg:max-w-[100%] md:max-w-[100%] sm:max-w-[100%] w-full"
                  onChange={() => {
                    setExpandedId(
                      expandedId === index.toString() ? "" : index.toString()
                    );
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index + 1}a-content`}
                    id={`panel${index + 1}a-header`}
                    sx={{ paddingRight: 0 }}
                  >
                    <Typography variant="h6">
                      {t(`faq.faqs.question${index}`)}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {parse(t(`faq.faqs.answer${index}`))}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </div>
        </div>
      </Box>
    </MainContainer>
  );
};

export default faq;

const accorSyle = {
  boxShadow: "none !important",
  transition: "none !important",
  position: "inherit !important",
};
