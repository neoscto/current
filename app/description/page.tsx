"use client";
import NeosButton from "@/components/NeosButton"
import MainContainer from "@/components/sharedComponents/MainContainer"
import { useRouter } from 'next/navigation';
import { descriptionList } from "@/utils/StaticData"

const Description = () => {
    const router = useRouter()

    return (
        <MainContainer>
            <div className="rounded-[30px] bg-[#01092299] max-w-[93%] md:max-w-[88%] lg:max-w-[83%] w-full mx-auto bg-white overflow-hidden">
                <div className="max-w-[93%] md:max-w-[88%] lg:max-w-[83%] w-full mx-auto bg-white  flex flex-col-reverse md:flex-row lg:flex-row justify-center">
                    <div className="text-center md:text-left lg:text-left  pb-[24px] md:py-[70px] lg:py-[105px]">
                        <h1 className="text-lg md:2xl lg:text-3xl font-bold">
                            What is Virtual Solar?
                        </h1>
                        <p className="text-sm md:text-base lg:text-base mb-3 mt-1 text-black px-5 md:px-0 lg:px-0 ">
                            Buy panels inside of solar parks. Receive electricity through the grid system.
                        </p>
                        <div className="my-4 md:my-8 lg:my-8">
                            {descriptionList.map((item, index) => (
                                <div className="flex justify-center">
                                    {index === 5 && <span style={{ color: "transparent", fontSize: "24px", marginRight: "5px", textShadow: "0 0 0 #fcda34" }} className="-mt-1.5">&#9728;</span>}
                                    <p className="text-sm md:text-base lg:text-base mb-5 text-black" dangerouslySetInnerHTML={{ __html: item }} />
                                </div>
                            ))}
                        </div>
                        <div className="text-center">
                        <NeosButton category="colored" title="CALCULATE YOUR SAVINGS" onClick={() => router.push('/getoffer')} />
                        </div>
                    </div>

                    <div className="mx-auto mt-[10px] md:mt-[70px] lg:mt-[105px]">
                        <img src='description.png' alt="Description image" />
                    </div>

                </div>
            </div>
        </MainContainer>
    )
}

export default Description