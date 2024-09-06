'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/navbar';
import Header from '@/components/header';
import PersonalDetails from '@/components/applicant/personalDetails';
import FamilyDetails from '@/components/applicant/familyDetails';
import Notices from '@/components/applicant/notices';
import SupportDocs from '@/components/applicant/supportDocs';

export default function Applicant() {
    const [applicantData, setApplicantData] = useState(null);
    const params = useParams();
    const { id } = params;

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
        // Only fetch data if 'id' is available
        if (!id) return;

        const fetchApplicantData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:4000/api/visa/${id}`
                );
                const data = await response.json();
                setApplicantData(data);
            } catch (error) {
                console.error('Error fetching applicant data:', error);
            }
        };

        fetchApplicantData();
    }, [id]);

    if (!applicantData) {
        return <div>Loading...</div>;
    }

    if (applicantData) {
        console.log(applicantData);
    }

    const handleAccept = () => {
        // Implement logic to accept the applicant
        console.log('Accepting applicant...');
    };

    const handleReject = () => {
        // Implement logic to reject the applicant
        console.log('Rejecting applicant...');
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Navbar />
            <div
                className="flex-1 flex flex-col overflow-hidden"
                style={{ marginLeft: '16rem' }}
            >
                {' '}
                <Header showSearch={false} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-3xl text-black font-bold mb-6">
                            Applicant Details
                        </h1>
                        <PersonalDetails
                            data={applicantData}
                            className="mb-4"
                        />
                        <FamilyDetails data={applicantData} className="mb-4" />
                        <SupportDocs data={applicantData} className="mb-4" />
                        <Notices data={applicantData} className="mb-4" />
                        <div className="flex justify-end mt-6">
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-4"
                                onClick={handleReject}
                            >
                                Reject
                            </button>
                            <button
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                                onClick={handleAccept}
                            >
                                Accept
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
