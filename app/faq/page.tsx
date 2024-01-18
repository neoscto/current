"use client";
import MainContainer from "@/components/sharedComponents/MainContainer";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faq = () => {
  const faqData = [
    {
      question: "Why should I go solar?",
      answer:
        "The benefits of solar energy span everything from significant financial savings to reducing your impact on the climate. You'll increase your home's value by installing a solar system on your home.",
    },
    {
      question: "What are the financial benefits of solar energy?",
      answer:
        "When you install a solar energy system on your property, you save money on your electricity bills and protect yourself against rising electricity rates in the future. How much you can save depends on your area's utility rates and solar policies, but going solar is a wise investment regardless of where you live.",
    },
    {
      question: "What are the environmental benefits of solar energy?",
      answer:
        "Like other renewable energy resources, solar power has many environmental and health benefits. Going solar reduces greenhouse gas emissions, which contribute to climate change, and results in fewer air pollutants like sulfur dioxide and particulate matter, which can cause health problems.",
    },
    {
      question: "How do I find out how much I pay for electricity?",
      answer:
        "The easiest way to find out how much you pay for electricity (and how much electricity you use per month) is to take a look at your utility electricity bill—Review EnergySage's guide to reading your electricity bill to find out exactly what to look for.",
    },
    {
      question: "How does solar impact my property values?",
      answer:
        "Studies have shown that homes with solar energy systems sell for more than homes without them. However, your property value will only increase if you own, rather than lease, your solar panel system. Going solar will increase your property value more than a kitchen renovation in most parts of the country. We covered everything you need to know about selling your house with solar and the most important questions to ask your real estate agent before selling your home with solar panels.",
    },
    {
      question: "What are the financial benefits of solar energy?",
      answer:
        "When you install a solar energy system on your property, you save money on your electricity bills and protect yourself against rising electricity rates in the future. How much you can save depends on your area's utility rates and solar policies, but going solar is a wise investment regardless of where you live.",
    },
    {
      question: "What are the financial benefits of solar energy?",
      answer:
        "When you install a solar energy system on your property, you save money on your electricity bills and protect yourself against rising electricity rates in the future. How much you can save depends on your area's utility rates and solar policies, but going solar is a wise investment regardless of where you live.",
    },
    {
      question: "What are the financial benefits of solar energy?",
      answer:
        "When you install a solar energy system on your property, you save money on your electricity bills and protect yourself against rising electricity rates in the future. How much you can save depends on your area's utility rates and solar policies, but going solar is a wise investment regardless of where you live.",
    },
    {
      question: "What are the financial benefits of solar energy?",
      answer:
        "When you install a solar energy system on your property, you save money on your electricity bills and protect yourself against rising electricity rates in the future. How much you can save depends on your area's utility rates and solar policies, but going solar is a wise investment regardless of where you live.",
    },
    {
      question: "What are the financial benefits of solar energy?",
      answer:
        "When you install a solar energy system on your property, you save money on your electricity bills and protect yourself against rising electricity rates in the future. How much you can save depends on your area's utility rates and solar policies, but going solar is a wise investment regardless of where you live.",
    },
    // Add more FAQ items as needed
  ];
  return (
    <MainContainer>
      <Box sx={{ width: "100%" }}>
        <div className="rounded-[30px] bg-[#01092299] max-w-[93%] md:max-w-[88%] lg:max-w-[83%] w-full mx-auto bg-white">
          <div className="w-[94%] mx-auto py-6 md:py-9 lg:py-9 ">
            <Typography variant="h4" className="text-center" gutterBottom>
              Frequently Asked Questions
            </Typography>
            <div
              style={{
                height: "49vh",
                // overflowY: "scroll",
                padding: "0.5rem",
              }}
              className="flex flex-wrap scroll-bar"
            >
              {faqData?.map((faq, index) => (
                <Accordion
                  key={index}
                  sx={accorSyle}
                  className="lg:max-w-[50%] md:max-w-[50%] sm:max-w-[100%]"
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index + 1}a-content`}
                    id={`panel${index + 1}a-header`}
                  >
                    <Typography variant="h6">{faq?.question || ""}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{faq?.answer || ""}</Typography>
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
