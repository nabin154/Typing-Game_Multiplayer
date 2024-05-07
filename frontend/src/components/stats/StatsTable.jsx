import React, { useEffect, useState } from 'react'
import { fetchTableData } from '../../API/apis';

const StatsTable = () => {

    const [tableData, setTableData] = useState();

    const getTableData = async () => {
        try {
            const response = await fetchTableData();
            if (response) {
                const data = response.data;
                setTableData(data.data);

            } else {
                console.log(response.data.message);
            }

        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getTableData();
    }, []);

    return (
        <div className=" shadow-md sm:rounded-lg mr-3 ">
            <div className="max-h-96 overflow-y-auto scrollbar-hidden">
                <table className="w-auto sm:w-full text-sm text-left rtl:text-right max-h-52 ">
                    <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-white custom-table-gradient ">
                        Your stats :
                        <p className="mt-1 text-sm font-normal text-gray-500 ">The more the practice,the better the result.</p>
                    </caption>
                    <thead className="text-xs uppercase custom-table-gradient ">
                        <tr>
                            <th scope="col" className="px-3 py-2 md:px-6 md:py-3 text-purple-500">
                                Mode
                            </th>
                            <th scope="col" className="px-3 py-2 md:px-6 md:py-3 text-green-500">
                                WPM
                            </th>
                            <th scope="col" className="px-3 py-2 md:px-6 md:py-3 text-red-500">
                                Errors
                            </th>
                            <th scope="col" className="px-3 py-2 md:px-6 md:py-3 text-purple-500">
                                Time
                            </th>

                        </tr>
                    </thead>
                    <tbody>

                        {tableData && tableData.map((data, index) => (
                            <tr className="border-b text-gray-300 font-rubik font-medium" key={index}>
                                <th scope="row" className="px-6 py-4  whitespace-nowrap">
                                    {data.mode}
                                </th>
                                <td className="px-3 py-2 md:px-6 md:py-3 ">
                                    {data.wpm}
                                </td>
                                <td className="px-3 py-2 md:px-6 md:py-3 ">
                                    {data.errors}
                                </td>
                                <td className="px-3 py-2 md:px-6 md:py-3 ">
                                    {data.timeTaken}sec
                                </td>

                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StatsTable
