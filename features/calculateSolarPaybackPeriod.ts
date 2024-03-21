import axios, { AxiosResponse } from 'axios';
import test from 'node:test';

// Constants

const WEBTOKEN: string =
  'SURHISHED9OHW27HLUHNLy(nfnl1i28swi9oFLIUEHW7HLggI347YRWUFLWUFWg';

interface PowerPrices {
  [key: string]: {
    P1: number;
    P2: number;
    P3: number;
    P4: number;
    P5: number;
    P6: number;
  };
}

const POWER_PRICES: PowerPrices = {
  '2.0TD': {
    P1: 25.383055,
    P2: 1.342713,
    P3: 0.0,
    P4: 0.0,
    P5: 0.0,
    P6: 0.0
  },
  '3.0TD': {
    P1: 13.982509,
    P2: 11.899074,
    P3: 4.002045,
    P4: 3.653973,
    P5: 2.732707,
    P6: 2.001136
  },
  '6.1TD': {
    P1: 13.982509,
    P2: 11.899074,
    P3: 4.002045,
    P4: 3.653973,
    P5: 2.732707,
    P6: 2.001136
  },
  '6.2TD': {
    P1: 15.826387,
    P2: 14.660345,
    P3: 6.24435,
    P4: 4.918409,
    P5: 1.197731,
    P6: 0.751653
  },
  '6.3TD': {
    P1: 11.693507,
    P2: 10.378653,
    P3: 5.456201,
    P4: 4.251289,
    P5: 1.146336,
    P6: 0.789272
  },
  '6.4TD': {
    P1: 9.330085,
    P2: 7.722984,
    P3: 3.913267,
    P4: 3.073874,
    P5: 0.67228,
    P6: 0.497567
  },
  '3.0TDVE': {
    P1: 2.558984,
    P2: 2.503926,
    P3: 0.66441,
    P4: 0.573622,
    P5: 0.338303,
    P6: 0.338303
  },
  '6.1TDVE': {
    P1: 4.269983,
    P2: 4.002324,
    P3: 1.994267,
    P4: 1.599721,
    P5: 0.113126,
    P6: 0.113126
  }
};
const SEVILLA_HSP: number = 5.98; // Based on research
const SYSTEM_EFFICIENCY: number = 0.75; // Based on research
const YEARLY_FIXED_CHARGE_PEOPLE_FACTOR: number =
  (80.18 / 1.24 + 131.76 / 2.19 + 184.41 / 3.28) / 3; // Approximation from research
const DAYS_IN_YEAR: number = 365.25;
const MONTHS_IN_YEAR: number = 12;
const DAYS_IN_MONTH: number = DAYS_IN_YEAR / MONTHS_IN_YEAR;
const YEARS_IN_CONTRACT: number = 25;
const PRICE_TIERS: Array<[number, number]> = [
  [10, 1600],
  [100, 1500],
  [1000, 1400],
  [Infinity, 1300]
];
const PRICE_PER_KWH_SOLAR: number = 0;
const NEOS_VAT_PERCENT: number = 0.21;
const NEOS_PVOUT_IN_KWH_PER_KW: number = 2250 * 0.8 + 2100 * 0.2;
const AVERAGE_CONSUMPTION_PER_PERSON_PER_DAY: number = 3.25; // Based on research
const PANELS_PER_KW: number = 1 / 0.44;
const INFLATION_PERCENT: number = 0.03; // Approximation from research
const ROOFTOP_GRID_COVERAGE_PERCENT = 0.5 // Approximation from research 
const NEOS_GRID_COVERAGE_PERCENT = 0.34 // Sample result from quantitative research
const GRID_RELATED_COSTS: number = 0.03; // Approximation from research
const GRID_TAX_PERCENT: number = 0.1;
const ROOFTOP_PRICE: number = (1667 + 1942) / 2; // Based on research
const ROOFTOP_MAINTENANCE_PER_MONTH: number = 3; // Based on research
const ROOFTOP_VAT_PERCENT: number = 0.21;
const ROOFTOP_PVOUT_IN_KWH_PER_KW: number = 1510; // Based on research
const SOLAR_PARK_PRODUCTIVITY_BOOST: number =
  NEOS_PVOUT_IN_KWH_PER_KW / ROOFTOP_PVOUT_IN_KWH_PER_KW;
const MAINTENANCE_FEE_PER_MONTH_PER_KW: number = 1.5;
const TOTAL_CONSUMPTION: number = 66567.0; // Sample result from quantitative research
const TOTAL_SPENDING: number = 6326.16; // Sample result from quantitative research
const TOTAL_REVENUE_EXCESS: number = 2296.62; // Sample result from quantitative research
const REVENUE_PER_KWH_CONSUMED: number =
  (TOTAL_REVENUE_EXCESS / TOTAL_CONSUMPTION) * SOLAR_PARK_PRODUCTIVITY_BOOST;
const SAMPLE_CAPACITY: number = 30; // Sample result from quantitative research
const TOTAL_REVENUE_100: number = 5875.77; // Sample result from quantitative research
const INCOME_TAX_PERCENT: number = 0.3; // Based on research
const MALE_ADULT_ASIAN_ELEPHANT_WEIGHT_IN_TONS: number = 4; // Based on research
const COMPETITOR_PARK_EMISSIONS_SAVED_PER_KWH: number = 2001 / 4100; // Based on research
const SPAIN_GERMANY_PVOUT_BOOST: number = 4.41 / 2.96; // Based on research
const KGS_PER_TON: number = 1000;

// Helper function

function calculateTotalPrice(capacity: number): number {
  let total_price: number = 0;
  for (const [tier_capacity, tier_price] of PRICE_TIERS) {
    if (capacity > tier_capacity) {
      total_price += tier_capacity * tier_price;
      capacity -= tier_capacity;
    } else {
      total_price += capacity * tier_price;
      break;
    }
  }
  return total_price;
}

async function getConsumptionDataFromApi(
  cupsCode: string
): Promise<any | null> {
  try {
    const response = await fetch('/api/enerbit/consumption_pse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cupsCode: cupsCode,
        WEBTOKEN: WEBTOKEN
      })
    });

    const data = await response.json();

    return response.status === 200 ? data : null;
  } catch (error) {
    console.error('Error fetching consumption data:', error);
    return null;
  }
}

async function getTechnicalDataFromApi(cupsCode: string): Promise<any | null> {
  try {
    const response = await fetch('/api/enerbit/pse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cupsCode: cupsCode,
        WEBTOKEN: WEBTOKEN
      })
    });
    const data = await response.json();

    return response.status === 200 ? data : null;
  } catch (error) {
    console.error('Error fetching technical data:', error);
    return null;
  }
}

interface ConsumptionData {
  summary: {
    cons_month: {
      month_date: string;
      data: number[];
    }[];
  };
}

interface ProcessedData {
  Year: string[];
  Month: string[];
  P1: number[];
  P2: number[];
  P3: number[];
  P4: number[];
  P5: number[];
  P6: number[];
  Total: number[];
}

function processConsumptionData(
  consumptionData: ConsumptionData
): ProcessedData {
  const { cons_month } = consumptionData.summary;
  const Year: string[] = [];
  const Month: string[] = [];
  const P1: number[] = [];
  const P2: number[] = [];
  const P3: number[] = [];
  const P4: number[] = [];
  const P5: number[] = [];
  const P6: number[] = [];
  const Total: number[] = [];

  for (const entry of cons_month) {
    const { month_date, data } = entry;
    const [YearVal, MonthVal] = month_date.match(/(\d{4})(\d{2})/)!.slice(1);
    Year.push(YearVal);
    Month.push(MonthVal);
    P1.push(data[0]);
    P2.push(data[1]);
    P3.push(data[2]);
    P4.push(data[3]);
    P5.push(data[4]);
    P6.push(data[5]);
    Total.push(data.reduce((acc, val) => acc + val, 0));
  }

  return { Year, Month, P1, P2, P3, P4, P5, P6, Total };
}

const fetchData = async (cups_code: string) => {
  try {
    const [consumption_data, technical_data] = await Promise.all([
      getConsumptionDataFromApi(cups_code),
      getTechnicalDataFromApi(cups_code)
    ]);
    return { consumption_data, technical_data };
  } catch (error) {
    console.error('Error fetching data for CUPS code:', cups_code, error);
    throw new Error('Error fetching data for CUPS code:');
  }
};

export const calculateSolarPaybackPeriod = async (
  offerType: string,
  number_of_people?: number,
  user_cups_code?: string
) => {
  let required_capacity: number = 0;
  let vsi_required_capacity: number = 0;
  let yearly_fixed_charge: number = 0;
  let UTILITY_PRICE: number = 0;
  let yearly_consumption: number = 0;
  let SERVICE_FEE_PER_MONTH: number = 0;
  let yearly_variable_bill: number = 0;
  let total_customer_fees: number = 0;

  if (offerType === 'Standard' && number_of_people) {
    let mean_daily_average_consumption: number =
      number_of_people * AVERAGE_CONSUMPTION_PER_PERSON_PER_DAY;
    yearly_consumption = mean_daily_average_consumption * DAYS_IN_YEAR;
    required_capacity = mean_daily_average_consumption / SEVILLA_HSP / SYSTEM_EFFICIENCY;
    vsi_required_capacity = required_capacity / SOLAR_PARK_PRODUCTIVITY_BOOST;
    yearly_fixed_charge = required_capacity * YEARLY_FIXED_CHARGE_PEOPLE_FACTOR;

    if (vsi_required_capacity <= 15) {
      SERVICE_FEE_PER_MONTH = 6;
      UTILITY_PRICE = 0.191649;
    } else {
      SERVICE_FEE_PER_MONTH = 12;
      UTILITY_PRICE = 0.165449;
    }
    yearly_variable_bill =
      UTILITY_PRICE * (1 + GRID_TAX_PERCENT) * yearly_consumption;
    total_customer_fees =
      SERVICE_FEE_PER_MONTH * MONTHS_IN_YEAR * YEARS_IN_CONTRACT;
  } else if (user_cups_code) {
    const cups_codes: string[] = user_cups_code
      .toUpperCase()
      .replace(/\s/g, '')
      .split(',')
      .map((cup) => cup.trim());

    const allData = await Promise.all(cups_codes.map(fetchData));

    if (!allData) {
      throw new Error('erorr');
    }

    let industrial_customer = false;

    if (cups_codes.length === 1) {
      const { consumption_data, technical_data } = allData[0];

      if (consumption_data && technical_data) {
        const final_df = processConsumptionData(consumption_data);
        let mean_daily_average_consumption: number =
          final_df.Total.reduce((acc, val) => acc + val, 0) /
          (final_df.Year.length * DAYS_IN_MONTH);

        required_capacity = mean_daily_average_consumption / SEVILLA_HSP / SYSTEM_EFFICIENCY;
        vsi_required_capacity = required_capacity / SOLAR_PARK_PRODUCTIVITY_BOOST;

        yearly_consumption =
          (final_df.Total.reduce((acc, val) => acc + val, 0) /
            final_df.Year.length) *
          MONTHS_IN_YEAR;

        let type_consumption_point = technical_data.tipoPerfilConsumo
          ? technical_data.tipoPerfilConsumo.slice(1).toUpperCase()
          : null;
        let relevant_prices = POWER_PRICES[type_consumption_point];
        let contracted_powers: Record<string, number> = {};
        for (let i = 1; i <= 7; i++) {
          contracted_powers[`P${i}`] = parseFloat(
            technical_data[`potenciasContratadasEnWP${i}`] || '0'
          );
        }

        let final_charges: number[] = Object.entries(relevant_prices).map(
          ([period, price]) => (price * contracted_powers[period]) / 1000
        );

        yearly_fixed_charge += final_charges.reduce((acc, val) => acc + val, 0);
        //   console.log({ yearly_fixed_charge });
        SERVICE_FEE_PER_MONTH = 0;
        UTILITY_PRICE = 0;
        if (type_consumption_point === '2.0TD') {
          SERVICE_FEE_PER_MONTH = 6;
          UTILITY_PRICE = 0.191649;
        } else if (['3.0TD', '3.0TDVE'].includes(type_consumption_point)) {
          SERVICE_FEE_PER_MONTH = 12;
          UTILITY_PRICE = 0.165449;
        } else {
          SERVICE_FEE_PER_MONTH = 100;
          UTILITY_PRICE = 0.137538;
        }
        yearly_variable_bill =
          UTILITY_PRICE * (1 + GRID_TAX_PERCENT) * yearly_consumption;

        const individual_total_customer_fees: number =
          SERVICE_FEE_PER_MONTH * MONTHS_IN_YEAR * YEARS_IN_CONTRACT;
      } else {
        console.log(
          'Error fetching data. Please check the CUPS code and try again.'
        );
        throw new Error(
          'Error fetching data. Please check the CUPS code and try again.'
        );
      }
    } else {
      yearly_consumption = 0;
      required_capacity = 0;
      vsi_required_capacity = 0;
      yearly_fixed_charge = 0;
      yearly_variable_bill = 0;
      total_customer_fees = 0;

      // console.log({ info });

      for (const data of allData) {
        // let consumption_data = await getConsumptionDataFromApi(cups_code);
        // let technical_data = await getTechnicalDataFromApi(cups_code);

        // const data = await fetchData(cups_code);
        if (!data) return;
        const { consumption_data, technical_data } = data;

        if (consumption_data && technical_data) {
          const final_df = processConsumptionData(consumption_data);
          let mean_daily_average_consumption: number =
            final_df.Total.reduce((acc, val) => acc + val, 0) /
            (final_df.Year.length * DAYS_IN_MONTH);
          const individual_required_capacity: number =
            mean_daily_average_consumption / SEVILLA_HSP / SYSTEM_EFFICIENCY;
          required_capacity += individual_required_capacity;
          const vsi_individual_required_capacity: number =
            individual_required_capacity / SOLAR_PARK_PRODUCTIVITY_BOOST;
          vsi_required_capacity += vsi_individual_required_capacity;

          const individual_yearly_consumption: number =
            (final_df.Total.reduce((acc, val) => acc + val, 0) /
              final_df.Year.length) *
            MONTHS_IN_YEAR;
          yearly_consumption += individual_yearly_consumption;

          let type_consumption_point = technical_data.tipoPerfilConsumo
            ? technical_data.tipoPerfilConsumo.slice(1).toUpperCase()
            : null;
          let relevant_prices = POWER_PRICES[type_consumption_point];
          let contracted_powers: Record<string, number> = {};
          for (let i = 1; i <= 7; i++) {
            contracted_powers[`P${i}`] = parseFloat(
              technical_data[`potenciasContratadasEnWP${i}`] || '0'
            );
          }

          let final_charges: number[] = Object.entries(relevant_prices).map(
            ([period, price]) => (price * contracted_powers[period]) / 1000
          );
          const individual_yearly_fixed_charge: number = final_charges.reduce(
            (acc, val) => acc + val,
            0
          ); // this year
          yearly_fixed_charge += individual_yearly_fixed_charge;
          //   console.log({ yearly_fixed_charge });
          SERVICE_FEE_PER_MONTH = 0;
          UTILITY_PRICE = 0;
          if (type_consumption_point === '2.0TD') {
            industrial_customer = false;
            UTILITY_PRICE = 0.191649;
          } else if (['3.0TD', '3.0TDVE'].includes(type_consumption_point)) {
            industrial_customer = false;
            UTILITY_PRICE = 0.165449;
          } else {
            industrial_customer = true;
            UTILITY_PRICE = 0.137538;
          }
          const individual_yearly_variable_bill: number =
            UTILITY_PRICE *
            (1 + GRID_TAX_PERCENT) *
            individual_yearly_consumption;
          yearly_variable_bill += individual_yearly_variable_bill;

          const individual_total_customer_fees: number =
            SERVICE_FEE_PER_MONTH * MONTHS_IN_YEAR * YEARS_IN_CONTRACT;
          total_customer_fees += individual_total_customer_fees;
        } else {
          console.log(
            'Error fetching data. Please check the CUPS code and try again.'
          );
          throw new Error(
            'Error fetching data. Please check the CUPS code and try again.'
          );
        }
      }

      if (industrial_customer) {
        SERVICE_FEE_PER_MONTH = 100;
      } else {
        SERVICE_FEE_PER_MONTH = 12;
      }
    }
    total_customer_fees =
      SERVICE_FEE_PER_MONTH * MONTHS_IN_YEAR * YEARS_IN_CONTRACT;
  }
  const number_of_panels: number = vsi_required_capacity * PANELS_PER_KW;
  const total_price_before_tax: number = calculateTotalPrice(vsi_required_capacity);
  const total_price_after_tax: number =
    total_price_before_tax * (1 + NEOS_VAT_PERCENT);
  const neos_installation_tax: number =
    total_price_after_tax - total_price_before_tax;

  const yearly_fixed_charges_w_inflation: number[] = [];
  let total_fixed_charges: number = 0;
  //   console.log({ yearly_fixed_charge }, { INFLATION_PERCENT });
  for (let i = 0; i < 25; i++) {
    yearly_fixed_charges_w_inflation.push(
      yearly_fixed_charge * Math.pow(1 + INFLATION_PERCENT, i)
    );
  }
  total_fixed_charges = yearly_fixed_charges_w_inflation.reduce(
    (a, b) => a + b,
    0
  );

  //   console.log(`\nYearly Fixed Charge: €${yearly_fixed_charge.toFixed(2)}.`);
  //   console.log(
  //     `Total Fixed Charges Over 25 Years: €${total_fixed_charges.toFixed(2)}.`
  //   );

  //   let yearly_variable_bill: number =
  //     UTILITY_PRICE * (1 + GRID_TAX_PERCENT) * yearly_consumption;
  const yearly_variable_bills_w_inflation: number[] = [];
  let total_variable_charges: number = 0;
  let total_spending_w_regular_provider: number = 0;

  //   for (let i = 1; i <= 25; i++) {
  //     yearly_variable_bill *= 1 + INFLATION_PERCENT;
  //     yearly_variable_bills_w_inflation.push(yearly_variable_bill);
  //   }

  for (let i = 0; i < 25; i++) {
    yearly_variable_bills_w_inflation.push(
      yearly_variable_bill * Math.pow(1 + INFLATION_PERCENT, i)
    );
  }

  total_variable_charges = yearly_variable_bills_w_inflation.reduce(
    (a, b) => a + b,
    0
  );
  //   console.log(
  //     { yearly_fixed_charges_w_inflation },
  //     { yearly_variable_bills_w_inflation }
  //   );
  const total_regular_bills_w_inflation: number[] =
    yearly_fixed_charges_w_inflation.map(
      (fixed, index) => fixed + yearly_variable_bills_w_inflation[index]
    );
  //   console.log({ total_regular_bills_w_inflation });
  total_spending_w_regular_provider = total_regular_bills_w_inflation.reduce(
    (a, b) => a + b,
    0
  );

  let rooftop_installation_price_before_tax: number =
    ROOFTOP_PRICE * required_capacity;
  let rooftop_installation_price_after_tax: number =
    rooftop_installation_price_before_tax * (1 + ROOFTOP_VAT_PERCENT);
  let rooftop_installation_tax: number =
    rooftop_installation_price_after_tax -
    rooftop_installation_price_before_tax;
  let total_spending_w_rooftop: number =
    total_fixed_charges +
    rooftop_installation_price_after_tax +
    required_capacity *
    ROOFTOP_MAINTENANCE_PER_MONTH *
    MONTHS_IN_YEAR *
    YEARS_IN_CONTRACT +
    ROOFTOP_GRID_COVERAGE_PERCENT * total_variable_charges;

  let customers_revenue: number = REVENUE_PER_KWH_CONSUMED * yearly_consumption;
  let customers_revenue_w_inflation: number[] = [];
  for (let i = 0; i < 25; i++) {
    customers_revenue_w_inflation.push(
      customers_revenue * Math.pow(1 + INFLATION_PERCENT, i)
    );
  }
  let total_customers_revenue: number = customers_revenue_w_inflation.reduce(
    (a, b) => a + b,
    0
  );

  let wholesale_cost_per_kwh_consumed: number =
    TOTAL_SPENDING / TOTAL_CONSUMPTION;
  let spending_per_kwh_non_solar_consumed: number =
    (wholesale_cost_per_kwh_consumed + GRID_RELATED_COSTS) *
    (1 + GRID_TAX_PERCENT);
  let customers_spending_non_solar: number =
    NEOS_GRID_COVERAGE_PERCENT *
    spending_per_kwh_non_solar_consumed *
    yearly_consumption;
  let customers_spending_non_solar_w_inflation: number[] = [];
  for (let i = 0; i < 25; i++) {
    customers_spending_non_solar_w_inflation.push(
      customers_spending_non_solar * Math.pow(1 + INFLATION_PERCENT, i)
    );
  }
  //   console.log({ customers_spending_non_solar_w_inflation });
  let total_customers_spending_non_solar: number =
    customers_spending_non_solar_w_inflation.reduce((a, b) => a + b, 0);
  let spending_per_kwh_solar_consumed: number =
    (PRICE_PER_KWH_SOLAR + GRID_RELATED_COSTS) * (1 + GRID_TAX_PERCENT);
  let customers_spending_solar: number =
    (1 - NEOS_GRID_COVERAGE_PERCENT) *
    spending_per_kwh_solar_consumed *
    yearly_consumption;
  let customers_spending_solar_w_inflation: number[] = [];
  for (let i = 0; i < 25; i++) {
    customers_spending_solar_w_inflation.push(
      customers_spending_solar * Math.pow(1 + INFLATION_PERCENT, i)
    );
  }
  let total_customers_spending_solar: number =
    customers_spending_solar_w_inflation.reduce((a, b) => a + b, 0);

  //   let total_customer_fees: number =
  //     SERVICE_FEE_PER_MONTH * MONTHS_IN_YEAR * YEARS_IN_CONTRACT;

  //   console.log(
  //     { total_fixed_charges },
  //     { total_price_after_tax },
  //     { total_customer_fees },
  //     { total_customers_spending_non_solar },
  //     { total_customers_spending_solar },
  //     { total_customers_revenue }
  //   );
  let total_spending_w_neos_provider: number =
    total_fixed_charges +
    total_price_after_tax +
    total_customer_fees +
    total_customers_spending_non_solar +
    total_customers_spending_solar -
    total_customers_revenue;

  let revenue_per_kw_100: number =
    (TOTAL_REVENUE_100 / SAMPLE_CAPACITY) * SOLAR_PARK_PRODUCTIVITY_BOOST;
  let revenue_per_kw_100_w_inflation: number[] = [];
  for (let i = 0; i < 25; i++) {
    revenue_per_kw_100_w_inflation.push(
      revenue_per_kw_100 * Math.pow(1 + INFLATION_PERCENT, i)
    );
  }
  let total_customers_revenue_100: number =
    vsi_required_capacity *
    revenue_per_kw_100_w_inflation.reduce((a, b) => a + b, 0);
  let total_customers_profit_100: number =
    total_customers_revenue_100 // * (1 - INCOME_TAX_PERCENT);

  let total_customers_fees_100: number =
    vsi_required_capacity *
    MAINTENANCE_FEE_PER_MONTH_PER_KW *
    MONTHS_IN_YEAR *
    YEARS_IN_CONTRACT;

  let net_total_spending_without_neos_provider: number =
    total_fixed_charges +
    total_price_after_tax +
    total_customers_fees_100 +
    total_variable_charges -
    total_customers_profit_100;

  // console.log(`\nRecommended Capacity: ${required_capacity.toFixed(2)} kW.`);
  // console.log(`Number of Panels: ${number_of_panels.toFixed(2)}.`);
  // console.log(
  //   `Total Price: €${total_price_before_tax.toFixed(2)} (+ VAT: €${neos_installation_tax.toFixed(2)}).\n`
  // );
  // console.log(`Your yearly consumption: ${yearly_consumption.toFixed(2)} kWh.`);

  let electricity_costs_rooftop: number =
    total_spending_w_rooftop - rooftop_installation_price_after_tax;
  let savings_retail_rooftop: number =
    total_spending_w_regular_provider - electricity_costs_rooftop;
  let percent_savings_retail_rooftop: number =
    (100 * savings_retail_rooftop) / total_spending_w_regular_provider;
  let savings_with_installation_rooftop: number =
    total_spending_w_regular_provider - total_spending_w_rooftop;
  let percent_savings_ultimate_rooftop: number =
    (100 * savings_with_installation_rooftop) /
    total_spending_w_regular_provider;

  let electricity_costs_without_neos: number =
    net_total_spending_without_neos_provider - total_price_after_tax;
  let savings_retail_without_neos: number =
    total_spending_w_regular_provider - electricity_costs_without_neos;
  let percent_savings_without_neos: number =
    (100 * savings_retail_without_neos) / total_spending_w_regular_provider;
  let savings_with_installation_without_neos: number =
    total_spending_w_regular_provider -
    net_total_spending_without_neos_provider;
  let percent_savings_ultimate_without_neos: number =
    (100 * savings_with_installation_without_neos) /
    total_spending_w_regular_provider;
  //   console.log({ total_spending_w_neos_provider }, { total_price_after_tax });
  let electricity_costs_w_neos: number =
    total_spending_w_neos_provider - total_price_after_tax;
  let savings_retail_w_neos: number =
    total_spending_w_regular_provider - electricity_costs_w_neos;
  let percent_savings_w_neos: number =
    (100 * savings_retail_w_neos) / total_spending_w_regular_provider;
  let savings_with_installation_w_neos: number =
    total_spending_w_regular_provider - total_spending_w_neos_provider;
  let percent_savings_ultimate_w_neos: number =
    (100 * savings_with_installation_w_neos) /
    total_spending_w_regular_provider;

  // console.log(`We estimate that:
  //       - With a regular provider:
  //       1. You'd spend €${total_spending_w_regular_provider.toFixed(2)} over 25 years.
  //       - With Neos virtual installations and Neos as a provider:
  //       1. You'd spend €${total_price_before_tax.toFixed(2)} on the installation, €${neos_installation_tax.toFixed(2)} on VAT, coming to a total of €${total_price_after_tax.toFixed(2)}.
  //       2. You'd spend €${electricity_costs_w_neos.toFixed(2)} over 25 years.
  //       3. Saving €${savings_retail_w_neos.toFixed(2)} (${percent_savings_w_neos.toFixed(2)}%) off your monthly electricity bills.
  //       4. Saving €${savings_with_installation_w_neos.toFixed(2)} (${percent_savings_ultimate_w_neos.toFixed(2)}%) if we include the installation cost.
  //       - With Neos virtual installations and a regular provider:
  //       1. You'd spend €${total_price_before_tax.toFixed(2)} on the installation, €${neos_installation_tax.toFixed(2)} on VAT, coming to a total of €${total_price_after_tax.toFixed(2)}.
  //       2. You'd spend €${electricity_costs_without_neos.toFixed(2)} over 25 years.
  //       3. Saving €${savings_retail_without_neos.toFixed(2)} (${percent_savings_without_neos.toFixed(2)}%) off your monthly electricity bills.
  //       4. Saving €${savings_with_installation_without_neos.toFixed(2)} (${percent_savings_ultimate_without_neos.toFixed(2)}%) if we include the installation cost.
  //       - With off-grid rooftop panels and a regular provider:
  //       1. You'd spend €${rooftop_installation_price_before_tax.toFixed(2)} on the installation, €${rooftop_installation_tax.toFixed(2)} on VAT, coming to a total of €${rooftop_installation_price_after_tax.toFixed(2)}.
  //       2. You'd spend €${electricity_costs_rooftop.toFixed(2)} over 25 years.
  //       3. Saving €${savings_retail_rooftop.toFixed(2)} (${percent_savings_retail_rooftop.toFixed(2)}%) off your monthly electricity bills.
  //       4. Saving €${savings_with_installation_rooftop.toFixed(2)} (${percent_savings_ultimate_rooftop.toFixed(2)}%) if we include the installation cost.\n`);

  // console.log('Neos as Provider:');
  let total_savings_w_neos: number = 0;
  let net_spendings_w_neos_provider: number[] = [];
  let savings_w_neos: number[] = [];
  let percent_savings_year1_w_neos: number = 0;

  for (let i = 0; i < yearly_fixed_charges_w_inflation.length; i++) {
    let fixed_charge = yearly_fixed_charges_w_inflation[i];
    let spend_non_solar = customers_spending_non_solar_w_inflation[i];
    let spend_solar = customers_spending_solar_w_inflation[i];
    let revenue = customers_revenue_w_inflation[i];

    net_spendings_w_neos_provider.push(
      fixed_charge +
      spend_non_solar +
      spend_solar +
      total_customer_fees / YEARS_IN_CONTRACT -
      revenue
    );
    savings_w_neos.push(
      total_regular_bills_w_inflation[i] - net_spendings_w_neos_provider[i]
    );
  }

  percent_savings_year1_w_neos =
    (100 * savings_w_neos[0]) / total_regular_bills_w_inflation[0];

  // console.log(
  //   `First-year savings: ${percent_savings_year1_w_neos.toFixed(2)}%.`
  // );
  // console.log('Your cumulative savings in:');

  let save_yearly_w_neos = [];
  let cumulative_savings = [];

  for (let i = 0; i < 25; i++) {
    total_savings_w_neos += savings_w_neos[i];

    // console.log(`- Year ${i+1}: €${total_savings_w_neos.toFixed(2)}.`);
  }

  let sum = 0;
  for (let i = 0; i < 25; i++) {
    sum += savings_w_neos[i];
    save_yearly_w_neos.push({
      years: i + 1,
      saving: (sum / total_savings_w_neos).toFixed(6)
    });
    cumulative_savings.push({ years: i + 1, saving: sum });
  };

  let sum_w_neos: number = 0;
  let left: number = total_price_after_tax;
  let values: number[] = [];
  let payback_w_neos: number = 0;

  for (let year = 0; year < 25; year++) {
    const saving = savings_w_neos[year];
    const yearly = total_regular_bills_w_inflation[year];
    sum_w_neos += yearly;
    left -= saving;
    values.push(left);
    if (left <= 0) {
      const precision: number =
        -values[year - 1] / (values[year] - values[year - 1]);
      payback_w_neos = parseFloat((year + precision).toFixed(2));
      // console.log(
      //   `\nWith Neos virtual installations and Neos as a provider, your investment will have paid for itself in ${payback_w_neos.toFixed(2)} years.`
      // );
      break;
    }
  }

  const neos_emissions_saved_per_year_in_kgs: number =
    vsi_required_capacity *
    COMPETITOR_PARK_EMISSIONS_SAVED_PER_KWH *
    SPAIN_GERMANY_PVOUT_BOOST *
    NEOS_PVOUT_IN_KWH_PER_KW;
  const neos_emissions_saved_per_year_in_tons: number =
    neos_emissions_saved_per_year_in_kgs / KGS_PER_TON;
  const neos_total_emissions_saved_in_tons: number =
    neos_emissions_saved_per_year_in_tons * YEARS_IN_CONTRACT;
  const neos_elephants_carbon_capture: number =
    neos_total_emissions_saved_in_tons /
    MALE_ADULT_ASIAN_ELEPHANT_WEIGHT_IN_TONS;

  // console.log(
  //   `With Neos virtual solar installations and Neos as a provider, you will help the country save ${neos_total_emissions_saved_in_tons.toFixed(2)} tons in CO2 emissions over the next 25 years.`
  // );
  // console.log(
  //   `This reduction in CO2 emissions is comparable to the collective weight of ${neos_elephants_carbon_capture.toFixed(2)} adult male Asian elephants.\n`
  // );

  // Yearly Savings without Neos as Provider
  // console.log('Neos & Regular Provider:');

  const profits_without_neos_provider: number[] = [];

  for (const revenue_per_kw of revenue_per_kw_100_w_inflation) {
    const total_revenue: number = vsi_required_capacity * revenue_per_kw;
    const final_profit: number = total_revenue // * (1 - INCOME_TAX_PERCENT);
    profits_without_neos_provider.push(final_profit);
  }

  let total_savings_without_neos: number = 0;
  const net_spendings_without_neos_provider: number[] = [];
  for (let i = 0; i < total_regular_bills_w_inflation.length; i++) {
    const bill: number = total_regular_bills_w_inflation[i];
    const profit: number = profits_without_neos_provider[i];
    const net_spending: number =
      vsi_required_capacity * MAINTENANCE_FEE_PER_MONTH_PER_KW * MONTHS_IN_YEAR +
      bill -
      profit;
    net_spendings_without_neos_provider.push(net_spending);
    // total_savings_without_neos += bill - net_spending;
  }

  const savings_without_neos: number[] = total_regular_bills_w_inflation.map(
    (bill, index) => bill - net_spendings_without_neos_provider[index]
  );
  const percent_savings_year1_without_neos: number =
    (100 * savings_without_neos[0]) / total_regular_bills_w_inflation[0];

  // console.log(
  //   `First-year savings: ${percent_savings_year1_without_neos.toFixed(2)}%.`
  // );
  // console.log('Your cumulative savings in:');

  let save_yearly_without_neos = [];
  for (let i = 0; i < 25; i++) {
    total_savings_without_neos += savings_without_neos[i];
    // save_yearly_without_neos.push({
    //   years: i + 1,
    //   saving: total_savings_without_neos.toFixed(2)
    // });
    // console.log(`- Year ${i}: €${total_savings_without_neos.toFixed(2)}.`);
  }
  sum = 0;
  for (let i = 0; i < 25; i++) {
    sum += savings_without_neos[i];
    save_yearly_without_neos.push({
      years: i + 1,
      saving: (sum / total_savings_w_neos).toFixed(6)
    });
    // console.log(`- Year ${i}: €${total_savings_without_neos.toFixed(2)}.`);
  }

  let sum_without_neos: number = 0;
  let payback_without_neos: number = 0;

  left = total_price_after_tax;
  values = [];
  for (let year = 0; year < 25; year++) {
    let yearly = total_regular_bills_w_inflation[year];
    sum_without_neos += yearly;
    let saving = savings_without_neos[year];
    left -= saving;
    values.push(left);
    if (left <= 0) {
      let precision = -values[year - 1] / (values[year] - values[year - 1]);
      payback_without_neos = parseFloat((year + precision).toFixed(2));
      // console.log(
      //   `With Neos virtual installations and a regular provider, your investment will have paid for itself in ${payback_without_neos.toFixed(2)} years.`
      // );

      break;
    }
  }

  let neos_not_provider_elephants_carbon_capture: number =
    neos_elephants_carbon_capture;
  let neos_not_provider_emissions_saved_per_year_in_tons: number =
    neos_emissions_saved_per_year_in_tons;
  let neos_not_provider_total_emissions_saved_in_tons: number =
    neos_total_emissions_saved_in_tons;

  let total_savings_rooftop: number = 0;

  // console.log(
  //   `With Neos virtual solar installations and a regular provider, you will help the country save ${neos_not_provider_total_emissions_saved_in_tons.toFixed(2)} tons in CO2 emissions over the next 25 years.`
  // );
  // console.log(
  //   `This reduction in CO2 emissions is comparable to the collective weight of ${neos_not_provider_elephants_carbon_capture.toFixed(2)} adult male Asian elephants.\n`
  // );
  // console.log('Rooftop Panels:');

  let net_rooftop_spendings: number[] = yearly_variable_bills_w_inflation.map(
    (bill, index) => {
      let fixed_charge = yearly_fixed_charges_w_inflation[index];
      return (
        required_capacity * ROOFTOP_MAINTENANCE_PER_MONTH * MONTHS_IN_YEAR +
        ROOFTOP_GRID_COVERAGE_PERCENT * bill +
        fixed_charge
      );
    }
  );

  let rooftop_savings: number[] = total_regular_bills_w_inflation.map(
    (bill, index) => {
      let net_rooftop_spending = net_rooftop_spendings[index];
      return bill - net_rooftop_spending;
    }
  );

  let percent_savings_year1_rooftop: number =
    (100 * rooftop_savings[0]) / total_regular_bills_w_inflation[0];

  // console.log(
  //   `First-year savings: ${percent_savings_year1_rooftop.toFixed(2)}%.`
  // );
  // console.log('Your cumulative savings in:');

  for (let i = 0; i < 25; i++) {
    total_savings_rooftop += rooftop_savings[i];
    // console.log(`- Year ${i}: €${total_savings_rooftop.toFixed(2)}.`);
  }

  let rooftop_sum: number = 0;
  left = rooftop_installation_price_after_tax;
  values = [];
  let payback_rooftop: number = 0;

  for (let year = 0; year < 25; year++) {
    let rooftop_saving = rooftop_savings[year];
    let yearly = total_regular_bills_w_inflation[year];
    rooftop_sum += yearly;
    left -= rooftop_saving;
    values.push(left);
    if (left <= 0) {
      let precision = -values[year - 1] / (values[year] - values[year - 1]);
      payback_rooftop = parseFloat((year + precision).toFixed(2));
      // console.log(
      //   `With rooftop panels and a regular provider, your investment will have paid for itself in ${payback_rooftop.toFixed(2)} years.`
      // );

      break;
    }
  }

  let rooftop_emissions_saved_per_year_in_kgs: number =
    neos_emissions_saved_per_year_in_kgs / SOLAR_PARK_PRODUCTIVITY_BOOST;
  let rooftop_emissions_saved_per_year_in_tons: number =
    rooftop_emissions_saved_per_year_in_kgs / KGS_PER_TON;
  let rooftop_total_emissions_saved_in_tons: number =
    rooftop_emissions_saved_per_year_in_tons * YEARS_IN_CONTRACT;
  let rooftop_elephants_carbon_capture: number =
    rooftop_total_emissions_saved_in_tons /
    MALE_ADULT_ASIAN_ELEPHANT_WEIGHT_IN_TONS;

  // console.log(
  //   `With rooftop panels and a regular provider, you will help the country save ${rooftop_total_emissions_saved_in_tons.toFixed(2)} tons in CO2 emissions over the next 25 years.`
  // );
  // console.log(
  //   `This reduction in CO2 emissions is comparable to the collective weight of ${rooftop_elephants_carbon_capture.toFixed(2)} adult male Asian elephants.\n`
  // );
  return {
    total_price_before_tax,
    neos_installation_tax,
    number_of_panels,
    required_capacity,
    vsi_required_capacity,
    total_price_after_tax,
    tableData: [
      {
        neosPanelProvider: total_price_after_tax.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }),
        neosPanelKeepProvider: total_price_after_tax.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }),
        rooftopPanelKeepProvider:
          rooftop_installation_price_after_tax.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }),
        keepProvider: '-'
      },
      {
        neosPanelProvider: percent_savings_w_neos.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }),
        neosPanelKeepProvider: percent_savings_without_neos.toLocaleString(
          'en-US',
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }
        ),
        rooftopPanelKeepProvider: percent_savings_retail_rooftop.toLocaleString(
          'en-US',
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }
        ),
        keepProvider: '0'
      },
      {
        neosPanelProvider: savings_retail_w_neos.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }),
        neosPanelKeepProvider: savings_retail_without_neos.toLocaleString(
          'en-US',
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }
        ),
        rooftopPanelKeepProvider: savings_retail_rooftop.toLocaleString(
          'en-US',
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }
        ),
        keepProvider: '0'
      },
      {
        neosPanelProvider: payback_w_neos.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }),
        neosPanelKeepProvider: payback_without_neos.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }),
        rooftopPanelKeepProvider: payback_rooftop.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }),
        keepProvider: '-'
      },
      {
        neosPanelProvider: neos_total_emissions_saved_in_tons.toLocaleString(
          'en-US',
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }
        ),
        neosPanelKeepProvider:
          neos_not_provider_total_emissions_saved_in_tons.toLocaleString(
            'en-US',
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }
          ),
        rooftopPanelKeepProvider:
          rooftop_total_emissions_saved_in_tons.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }),
        keepProvider: '0'
      }
    ],
    percent_savings_year1_w_neos,
    percent_savings_year1_without_neos,
    savings_retail_w_neos,
    savings_retail_without_neos,
    payback_rooftop,
    payback_w_neos,
    payback_without_neos,
    neos_total_emissions_saved_in_tons,
    neos_not_provider_total_emissions_saved_in_tons,
    neos_elephants_carbon_capture,
    neos_not_provider_elephants_carbon_capture,
    save_yearly_w_neos,
    save_yearly_without_neos,
    total_savings_w_neos,
    total_savings_without_neos,
    cumulative_savings
  };
};
