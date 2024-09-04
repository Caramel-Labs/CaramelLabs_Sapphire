"use client"

import  {AreaChart}  from "@/components/charts/areaChart"

export default function Dashboard(){

    const chartdata = [
        {
          date: "Jan 23",
          Accepted: 2890,
          Rejected: 2338,
        },
        {
          date: "Feb 23",
          Accepted: 2756,
          Rejected: 2103,
        },
        {
          date: "Mar 23",
          Accepted: 3322,
          Rejected: 2194,
        },
        {
          date: "Apr 23",
          Accepted: 3470,
          Rejected: 2108,
        },
        {
          date: "May 23",
          Accepted: 3475,
          Rejected: 1812,
        },
        {
          date: "Jun 23",
          Accepted: 3129,
          Rejected: 1726,
        },
        {
          date: "Jul 23",
          Accepted: 3490,
          Rejected: 1982,
        },
        {
          date: "Aug 23",
          Accepted: 2903,
          Rejected: 2012,
        },
        {
          date: "Sep 23",
          Accepted: 2643,
          Rejected: 2342,
        },
        {
          date: "Oct 23",
          Accepted: 2837,
          Rejected: 2473,
        },
        {
          date: "Nov 23",
          Accepted: 2954,
          Rejected: 3848,
        },
        {
          date: "Dec 23",
          Accepted: 3239,
          Rejected: 3736,
        },
      ]
    return(
        <div>
            <h1>Dashboard</h1>
            <AreaChart
                className="h-80"
                data={chartdata}
                index="date"
                categories={["Accepted", "Rejected"]}
                valueFormatter={(number) =>
                `$${Intl.NumberFormat("us").format(number).toString()}`
                }
                onValueChange={(v) => console.log(v)}
            />
        </div>
    )
}