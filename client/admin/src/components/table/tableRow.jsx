import formatDate from '@/lib/formatDate';

export default function TableRow({ data }) {
    // Helper function to format date

    return (
        <tr className="bg-white">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">
                        <a href={`/applicant/${data.user}`}>{data.fullname}</a>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(data.createdAt)} {/* Format and display the date */}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {data.nationality}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {data.visaStatus}
            </td>
        </tr>
    );
}
