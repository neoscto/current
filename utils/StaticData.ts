export const descriptionList: { [key: string]: string }[] = [
  { point1: "Significant Cost Savings", point1Description: 'Up to 80% reduction in electricity bills, and up to 35% cheaper than rooftop solar installations.' },
  { point2: "Access Anywhere, Instantly", point2Description: 'Instant connection to the grid. No rooftop panel or any kind of installation required.' },
  { point3: "Financial Return", point3Description: 'Payback period of around 6.9 years, compared to 14 years for rooftop panels.' },
  { point4: "Long-Term Renewable Energy", point4Description: 'Solar panels have a 25-year useful life, providing 100% renewable energy.' },
];

export const GetOfferCardData: {
  is_premium: boolean;
  title: string;
  desc: string;
  feature: string[];
}[] = [
    {
      is_premium: true, // false
      title: "Personalized Offer", // switched
      desc: "100% accuracy based on your actual consumption",
      feature: ["Instant calculation", "Answer one question", "Exact offer"]
    },
    {
      is_premium: false, // true
      title: "Standard Offer",
      desc: "85% accuracy based on your estimated consumption",
      feature: ["Instant calculation", "Answer one question", "Approximate offer"]
    },
  ];

export const HowItWorksList: { [key: string]: string }[] = [
  {
    point1:
      "Neos becomes your retailer and uses the grid system to transport the electricity generated by your solar panels into your home.",
  },
  {
    point2:
      "During solar production hours, you will pay €0.00 for the energy you consume.",
  },
  {
    point3:
      "If there’s excess production, Neos will sell 100% of the excess to the electricity market.",
  },
  {
    point4:
      "Outside of solar production hours you will pay the market price of electricity, with a margin of €0.01 per kWh.",
  },
  {
    point5:
      "You will need to pay tolls and costs associated with using the grid, estimated at €0.02 per kWh.",
  },
  {
    point6:
      "If you decide you do not want Neos as your retailer, there’s no commitment to stay with us, and you can choose another retailer at any point.",
  },
  {
    point7:
      "If you choose another retailer, we will send you every month the revenues generated by selling your solar energy into the electricity market, which is equivalent to the savings you would obtain if you were still with Neos.",
  },
];
export const CompareOfferList: { [key: string]: string }[] = [
  { point1: "Cheaper than rooftop solar panels." },
  {
    point2:
      "More energy production per panel compared to rooftop solar panels.",
  },
  { point3: "Savings compared to traditional utility providers." },
  { point4: "Less carbon intensive than traditional utility providers." },
];
