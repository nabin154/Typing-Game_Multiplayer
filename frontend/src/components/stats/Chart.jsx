import React, { useState } from 'react'
import { TbCalendarStats } from "react-icons/tb";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StatsTable from './StatsTable';

const Chart = () => {
    const [showStats, setShowStats] = useState(false);

    const data = [
        {
            name: 'Easy',
            Played: 2400,
            Errors: 4000,
            WPM: 2400,
        },
        {
            name: 'Medium',
            Played: 1398,
            Errors: 3000,
            WPM: 2210,
        },
        {
            name: 'Hard',
            Played: 9800,
            Errors: 2000,
            WPM: 2290,
        },

    ];

    const handleClick = () => {
        setShowStats(!showStats);
    }

    return (
        <div>
            {!showStats ?
                <ResponsiveContainer width="90%" height="70%">
                    <BarChart
                        width={400}
                        height={200}
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Played" stackId="a" fill="#27ae60" />
                        <Bar dataKey="Errors" stackId="b" fill="#c0392b" />
                    </BarChart>
                </ResponsiveContainer>

                : (
                    <StatsTable />
                )}
            <div>
                <button
                    onClick={handleClick} 
                    className='mt-20 ml-20 mb-3 px-4 py-2 font-rubik font-semibold flex items-center text-white bg-purple-800 rounded-lg border-none outline-none text-sm hover:bg-purple-500'
                >{showStats ? 'See Chart' : 'Show Stats Table'}<TbCalendarStats size={'21px'} className='ml-2' /></button>
            </div>
        </div>
    )
}

export default Chart
