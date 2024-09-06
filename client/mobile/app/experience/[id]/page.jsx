'use client'

import { useState, useEffect } from 'react'
import BucketList from '@/app/components/bucketList'

export default function Experience() {
  const [experienceData, setExperienceData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/experiences/66d42722d490bb3a58bfbe98`);
        const result = await response.json();
        setExperienceData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (experienceData) console.log(experienceData);

  const { experience, hotels } = experienceData || {}

  return (
    experience && (
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Experience Image */}
        <img
          src='/images/headerImg.png'
          alt={experience.name || ""}
          className="w-full h-48 object-cover"
        />

        <div className="p-4">
          {/* Experience Name */}
          <h2 className="text-[22px] font-semibold mb-3 mt-4 text-black">{experience.name}</h2>

          {/* Experience Location */}
          <p className="text-xs font-semibold text-black mb-1">{experience.oneliner || "No Oneliner"}</p>
          <p className="text-black mb-4 text-xs">{experience.location?.address}</p>

          {/* Divider Line between Location and Description */}
          <div className="w-full h-[1px] bg-gray-300 mb-4"></div>

          {/* Experience Description */}
          <p className="text-black mb-4 text-xs">{experience.description}</p>

          {/* Divider Line after Description */}
          <div className="w-full h-[1px] bg-gray-300 mb-6"></div>

          {/* Bucket List */}
          <BucketList bucketlistItems={experience.bucketlist} />
        </div>
      </div>
    )
  );
}
