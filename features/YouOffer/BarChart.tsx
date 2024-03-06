import NeosButton from '@/components/NeosButton';
import { useTranslation } from 'react-i18next';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Label,
  CartesianAxis
} from 'recharts';
import { CustomTooltip } from './CustomTooltip';

// Define the type for your props
interface BarChartProps {
  userPlanBar: string;
  updateUserPlanBarSelection: (plan: string) => () => void;
  data: any;
}

const BarChartComponent: React.FC<BarChartProps> = ({
  userPlanBar,
  updateUserPlanBarSelection,
  data
}) => {
  const { t } = useTranslation();
  return (
    <div>
      {/* Chart Starts here */}
      <div className="flex justify-center flex-col  h-auto border mt-8 border-[#E0E0E0] !rounded-3xl px-4 pt-6 pb-4">
        {/*  chart header */}
        <div className="flex justify-between lg:gap-0 lg:mb-[40px] md:flex-row flex-col gap-[14px] mb-2.5">
          <div className=" lg:max-w-lg max-w-sm  flex  flex-wrap lg:gap-[29px] gap-1.5 lg:items-center md:flex-row flex-col items-center ">
            <div className="text-lg  font-semibold text-black text-left">
              {t('panel-charge.payback')}
            </div>

            <div className="flex gap-2">
              <NeosButton
                category="outline"
                className={`lg:px-3 lg:py-4 px-[14px] py-2 lg:text-sm text-[12px] leading-[15px] lg:leading-5 !font-medium !text-black !rounded-[24px] !border-2 ${userPlanBar == 'neos'
                  ? '!border-[#66BCDA]'
                  : '!border-[#E0E0E0]'
                  } !normal-case h-12`}
                title={t('How-it-work.chooseNeosPartner')}
                onClick={updateUserPlanBarSelection('neos')}
              />
              <NeosButton
                category="outline"
                className={` lg:px-3 lg:py-4 px-[14px] py-2 lg:text-sm text-[12px] leading-[15px] lg:leading-5 !font-medium !text-black !rounded-[24px] border-2 ${userPlanBar == 'current'
                  ? '!border-[#66BCDA]'
                  : '!border-[#E0E0E0]'
                  } !normal-case h-12
                  `}
                title={t('How-it-work.keepProvider')}
                onClick={updateUserPlanBarSelection('current')}
              />
            </div>
          </div>

          <div className="  flex md:flex-col lg:justify-end flex-row gap-[10px] justify-start ">
            <div className="flex items-center gap-2.5 ">
              <span className="bg-[#436DC6]  w-[20px] h-[10px]"></span>
              <span className="lg:text-sm md:text-xs text-[8px] !font-medium text-[#4F4F4F]">
                {t('chart.savingWithNeos')}
              </span>
            </div>
            <div className="flex items-center gap-2.5  lg:w-auto">
              <span className="bg-[#EB5757]  w-[20px] h-[10px]"></span>
              <span className="lg:text-sm md:text-xs text-[8px] !font-medium text-[#4F4F4F]">
                {t('chart.installationCost')}
              </span>
            </div>
          </div>
        </div>

        {/* chart container */}
        <div className=" h-80 ">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={150}
              height={40}
              data={
                userPlanBar === 'neos'
                  ? data.save_yearly_w_neos
                  : data.save_yearly_without_neos
              }
            >
              <Tooltip
                content={
                  <CustomTooltip
                    total_savings_w_neos={data.total_savings_w_neos}
                  />
                }
              />
              <Bar
                dataKey="saving"
                fill={`#436DC6`}
                barSize={24}
                radius={[5, 5, 0, 0]}
              />
              <XAxis
                dataKey="years"
                tickLine={false}
                className="lg:text-[12px] lg:leading-[15px] text-[6px] leading-[7px] mt-[10px]"
              >
                <Label
                  offset={-4}
                  position="insideBottom"
                  fontSize={20}
                  value={t('Years')}
                  className="lg:text-[12px] lg:leading-[15px] text-[6px] leading-[7px]"
                />
              </XAxis>
              <YAxis
                tickCount={4}
                tickLine={false}
                domain={[0, 1]}
                dy={0.5}
                ticks={[
                  0,
                  data.total_price_after_tax / data.total_savings_w_neos,
                  data.total_savings_without_neos / data.total_savings_w_neos,
                  1
                ]}
                tickFormatter={(value) =>
                  value > 0
                    ? `${(
                      (userPlanBar === 'neos'
                        ? value * data.total_savings_w_neos
                        : value * data.total_savings_w_neos) / 1000
                    ).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}K`
                    : value
                }
                className="lg:text-[12px] text-[6px] "
              >
                <Label
                  offset={0}
                  angle={-90}
                  position={'insideLeft'}
                  value={`${t('Savings')} (€)`}
                  className="lg:text-[12px] text-[6px] bg-red-400"
                />
              </YAxis>

              <CartesianAxis className="lg:text-[12px] lg:leading-[15px] text-[6px] leading-[7px]" />

              <ReferenceLine
                y={data.total_price_after_tax / data.total_savings_w_neos}
                stroke="#EB5757"
                strokeDasharray="5 0"
                strokeWidth={3}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Chart ends */}
    </div>
  );
};

export default BarChartComponent;
