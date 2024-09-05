export default function Notices({data}){
    return(
        <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-bold mb-4 text-gray-500">Notices</h2>
    {data.redNotices.length > 0 && (
      <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-4">
        <h3 className="font-bold mb-2">Red Notices</h3>
        
          {data.redNotices}
        
      </div>
    )}
    {data.yellowNotices.length > 0 && (
      <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg mb-4">
        <h3 className="font-bold mb-2">Yellow Notices</h3>
       
          {data.yellowNotices}
      
      </div>
    )}
    {data.unNotices.length > 0 && (
      <div className="bg-blue-100 text-blue-800 p-4 rounded-lg">
        <h3 className="font-bold mb-2">UN Notices</h3>
       
          {data.unNotices}
       
      </div>
    )}
  </div>
    )
}