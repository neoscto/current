export const CustomTooltip = ({
  active,
  payload,
  label,
  total_savings_w_neos
}: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-slate-50 p-2">
        <p className="label">{`Year : ${payload[0].payload.years}`}</p>
        <p className="label">{`Saving : ${(
          (payload[0].payload.saving * total_savings_w_neos) /
          1000
        ).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}K`}</p>
      </div>
    );
  }

  return null;
};
