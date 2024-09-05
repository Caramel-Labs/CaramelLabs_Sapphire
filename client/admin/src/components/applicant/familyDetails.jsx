export default function FamilyDetails({data}){
    return(
        <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-500">Family Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 font-medium">Spouse Name</p>
            <p className="text-gray-900">{data.spouseName}</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">Spouse Nationality</p>
            <p className="text-gray-900">{data.spouseNationality}</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">fathers name</p>
            <p className="text-gray-900">{data.fathersName}</p>
          </div>
        </div>
      </div>)
}