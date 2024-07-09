import React, { useEffect, useState } from 'react'
import { TbCalendarStats } from "react-icons/tb";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StatsTable from './StatsTable';
import { fetchGraphData } from '../../API/apis';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../Context/ToastProvider';
import { useUser } from '../../Context/UserProvider';

const Chart = () => {
    const { showToast } = useToast();
    const navigate = useNavigate();
    const [showStats, setShowStats] = useState(false);
    const [graphData, setGraphData] = useState();
const {user} = useUser();

    const getGraphData = async () => {
        try {
            const response = await fetchGraphData();
            if (response) {
                const data = response.data;
                setGraphData(data.data);

            } else {
                showToast(response.data.message, 'error', 5000);
            }

        } catch (error) {
            showToast(error.message, 'error', 5000);
        }
    };



    const handleClick = () => {
        setShowStats(!showStats);
    };

    useEffect(() => {
        getGraphData();
    }, [navigate]);

    return (
        <div>
            {!showStats ?
                <ResponsiveContainer width="90%" height="70%">
                    <BarChart
                        width={400}
                        height={200}
                        data={graphData}
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
                        <Bar dataKey="played" stackId="a" fill="#27ae60" />
                        <Bar dataKey="AvgErrors" stackId="b" fill="#c0392b" />
                    </BarChart>
                </ResponsiveContainer>

                : (
                    <StatsTable />
                )}
            <div>
                <p className='font-bold text-xl mt-6 text-white'>Average Speed : <span className='text-green-400 ml-2'> {user ? user.avgSpeed.toFixed(2) : 0} wpm</span></p>
                <button
                    onClick={handleClick}
                    className='mt-10 ml-20 mb-3 px-4 py-2 font-rubik font-semibold flex items-center text-white bg-purple-800 rounded-lg border-none outline-none text-sm hover:bg-purple-500'
                >{showStats ? 'See Chart' : 'Show Stats Table'}<TbCalendarStats size={'21px'} className='ml-2' /></button>
            </div>
        </div>
    )
}

export default Chart
