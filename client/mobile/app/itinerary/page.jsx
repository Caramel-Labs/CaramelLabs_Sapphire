'use client';

import { useState, useEffect } from 'react';
import ItineraryCard from '@/app/components/itinerary/itineraryCard';
import ItineraryStarter from '@/app/components/itinerary/itineraryStarter';

export default function Itinerary() {
    const [experiences, setExperiences] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    'http://localhost:4000/api/users/66d1fba57c2ac1b30482e2b5'
                );
                const data = await response.json();
                setExperiences(data.userExperiences);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4 bg-white min-h-screen">
            <div className="text-black">
                {experiences.length != 0 && (
                    <div>
                        <h1 className="text-2xl font-semibold mb-4 mt-4">
                            My Experiences
                        </h1>
                        <p className="text-gray-600 mb-4 text-xs">
                            Experiences are collections of locations saved as
                            bucket lists. This helps you keep track of places
                            you visit while working in Sri Lanka.
                        </p>
                        <button className="w-full bg-[#00A388] text-white py-3 rounded-lg mb-6 text-xs font-semibold">
                            Create New Experience with AI
                        </button>
                    </div>
                )}
                {experiences.length === 0 ? (
                    <ItineraryStarter />
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {experiences.map((experience) => (
                            <ItineraryCard
                                key={experience._id}
                                title={experience.name}
                                location={experience.location.address}
                                imageUrl={experience.imageUrl}
                                isGeneratedByAI={experience.aiGenerated}
                            />
                        ))}
                    </div>
                )}
            </div>
            {/* <ItineraryStarter /> */}
        </div>
    );
}
