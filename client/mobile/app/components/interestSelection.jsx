import{ useState } from 'react';

const interests = [
  'Adventure', 'Nature', 'Food', 'Photography', 'Bird Watching', 'Beaches',
  'Ayurveda and Wellness', 'Cityscapes', 'Aquariums and Zoos', 'Architecture',
  'Cycling', 'Culture', 'Hot Springs', 'Night Life', 'Hiking', 'History',
  'Festivals', 'Eco-Tourism', 'Safari and Wildlife', 'Whale Watching',
  'Surfing', 'Diving', 'Sailing'
];

export default function UpdateInterests() {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const toggleInterest = (interest) => {
    setSelectedInterests(prevInterests =>
      prevInterests.includes(interest)
        ? prevInterests.filter(i => i !== interest)
        : [...prevInterests, interest]
    );
  };

  return (
    <div className="bg-white min-h-screen p-4">
      {/* Back button */}
      <div className="mb-6">
        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>

      <h1 className="text-2xl font-bold mb-2">Update your interests</h1>
      <p className="text-gray-600 mb-6">
        Help us tailor your Sri Lankan experience towards your passions and preferences.
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {interests.map((interest) => (
          <button
            key={interest}
            onClick={() => toggleInterest(interest)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedInterests.includes(interest)
                ? 'bg-teal-500 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {interest}
          </button>
        ))}
      </div>

      <button className="w-full bg-teal-100 text-teal-700 py-3 rounded-lg font-medium">
        Save changes
      </button>
    </div>
  );
}