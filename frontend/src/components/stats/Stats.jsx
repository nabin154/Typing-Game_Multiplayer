import React from 'react'
import UserStats from './UserStats'
import Chart from './Chart'

const Stats = () => {
  return (
    <div className='custom-gradient  w-full mt-[1px] grid md:grid-cols-2' style={{ minHeight: 'calc(100vh - 89px)' }}>

      <UserStats />
      <Chart />
    </div>
  )
}

export default Stats
