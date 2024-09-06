import FormContinueButton from '@/app/components/visa/formContinueButton'
import { useFormState } from "@/app/context/formContext"

export default function VisaBeginner() {

    const { onHandleNext } = useFormState()
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            {/* Image */}
            <img 
                src="/images/gyatt.svg" 
                alt="Visa" 
                className="w-[430px] h-[384px] mt-[36px]" 
            />

            {/* Heading */}
            <h1 className="text-black text-[22px] font-semibold mt-8 text-center">
                Visa in your pocket
            </h1>

            {/* Description */}
            <p className="text-gray-500 text-xs text-center mt-2">
                With Sapphire, you can apply for and manage your Digital Nomad Visa from anywhere in the world.
            </p>

            {/* Button */}
            <button 
                className="w-full bg-sapphire text-xs text-white py-[16px] px-[103px]   h-[48px] rounded-[8px] mt-6"
                onClick={onHandleNext}
            >
                Apply for Visa
            </button>
        </div>
    )
}
