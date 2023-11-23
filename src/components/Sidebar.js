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
            <div className={`hidden lg:block py-[55px] h-screen bg-[#1d89bd] sticky ${display ? 'w-[300px] px-[29px]' : 'w-[124px] px-[45px]'} transition-all duration-1000 ease-in-out`}>
                
                <h1 className="text-white text-2xl font-medium mb-[64px]">Sinar Akbar Dental Clinic</h1>
                <div className='space-y-[10px] mb-20 text-white'>

                    <Link to={'/dashboard'} className={`${location.pathname === '/dashboard' && 'border-blue-600 border-l-4 text-blue-600'} flex text-start gap-[15px] px-4 py-2 w-full`}>
                            <h1 className={`text-base  hover:text-blue-600`}>Dashboard</h1>
                    </Link>

                    <Link to={'/rekam-medis'} className={`${location.pathname === '/rekam-medis' && 'border-blue-600 border-l-4 text-blue-600'} flex text-start gap-[15px] px-4 py-2 w-full`}>
                        <h1 className={`hover:text-blue-600 text-base`}>Registrasi Pasien</h1>
                    </Link>
                    <Link to={'/payment'} className={`${location.pathname === '/payment' && 'border-blue-600 border-l-4 text-blue-600'} flex text-start gap-[15px] px-4 py-2 w-full`}>
                        <h1 className={`hover:text-blue-600 text-base`}>Payment</h1>
                    </Link>
                </div>

                <button onClick={Logout} className='text-red-400 px-4 font-bold'>
                    Logout
                </button>
            </div>
        </>
    )
}

export default Sidebar