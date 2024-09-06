import TableHeader from "@/components/table/tableHeader";
import TableRow from "@/components/table/tableRow";

export default function Table({ data }) {

  if (data) {
   console.log(data)
  }
  return (
    <div className="bg-white shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <TableHeader />
       {data &&
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((rowData, index) => (
            <TableRow key={index} data={rowData} />
          ))}
        </tbody>
} 
      </table>
    </div>
  );
}
