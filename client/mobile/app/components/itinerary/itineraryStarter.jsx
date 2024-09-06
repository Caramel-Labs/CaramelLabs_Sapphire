import Image from "next/image"

export default function ItineraryStarter() {
    return(
        <div>
            <Image src={'/images/traveler.svg'} width={360} height={484}alt={"traveler"} className="mt-[33px]"/>
            <h2 className="text-[22px] font-semibold text-black mt-[40px] text-center">Experience Srilanka</h2>
            <p className="text-xs text-teal-600 text-center mt-4 mb-28">
            With Sapphire, you can apply for and manage your Digital Nomad Visa from anywhere in the world.
            </p>  
            <button className="bg-sapphire text-white  rounded-lg w-full text-xs py-[17px] px-[75px]">Create new experience AI</button>  
        </div>
    )
}