'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/navbar';
import Header from '@/components/header';
import Table from '@/components/table/table';

export default function Home() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState('inProgress'); // Default status
    const statuses = ['inProgress', 'approved', 'rejected', 'expired'];

    useEffect(() => {
        async function fetchData(status) {
            setLoading(true);
            try {
                const response = await fetch(
                    `http://localhost:4000/api/visa?visaStatus=${status}`
                );
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData(selectedStatus);
    }, [selectedStatus]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <Navbar />
            <div
                className="flex-1 flex flex-col overflow-hidden"
                style={{ marginLeft: '16rem' }}
            >
                {' '}
                {/* Adjust marginLeft to the Navbar's width */}
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <div className="mb-4 flex space-x-2">
                        {statuses.map((status) => (
                            <button
                                key={status}
                                onClick={() => setSelectedStatus(status)}
                                className={`py-2 px-4 rounded-full text-white ${
                                    selectedStatus === status
                                        ? 'bg-blue-500'
                                        : 'bg-gray-300'
                                } hover:bg-blue-600`}
                            >
                                {status.charAt(0).toUpperCase() +
                                    status.slice(1)}
                            </button>
                        ))}
                    </div>
                    {data && <Table data={data} />}
                </main>
            </div>
        </div>
    );
}
