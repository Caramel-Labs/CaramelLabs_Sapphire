export default function TableHeader() {

    const headerItems = ["Name", "Application Date", "Nationality", "Status", "Notices"]

    return(
    <thead>
    <tr className="bg-gray-50">
      {headerItems.map((item, index) => (
        <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{item}</th>
      ))}
    </tr>
  </thead>

    )
    
}