export default function TimeCard({ name, timeFromColombo, openHours }) {
  return (
    <div className="w-[328px] mx-auto">
      {/* Divider Line between Description and Time Taken */}
      <div className="w-full h-[1px] bg-gray-300 mb-4 mt-6"></div>

      {/* Time Taken Section */}
      <div className="mb-4 mt-7">
        <h3 className="font-semibold text-gray-900 mb-2 text-xs">Time taken</h3>
        <div className="flex items-center text-gray-900 text-xs">
          <svg
            className="w-5 h-5 mr-2 text-gray-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{name} is {timeFromColombo} hours from Colombo</span>
        </div>
      </div>

      {/* Open Hours Section */}
      <div className="mb-7 mt-5">
        <h3 className="font-semibold text-gray-900 mb-2 text-xs">Open hours</h3>
        <div className="flex items-center text-gray-900 text-xs">
          <svg
            className="w-5 h-5 mr-2 text-gray-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{openHours}</span>
        </div>
      </div>

      {/* Divider Line between Open Hours and Get in Touch */}
      <div className="w-full h-[1px] bg-gray-300 mb-6"></div>
    </div>
  );
}
