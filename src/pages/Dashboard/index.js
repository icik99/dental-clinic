import React from 'react'
import Sidebar from '../../components/Sidebar'
import DashboardCard from '../../components/Card/DashboardCard'

const Dashboard = () => {
  return (
    <div>
        <div className=' bg-[#d8ddde] h-screen'>
            <div className='flex'>
                <Sidebar />
            </div>
        </div>
    </div>
  )
}

export default Dashboard