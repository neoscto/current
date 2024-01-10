import NeosButton from "@/components/NeosButton";
import { useTranslation } from "react-i18next";
import { setFormBack } from "@/features/common/commonSlice";
import { useDispatch } from "react-redux";

interface OfferCardProps {
  Data: {
    title: string;
    desc: string;
    is_premium?: boolean;
    feature: string[];
  };
  setShowForm: any;
}

const OfferCard = ({ Data, setShowForm }: OfferCardProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <div
      className={`border border-[#E0E0E0] rounded-2xl px-6 text-center py-7  ${
        Data?.is_premium
          ? "bg-[#E7F5FA] border-[#E7F5FA]"
          : "border-[#E0E0E0] bg-white"
      }`}
    >
      <h3 className="text-lg font-semibold flex justify-center items-center lg:w-109 md:w-[109%] sm:w-[109%] h-[30px]">
        {Data?.is_premium && (
          <img src="PersonalisedOffer.png" className="w-[30] h-[30] mr-3" />
        )}
        {t(`Get-offer.${Data.title}`)}
      </h3>
      <hr className="h-px my-6 bg-[#E0E0E0] border-0 "></hr>
      <p className="text-base font-medium mb-12 min-h-[46px] line-clamp-2">
        {t(`Get-offer.${Data.desc}`)}
      </p>
      {Data.feature.map((item, index) => {
        return (
          <p key={index} className="text-base font-normal pb-3 text-black">
            {t(`Get-offer.${item}`)}
          </p>
        );
      })}
      <NeosButton
        sx={{
          width: "134px!important",
          marginTop: "1.5rem",
          minWidth: "fit-content",
        }}
        category="colored"
        title={t("Get-offer.btn")}
        onClick={() => {
          setShowForm(Data?.is_premium ? "poffer" : "soffer");
          dispatch(setFormBack(Data?.is_premium ? "backpoffer" : "backsoffer"));
        }}
      />
    </div>
  );
};

export default OfferCard;
