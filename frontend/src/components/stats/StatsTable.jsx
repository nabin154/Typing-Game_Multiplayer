import React from 'react'

const StatsTable = () => {
    
  return (
      <div class=" shadow-md sm:rounded-lg mr-3 ">
          <div class="max-h-96 overflow-y-auto scrollbar-hidden">
              <table class="w-auto sm:w-full text-sm text-left rtl:text-right max-h-52 ">
                  <caption class="p-5 text-lg font-semibold text-left rtl:text-right text-white custom-table-gradient ">
                      Your stats :
                      <p class="mt-1 text-sm font-normal text-gray-500 ">The more the practice,the better the result.</p>
                  </caption>
                  <thead class="text-xs uppercase custom-table-gradient ">
                      <tr>
                          <th scope="col" class="px-3 py-2 md:px-6 md:py-3 text-purple-500">
                              Played Count
                          </th>
                          <th scope="col" class="px-3 py-2 md:px-6 md:py-3 text-green-500">
                              WPM
                          </th>
                          <th scope="col" class="px-3 py-2 md:px-6 md:py-3 text-red-500">
                              Errors
                          </th>
                          <th scope="col" class="px-3 py-2 md:px-6 md:py-3 text-purple-500">
                              Time
                          </th>

                      </tr>
                  </thead>
                  <tbody>


                      <tr class="border-b text-gray-300 font-rubik font-medium">
                          <th scope="row" class="px-6 py-4  whitespace-nowrap">
                              20
                          </th>
                          <td class="px-3 py-2 md:px-6 md:py-3 ">
                              37
                          </td>
                          <td class="px-3 py-2 md:px-6 md:py-3 ">
                              15
                          </td>
                          <td class="px-3 py-2 md:px-6 md:py-3 ">
                              00:46 sec
                          </td>

                      </tr>
                      <tr class="border-b text-gray-300 font-rubik font-medium">
                          <th scope="row" class="px-6 py-4  whitespace-nowrap">
                              20
                          </th>
                          <td class="px-3 py-2 md:px-6 md:py-3 ">
                              37
                          </td>
                          <td class="px-3 py-2 md:px-6 md:py-3 ">
                              15
                          </td>
                          <td class="px-3 py-2 md:px-6 md:py-3 ">
                              00:46 sec
                          </td>

                      </tr>
                      <tr class="border-b text-gray-300 font-rubik font-medium">
                          <th scope="row" class="px-6 py-4  whitespace-nowrap">
                              20
                          </th>
                          <td class="px-3 py-2 md:px-6 md:py-3 ">
                              37
                          </td>
                          <td class="px-3 py-2 md:px-6 md:py-3 ">
                              15
                          </td>
                          <td class="px-3 py-2 md:px-6 md:py-3 ">
                              00:46 sec
                          </td>

                      </tr>
                      <tr class="border-b text-gray-300 font-rubik font-medium">
                          <th scope="row" class="px-6 py-4  whitespace-nowrap">
                              20
                          </th>
                          <td class="px-3 py-2 md:px-6 md:py-3 ">
                              37
                          </td>
                          <td class="px-3 py-2 md:px-6 md:py-3 ">
                              15
                          </td>
                          <td class="px-3 py-2 md:px-6 md:py-3 ">
                              00:46 sec
                          </td>

                      </tr>
                      <tr class="border-b text-gray-300 font-rubik font-medium">
                          <th scope="row" class="px-6 py-4  whitespace-nowrap">
                              20
                          </th>
                          <td class="px-3 py-2 md:px-6 md:py-3 ">
                              37
                          </td>
                          <td class="px-3 py-2 md:px-6 md:py-3 ">
                              15
                          </td>
                          <td class="px-3 py-2 md:px-6 md:py-3 ">
                              00:46 sec
                          </td>

                      </tr>
                  </tbody>
              </table>
          </div>
      </div>
  )
}

export default StatsTable
