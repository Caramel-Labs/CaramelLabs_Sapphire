'use client'

import { useState, useEffect } from "react"
import PersonalDetails from "@/components/applicant/personalDetails";
import FamilyDetails from "@/components/applicant/familyDetails";
import Notices from "@/components/applicant/notices";
import SupportDocs from "@/components/applicant/supportDocs";

export default function Applicant() {
    const [applicantData, setApplicantData] = useState(null);

    // const applicanData = {
    //     personalDetails: {
    //         name: "John Doe",
    //         dob: "1985-08-15",
    //     },
    //     familyDetails: {
    //         spouseName: "Jane Doe",
    //         childrenNames: ["Emily Doe", "Michael Doe"],
    //     },
    //     supportiveDocuments: {
    //         bankStatement: "https://example.com/bank-statement.pdf",
    //         travelHistory: [
    //             "https://example.com/travel-history1.pdf",
    //             "https://example.com/travel-history2.pdf"
    //         ],
    //     },
    //     notices: {
    //         redNotices:"notices" ,
    //         unNotices: "notcies",
    //         yellowNotices:"notics" ,
    //     }
    // };
    
  
    useEffect(() => {
      // Fetch applicant data from an API
      const fetchApplicantData = async () => {
        const response = await fetch('http://localhost:4000/api/visa/66d1fba57c2ac1b30482e2b4');
        const data = await response.json();
        setApplicantData(data);
      };
      fetchApplicantData();
    }, []);
  
    if (!applicantData) {
      return <div>Loading...</div>;
    }

    if(applicantData)
        console.log(applicantData)
  
    const handleAccept = () => {
      // Implement logic to accept the applicant
      console.log('Accepting applicant...');
    };
  
    const handleReject = () => {
      // Implement logic to reject the applicant
      console.log('Rejecting applicant...');
    };
  
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Applicant Details</h1>
        <PersonalDetails data={applicantData} />
        <FamilyDetails data={applicantData} />
        <SupportDocs data={applicantData} />
        <Notices data={applicantData} />
        <div className="flex justify-end mt-6">
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-4" onClick={handleReject}>
            Reject
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={handleAccept}>
            Accept
          </button>
        </div>
      </div>
    );
  }