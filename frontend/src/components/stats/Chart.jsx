import React, { useState } from 'react'
import { VscDebugStart } from 'react-icons/vsc';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = () => {
    const [showStats , setShowStats] = useState(false);
    
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


  return (
    <div>
        {showStats ?
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


                  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <caption class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                              Your stats :
                              <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">.</p>
                          </caption>
                          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                              <tr>
                                  <th scope="col" class="px-6 py-3">
                                      Played Count
                                  </th>
                                  <th scope="col" class="px-6 py-3">
                                      WPM
                                  </th>
                                  <th scope="col" class="px-6 py-3">
                                      Errors
                                  </th>
                                  <th scope="col" class="px-6 py-3">
                                      Time
                                  </th>
                                 
                              </tr>
                          </thead>
                          <tbody>
                              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                     20
                                  </th>
                                  <td class="px-6 py-4">
                                     37
                                  </td>
                                  <td class="px-6 py-4">
                                      15
                                  </td>
                                  <td class="px-6 py-4">
                                      00:46 sec
                                  </td>
                                 
                              </tr>
                              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                     20
                                  </th>
                                  <td class="px-6 py-4">
                                     37
                                  </td>
                                  <td class="px-6 py-4">
                                      15
                                  </td>
                                  <td class="px-6 py-4">
                                      00:46 sec
                                  </td>
                                  
                              </tr>
                              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                     20
                                  </th>
                                  <td class="px-6 py-4">
                                     37
                                  </td>
                                  <td class="px-6 py-4">
                                      15
                                  </td>
                                  <td class="px-6 py-4">
                                      00:46 sec
                                  </td>
                                 
                              </tr>
                             
                          </tbody>
                      </table>
                  </div>


)};

          <div>
              <button className='mt-20 px-5 py-3 font-rubik font-semibold flex items-center text-white bg-purple-800 rounded-lg border-none outline-none text-sm hover:bg-purple-500'
                  >Click to play <VscDebugStart size={'21px'} className='ml-2' /></button>
          </div>
    </div>
  )
}

export default Chart
