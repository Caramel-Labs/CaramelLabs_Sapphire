'use client'

import VisaRequirements from "@/app/components/visa/visaRequirements"
import PersonalDetails from "@/app/components/visa/personalDetails"
import FamilyDetails from "@/app/components/visa/familyDetails"
import VisaCard from "@/app/components/visa/visaCard"
import VisaBeginner from "@/app/components/visa/visaBeginner"
import BankDocumentUpload from "./bankDocUpload"
import PassportUpload from "./passportUpload"
import PaymentSelection from "./payment/paymentSelection"
import PaymentSuccessful from "./payment/paymentSuccessful"
import PassportDetails from "./passportDetails"


import { useFormState } from "@/app/context/formContext"


export default function VisaStepForm() {
    const { step } = useFormState()
    switch (step) {
      case 0:
        return <VisaBeginner />
      case 1: 
        return <VisaRequirements />
      case 2: 
        return <PersonalDetails />
      case 3: 
        return  <FamilyDetails />
      case 4: 
      return <PassportDetails />
      case 5:
        return <PassportUpload />
      case 6:
          return <PhotoUpload />  
      case 7:   
        return <BankDocumentUpload />
      case 8:
        return <PaymentSelection />
      case 9:
        return <CheckoutWrapper />
      case 10:
        return <PaymentSuccessful />  
      case 11:
        return <VisaCard />  
      default:
        return null
    }
  }