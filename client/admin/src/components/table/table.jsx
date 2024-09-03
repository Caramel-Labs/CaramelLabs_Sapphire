import TableHeader from "@/components/table/tableHeader"
import TableRow from "@/components/table/tableRow"

export default function Table() {
    return(
        <div className="bg-white shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
        <TableHeader />
        <tbody className="bg-white divide-y divide-gray-200">
        <TableRow  />
      </tbody>
    </table>
  </div>
    )
}