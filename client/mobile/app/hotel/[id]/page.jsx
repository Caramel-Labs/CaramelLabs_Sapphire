'use client'

import React, { useState, useEffect } from 'react';
import ContactCard from '@/app/components/contactCard';
import Reviews from '@/app/components/reviews/reviews';
import TimeCard from '@/app/components/timeCard';

export default function Hotel({ params }) {
  const [hotelData, setHotelData] = useState(null);

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/hotels/66d409dad490bb3a58a0d666`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
        setHotelData(data);
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      }
    };

    fetchHotelData();
  }, []);

  const { hotel, averageRating } = hotelData || {};

  return (
    <>
      {hotel && averageRating && (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header Image */}
          <img 
            src={'/images/headerImg.png'} 
            alt={hotel.name} 
            className="w-full h-64 object-cover"
          />
          <div className="pt-6 pl-6 pr-6">
            {/* Hotel Name */}
            <h2 className="text-[22px] font-semibold mb-2 text-black">{hotel.name}</h2>
            
            {/* Location and Reviews */}
            <div className="text-black text-xs mb-4">
              <span className="block">{hotel.location.address}</span>
              <span className="block font-bold">
                {averageRating} ★ • {hotel.reviews.length} review{hotel.reviews.length !== 1 ? 's' : ''}
              </span>
              <div className="w-full h-[1px] bg-gray-300 mb-4 mt-4"></div>
            </div>

            {/* Hotel Description */}
            <p className="text-black mb-4 text-xs leading-relaxed">
              {hotel.description}
            </p>
            
            
            {/* Time Card Section */}
            <TimeCard 
              timeFromColombo={hotel.timefromColombo} 
              name={hotel.name} 
              openHours={hotel.openHours}
            />
          </div>
          
          {/* Contact Card */}
          <ContactCard 
            telephone={hotel.telephone} 
            email={hotel.email} 
            web={hotel.web}
          />
    
          {/* Book Now Section */}
          <div className="p-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-2">Prices</h3>
            <p className="text-xl font-bold text-gray-800">
              Starting from ${hotel.cost} per day
            </p>
            <button className="w-full bg-blue-500 text-white font-semibold py-3 mt-4 rounded-lg">
              Book Now
            </button>
          </div>
        </div>
      )}
    </>
  );
}
