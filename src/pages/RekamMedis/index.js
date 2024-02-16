import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Modal from '../../components/Modal';
import { Link } from 'react-router-dom';

export default function RekamMedis() {
    return (
        <div>
            <div className='min-h-screen bg-[#F2F2F2]'>
                <div className='flex w-full'>
                    <Sidebar />
                    <div className='w-full p-10'>
                        <div className='border-2 bg-white rounded-lg p-10 space-y-[20px]'>
                            <h1 className='text-2xl text-slate-black font-medium mb-[60px]'>Dental Record</h1>
                            <Link to={'create'} className='px-3 py-2 border rounded-md shadow-sm text-sm bg-blue-700 text-white'>New Record</Link>
                            <table className='w-full space-y-[10px]'>
                                <div className='flex items-center gap-3 bg-white px-[14px] py-[10px] rounded-[3px]'>
                                    <div className='flex items-center gap-[15px] min-w-[100px] max-w-[100px]'>
                                        <h1 className='text-black text-xs font-semibold'>No Registrasi</h1>
                                    </div>
                                    <div className='flex items-center gap-[15px] min-w-[100px] max-w-[100px]'>
                                        <h1 className='text-black text-xs font-semibold'>Tanggal</h1>
                                    </div>
                                    <div className='flex items-center gap-[15px] min-w-[300px] max-w-[300px]'>
                                        <h1 className='text-black text-xs font-semibold'>Nama Pasien</h1>
                                    </div>
                                    <div className='flex items-center gap-[15px] min-w-[420px] max-w-[420px]'>
                                        <h1 className='text-black text-xs font-semibold'>Pelayanan</h1>
                                    </div>
                                    <div className=' w-full flex items-center justify-center'>
                                        <h1 className='text-black text-xs text-center font-semibold'>Action</h1>
                                    </div>
                                </div>
                                <div className='flex items-center gap-3 bg-white px-[14px] py-[8px] rounded-[3px] border-t'>
                                    <div className='min-w-[100px] max-w-[100px]'>
                                        <h1 className='text-[#0B63F8] text-xs font-[600]'>#A1242161</h1>
                                    </div>
                                    <div className='min-w-[100px] max-w-[100px]'>
                                        <h1 className='text-[#737373] text-xs font-[600] line-clamp-1'>8 Januari 2024</h1>
                                    </div>
                                    <div className='min-w-[300px] max-w-[300px]'>
                                        <h1 className='text-[#737373] text-xs font-[600] line-clamp-1'>Muh Rizieq Fazlulrahman Djafar</h1>
                                    </div>
                                    <div className='min-w-[420px] max-w-[420px]'>
                                        <h1 className='text-[#737373] text-xs font-[600] line-clamp-1'>Pencabutan Gigi, Pembersihan Karang Gigi</h1>
                                    </div>
                                    <div className='w-full space-x-2'>
                                        <button className='w-[50px] text-xs p-2 font-medium bg-slate-600 text-white rounded-[9px]'> Detail </button>
                                        <button className='w-[50px] text-xs p-2 font-medium bg-slate-600 rounded-[9px] text-white'> Edit</button>
                                        <button className='w-[50px] text-xs p-2 font-medium bg-slate-600 rounded-[9px] text-white'> Hapus</button>
                                    </div>
                                </div>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}
