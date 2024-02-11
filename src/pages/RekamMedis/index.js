import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Odontogram from '../../components/Odontogram/Odontogram'
import Navbar from '../../components/Navbar'

export default function RekamMedis() {
    const [teethState, setTeethState] = useState(Array(32).fill(false));

    const toggleTooth = (index) => {
        const updatedTeethState = [...teethState];
        updatedTeethState[index] = !updatedTeethState[index];
        setTeethState(updatedTeethState);
    };
  return (
    <div>
        <div className='min-h-screen bg-[#F2F2F2]'>
            <div className='flex w-full'>
                <Sidebar />
                <div className='w-full p-10'>
                    <div className='border-2 bg-white rounded-lg p-10 space-y-[20px]'>
                        <h1 className='text-2xl text-slate-black font-medium'>Dental Record</h1>
                        <div className='space-y-[15px]'>
                            <div className='text-sm'>
                                <h1 className=''>Nama</h1>
                                <input type="text" className='w-full border shadow-md px-2 py-2 rounded-md' />
                            </div>
                            <div className='text-sm'>
                                <h1 className=''>Tempat Tanggal Lahir</h1>
                                <input type="text" className='w-full border shadow-md px-2 py-2 rounded-md' />
                            </div>
                            <div className='text-sm'>
                                <h1 className=''>Jenis Kelamin</h1>
                                <input type="text" className='w-full border shadow-md px-2 py-2 rounded-md' />
                            </div>
                            <div className='text-sm'>
                                <h1 className=''>Alamat</h1>
                                <input type="text" className='w-full border shadow-md px-2 py-2 rounded-md' />
                            </div>
                            <div className='text-sm'>
                                <h1 className=''>Pekerjaan</h1>
                                <input type="text" className='w-full border shadow-md px-2 py-2 rounded-md' />
                            </div>
                            <div className='text-sm'>
                                <h1 className=''>No Hp</h1>
                                <input type="number" className='w-full border shadow-md px-2 py-2 rounded-md' />
                            </div>
                            <div className='text-sm'>
                                <h1 className=''>Nama KK</h1>
                                <input type="number" className='w-full border shadow-md px-2 py-2 rounded-md' />
                            </div>
                        </div>
                        <div className='p-5 border'>
                            <div>
                                <Odontogram />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
