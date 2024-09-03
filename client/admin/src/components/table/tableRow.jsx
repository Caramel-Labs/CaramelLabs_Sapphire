export default function TableRow({ data }) {

    return(
        <tr className="bg-white">
        <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
            <div className="text-sm font-medium text-gray-900">Name</div>
        </div>
        </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"> Application date</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Nationality</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Status</td>
  </tr>

    )
    
}