'use client'

import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Header from "@/components/header";
import Table from "@/components/table/table";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:4000/api/visa/all')
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (data) {
   console.log(data)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Navbar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
         {data && 
          <Table data={data} />
         }
        </main>
      </div>
    </div>
  );
}
