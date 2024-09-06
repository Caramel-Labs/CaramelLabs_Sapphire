'use client'

import '@/app/globals.css'
import { FormProvider } from '@/app/context/formContext'



export default function VisaFormLayout({ children }) {
  return (
    <>
      <FormProvider>
        {children}
      </FormProvider>
    </>
  )
}
