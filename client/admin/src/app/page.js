import Image from "next/image"
import Navbar from "@/components/navbar"
import Header from "@/components/header"
import Table from "@/components/table/table"

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Navbar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Table />
        </main>
      </div>
    </div>
  );
}
