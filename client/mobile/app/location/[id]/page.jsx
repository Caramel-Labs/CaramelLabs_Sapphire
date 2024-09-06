'use client';

import React, { useState, useEffect } from 'react';
import ContactCard from '@/app/components/contactCard';
import Reviews from '@/app/components/reviews/reviews';
import TimeCard from '@/app/components/timeCard';
import HotelsNearby from '@/app/components/hotelsNearby';
import InfoCard from '@/app/components/infoCard';

export default function Location({ params }) {
    const [locationData, setLocationData] = useState(null);

    useEffect(() => {
        const fetchLocationData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:4000/api/places/${params.id}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                const data = await response.json();
                setLocationData(data);
            } catch (error) {
                console.error('Error fetching location data:', error);
            }
        };

        fetchLocationData();
    }, []);

    if (locationData) {
        console.log(locationData);
    }

    const { place, averageRating, hotels } = locationData || {};

    return (
        <>
            {place && hotels && (
                <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="0.5em"
                        height="1em"
                        viewBox="0 0 12 24"
                    >
                        <path
                            fill="currentColor"
                            fill-rule="evenodd"
                            d="m3.343 12l7.071 7.071L9 20.485l-7.778-7.778a1 1 0 0 1 0-1.414L9 3.515l1.414 1.414z"
                        />
                    </svg>
                    <img
                        src="/images/headerImg.png"
                        alt={place?.name || ''}
                        className="w-full h-60 object-cover"
                    />
                    <div className="p-6">
                        <h2 className="text-xl font-semibold mb-2 text-gray-600 ">
                            {place.name}
                        </h2>
                        <div className="flex items-center mb-3">
                            <span className="text-black text-xs ">
                                8th wonder of the world
                            </span>
                            <span>{place.location.address}</span>
                        </div>
                    </div>

                    <InfoCard />

                    <p className="text-black mb-4 mt-6 ml-4 mr-4 text-xs">
                        {place?.description}
                    </p>
                    <TimeCard
                        timeFromColombo={place.timefromColombo}
                        name={place.name}
                        openHours={place.openHours}
                    />
                    <ContactCard
                        telephone={place.telephone}
                        email={place.email}
                        web={place.web}
                    />

                    {/* <Reviews /> */}
                    <HotelsNearby hotels={hotels} />
                </div>
            )}
        </>
    );
}
