import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Sidebar = () => {
    const [display, setDisplay] = useState(true)
    const navigate = useNavigate()
    const location = useLocation()

    const Logout = async() => {
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <>
            <div className={`hidden lg:block py-[55px] h-screen bg-white sticky ${display ? 'w-[230px] px-[29px]' : 'w-[124px] px-[45px]'} transition-all duration-1000 ease-in-out`}>
                
                <h1 className="text-blue-800 text-2xl font-medium mb-[64px]">Sinar Akbar Dental Clinic</h1>
                <div className='space-y-[10px] mb-20'>

                    <Link to={'/'} className={`${location.pathname === '/' && 'border-blue-600 border-l-4 text-blue-600'} flex text-slate-500 font-[450] text-[16px] text-start gap-[15px] px-4 py-2 w-full`}>
                            <h1 className={`text-base  hover:text-blue-600`}>Dashboard</h1>
                    </Link>

                    <Link to={'/rekam-medis'} className={`${location.pathname === '/rekam-medis' && 'border-blue-600 border-l-4 text-blue-600'} flex text-slate-500 font-[450] text-[16px] text-start gap-[15px] px-4 py-2 w-full`}>
                        <h1 className={`hover:text-blue-600 text-base`}>Rekam Medis</h1>
                    </Link>

                </div>

                <button onClick={Logout} className='text-red-600 px-4 font-bold'>
                    Logout
                </button>
            </div>
        </>
    )
}

export default Sidebar