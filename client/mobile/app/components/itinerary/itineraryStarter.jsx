import Image from "next/image"

export default function ItineraryStarter() {
    return(
        <div>
            <Image src={'/images/traveler.svg'} width={200} height={200}alt={"traveler"}/>
            <h2 className="text-2xl font-semibold text-teal-600">Experience Srilanka</h2>
            <p className="text-xs text-black mb-6">
            With Sapphire, you can apply for and manage your Digital Nomad Visa from anywhere in the world.
            </p>  
            <button className="bg-teal-600 text-white  rounded-lg w-full text-xs py-[17px] px-[75px]">Create new experience AI</button>  
        </div>
    )
}