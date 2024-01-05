import NeosButton from '@/components/NeosButton'

interface OfferCardProps {
    Data: {
        title: string;
        desc: string;
        is_premium?: boolean;
        feature: string[];
    };
    setShowForm:any;
}

const OfferCard = ({ Data,setShowForm }: OfferCardProps) => {
    return (
        <div className={`border border-[#E0E0E0] rounded-2xl px-6 text-center py-7  ${Data?.is_premium ? 'bg-[#E7F5FA] border-[#E7F5FA]' : 'border-[#E0E0E0] bg-white'}`}>
            <h3 className='text-lg font-semibold flex justify-center items-center'>
                {Data?.is_premium &&
                    <img src="PersonalisedOffer.png" className='w-[30] h-[30] mr-3' />
                }
                {Data.title}
            </h3>
            <hr className="h-px my-6 bg-[#E0E0E0] border-0 "></hr>
            <p className='text-base font-medium mb-12 min-h-[46px] line-clamp-2'>
                {Data?.desc}
            </p>
            {Data.feature.map((item,index) => {
                return (
                    <p key={index} className='text-base font-normal pb-3 text-black'>
                        {item}
                    </p>
                )
            })}
            <NeosButton sx={{ width: "134px!important",marginTop:[5,14] }}  category="colored" title="GET OFFER" onClick={()=>(setShowForm(Data?.is_premium ? "poffer" :"soffer"))}/>
        </div>
    )
}

export default OfferCard