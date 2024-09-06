'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/app/components/navbar';
import ListingCard from '@/app/components/listings/listingCard';
import ListingsTab from '@/app/components/listings/listingsTab';
import TabDescription from '@/app/components/listings/tabDescription';
import Image from 'next/image';

export default function Home() {
    const [activeTab, setActiveTab] = useState('Travel');
    const [data, setData] = useState({}); // State to store data for each tab
    const [fetchedTabs, setFetchedTabs] = useState({}); // State to keep track of fetched tabs

    useEffect(() => {
        const fetchData = async () => {
            let endpoint;
            let requestOptions;

            // Determine the endpoint and request options based on the activeTab value
            switch (activeTab) {
                case 'Travel':
                    endpoint = 'places';
                    requestOptions = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            interestIds: ['66d1f7537c2ac1b3047e5fd6'],
                        }),
                    };
                    break;
                case 'Stay':
                    endpoint = 'hotels';
                    requestOptions = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            amenityName: 'Co-working spaces',
                        }),
                    };
                    break;
                case 'Experience':
                    endpoint = 'experiences';
                    requestOptions = {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    };
                    break;
                default:
                    return; // Exit if activeTab does not match any known value
            }

            try {
                const response = await fetch(
                    `http://localhost:4000/api/${endpoint}`,
                    requestOptions
                );
                const fetchedData = await response.json();
                setData((prevData) => ({
                    ...prevData,
                    [activeTab]: fetchedData,
                })); // Store data separately for each tab
                console.log('Fetched data:', fetchedData);

                // Mark this tab as fetched
                setFetchedTabs((prevFetched) => ({
                    ...prevFetched,
                    [activeTab]: true,
                }));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Fetch data only if the tab hasn't been fetched before
        if (!fetchedTabs[activeTab]) {
            fetchData();
        }
    }, [activeTab, fetchedTabs]);

    return (
        <div className="bg-white min-h-screen">
            <Image
                src="/images/headerImg.png"
                alt="Sigiriya Rock Fortress"
                width={360}
                height={290}
            />
            <div className="relative">
                <ListingsTab
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
            </div>
            <TabDescription activeTab={activeTab} />

            {/* Render a list of ListingCards based on fetched data */}
            <div className="listing-cards-container">
                {data[activeTab] &&
                    data[activeTab].map((item, index) => (
                        <ListingCard key={index} props={item} />
                    ))}
            </div>
        </div>
    );
}
