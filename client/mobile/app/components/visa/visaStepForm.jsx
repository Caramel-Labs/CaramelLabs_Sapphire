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
        return <VisaCard />
        return <FamilyDetails />
      case 1: <VisaBeginner />
        return <VisaRequirements />
      case 2: <PaymentSelection/>
        return <PersonalDetails/>
      case 3: <PaymentSuccessful/>
        return  
      case 4: <BankDocumentUpload/>
      case 5:<PassportUpload/>
        return <PassportDetails/>
      default:
        return null
    }
  }