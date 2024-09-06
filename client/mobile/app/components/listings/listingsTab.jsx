'use client';

export default function ListingsTab({ activeTab, setActiveTab }) {
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex justify-center items-center bg-white rounded-xl shadow-md p-2 mx-4 mb-6 mt-[-40px]">
      {['Travel', 'Experience', 'Stay'].map((tab) => (
        <button
          key={tab}
          onClick={() => handleTabClick(tab)}
          className={`px-4 py-2  text-sm font-medium rounded-full ${
            activeTab === tab ? 'text-teal-600' : 'text-gray-500'
          }`}
        >
          {tab}
          {activeTab === tab && (
            <span className="block mx-auto w-2 h-2 bg-teal-600 rounded-full mt-1"></span>
          )}
        </button>
      ))}
    </div>
  );
}
