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
      question: "What is Neos?",
      answer:
        "Neos allows customers based in Spain to own solar panels in solar parks and receive renewable energy directly to their home or business through the country’s power grid, without the need for rooftop installations.",
    },
    {
      question: "How do I purchase solar panels from Neos?",
      answer: "Simply estimate your required capacity on our website, complete the purchase process, and we’ll handle your contract switching so you can receive electricity from us starting on the first day of the next month."
    },
    {
      question: "Can I still benefit from Neos if I don’t have a suitable rooftop for solar panels?",
      answer: "Absolutely! Our model is designed for everyone, offering access to solar energy without the need for a personal rooftop. You can move houses and still receive electricity from those same panels."
    },
    {
      question: "What are the benefits of choosing Neos panels, instead of rooftop panels?",
      answer: "Investing in Neos panels means enjoying one of the cheapest sources of energy, namely solar energy. Compared to rooftop panels, each Neos panel costs much less and produces much more thanks to the economies of scale and technological expertise achieved by our solar farms. You also don’t need to have a rooftop or live in a sunny area. Finally, no installation is required, so you don’t wait for months before consuming your generated electricity."
    },
    {
      question: "What are the costs involved in buying solar panels from Neos?",
      answer: "Prices range from €1,300 to €1,600 per KW, depending on the number of panels purchased, ensuring additional economies of scale for larger business customers. On top of that, we must charge the usual 21% VAT required by law."
    },
    {
      question: "What are the benefits of choosing Neos as my electricity provider, on top of having Neos panels?",
      answer: "When your panels aren’t generating electricity, like at nighttime, we supply you with electricity from the grid at wholesale cost plus necessary grid-related fees and taxes, without adding any profit margin. This ensures you always get the best price possible regardless of whether you are a small household or a large business."
    },
    {
      question: "Can I keep my current electricity provider and still use Neos?",
      answer: "Yes, you have the flexibility to choose Neos panels while maintaining your existing electricity provider if desired. However, they will charge you a profit margin on the electricity they provide you, unlike Neos."
    },
    {
      question: "How does Neos price the electricity it provides?",
      answer: "When your panels are generating electricity, you will consume it at €0.00 per KW plus necessary grid-related fees and taxes, because you own the panels generating that electricity. When your panels aren’t generating electricity, you will consume electricity at the wholesale rate plus necessary grid-related fees and taxes, without any profit margin, to guarantee you the lowest cost."
    },
    {
      question: "Do I make money if my solar panels generate more electricity than I use?",
      answer: `Yes. Neos takes care of feeding your excess electricity back into the grid, earning you revenue everyday. When you buy Neos panels, there are two possible scenarios:
      <br />
      1) Neos is your electricity provider: your monthly bills with us will further decrease thanks to your monthly revenue.
      <br />
      2) Neos isn’t your electricity provider: you will receive a yearly bank transfer of your revenues.`
    },
    {
      question: "What is the expected payback period for investing in solar panels with Neos?",
      answer: "The average payback period is around 7 years, after which you continue to save on your electricity bill for the 25-year lifespan of your panels. If you were to buy rooftop panels, your payback period would have been twice longer."
    },
    {
      question: "How long does it take to connect my purchased panels to the grid?",
      answer: "Your Neos panels will be connected to the grid immediately upon purchase. Technically, you could receive electricity from them the minute you sign your contract with us, as opposed to months of waiting time when you buy rooftop panels. However, for logistical efficiency and regulatory purposes, your contract will become active on the first day of the next month, so that’s when you will start receiving your electricity."
    },
    {
      question: "How long will my solar panels last?",
      answer: "Our solar panels are designed to last 25 years, just like rooftop panels, providing long-term renewable energy with minimal maintenance. Also, the maintenance is on us."
    },
    {
      question: "What guarantees does Neos offer for the operation and maintenance of solar parks?",
      answer: "Neos guarantees optimal operation and maintenance of the solar parks where your panels are for 25 years, ensuring your investment is secure and productive."
    },
    {
      question: "How clean and renewable is the electricity supplied by Neos?",
      answer: "The electricity you consume when your solar panels are productive is 100% renewable solar energy, contributing to a greener future. The electricity you consume from the power grid when your solar panels aren’t productive, like at nighttime, is sourced from the country’s energy mix at that specific time."
    },
    {
      question: "Can I monitor the performance of my solar panels?",
      answer: "Yes, customers have access to our platform where they can track the performance and output of their solar panels online. Also, they can monitor their revenue, consumption, and spending at any time, as opposed to receiving an incomprehensible energy bill on a monthly basis."
    },
    {
      question: "How do I get started with Neos?",
      answer: "Starting is easy: visit our website, estimate the solar panel capacity that fits your needs, sign your contract, and pay for your extra awesome panels, all within 10 minutes. Welcome to the future of energy!"
    }
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
                  className="lg:max-w-[100%] md:max-w-[100%] sm:max-w-[100%]"
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index + 1}a-content`}
                    id={`panel${index + 1}a-header`}
                  >
                    <Typography variant="h6">{faq?.question || ""}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography> <p
                      className={``}
                      dangerouslySetInnerHTML={{ __html: faq?.answer || "" }}
                    />
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
