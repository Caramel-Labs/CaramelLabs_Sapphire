'use client';

import { AreaChart } from '@/components/charts/areaChart';
import Navbar from '@/components/navbar';

export default function Analytics() {
    const chartdata = [
        { date: 'Jan 23', Accepted: 2890, Rejected: 2338 },
        { date: 'Feb 23', Accepted: 2756, Rejected: 2103 },
        { date: 'Mar 23', Accepted: 3322, Rejected: 2194 },
        { date: 'Apr 23', Accepted: 3470, Rejected: 2108 },
        { date: 'May 23', Accepted: 3475, Rejected: 1812 },
        { date: 'Jun 23', Accepted: 3129, Rejected: 1726 },
        { date: 'Jul 23', Accepted: 3490, Rejected: 1982 },
        { date: 'Aug 23', Accepted: 2903, Rejected: 2012 },
        { date: 'Sep 23', Accepted: 2643, Rejected: 2342 },
        { date: 'Oct 23', Accepted: 2837, Rejected: 2473 },
        { date: 'Nov 23', Accepted: 2954, Rejected: 3848 },
        { date: 'Dec 23', Accepted: 3239, Rejected: 3736 },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            <Navbar />
            <div className="flex-1 flex flex-col overflow-hidden ml-64">
                {' '}
                {/* Adjust margin-left based on Navbar width */}
                <h1 className="text-3xl font-bold p-6 text-slate-700">
                    Analytics
                </h1>
                <div className="p-6">
                    <AreaChart
                        className="h-80"
                        data={chartdata}
                        index="date"
                        categories={['Accepted', 'Rejected']}
                        valueFormatter={(number) =>
                            `$${Intl.NumberFormat('us')
                                .format(number)
                                .toString()}`
                        }
                        onValueChange={(v) => console.log(v)}
                    />
                </div>
            </div>
        </div>
    );
}
