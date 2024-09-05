export default function PersonalDetails({data}){
    return(
        <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-bold mb-4 text-gray-500">Personal Details</h2>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="text-gray-500 font-medium"> Full Name</p>
        <p className="text-gray-900">{data.name}</p>
      </div>
      <div>
        <p className="text-gray-500 font-medium">Date of Birth</p>
        <p className="text-gray-900">{data.dob}</p>
      </div>
      <div>
        <p className="text-gray-500 font-medium">Nationality</p>
        <p className="text-gray-900">{data.nationality}</p>
      </div>
      <div>
        <p className="text-gray-500 font-medium">Civil Status</p>
        <p className="text-gray-900">{data.civilStatus}</p>
      </div>
      <div>
        <p className="text-gray-500 font-medium">Height</p>
        <p className="text-gray-900">{data.height}</p>
      </div>
      <div>
        <p className="text-gray-500 font-medium">Gender</p>
        <p className="text-gray-900">{data.nationality}</p>
      </div>
      <div>
        <p className="text-gray-500 font-medium">BirthPlace</p>
        <p className="text-gray-900">{data.birthPlace}</p>
      </div>
      <div>
        <p className="text-gray-500 font-medium">Address</p>
        <p className="text-gray-900">{data.address}</p>
      </div>
      
    </div>
  </div>
    )
}