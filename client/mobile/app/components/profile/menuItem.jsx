export default function MenuItem({ icon, text, isLast = false }) {
  // Function to conditionally apply color only to "CeylonCard" and "Log out"
  const renderText = () => {
      if (text.includes("CeylonCard")) {
          return (
              <>
                  <span>View </span>
                  <span className="text-blue-500">CeylonCard</span>
              </>
          );
      } else if (text === "Log out") {
          return <span className="text-red-500">{text}</span>;
      } else {
          return <span>{text}</span>;
      }
  };

  return (
      <div className={`flex items-center py-3 ${!isLast && 'border-b border-gray-300'}`}>
          <span className="mr-4" style={{ fontSize: '20px' }}>{icon}</span>
          <span className="flex-grow text-gray-800" style={{ fontSize: '12px' }}>
              {renderText()}
          </span>
          <svg className={`w-5 h-5 ${text === 'Log out' ? 'text-red-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
      </div>
  );
}
