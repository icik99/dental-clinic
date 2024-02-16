import React from 'react'
import Sidebar from '../../components/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineEye } from 'react-icons/ai'
import { HiOutlinePencil } from 'react-icons/hi'

export default function Payment() {
    const navigate = useNavigate()
  return (
    <div>
        <div className='min-h-screen bg-[#F2F2F2]'>
            <div className='flex w-full'>
                <Sidebar />
                <div className='w-full p-10'>
                    <div className='border-2 bg-white rounded-lg p-10 space-y-[20px]'>
                        <h1 className='text-2xl text-slate-black font-medium mb-[40px]'>Pembayaran</h1>
                        <div className='mt-[44px] overflow-auto scrollbar-hide bg-white'>
                        <table className='w-full space-y-[10px]'>
                            <div className='flex items-center gap-3 bg-white px-[14px] py-[10px] rounded-[3px]'>
                                <div className='flex items-center gap-[15px] min-w-[150px] max-w-[150px]'>
                                    <h1 className='text-black text-xs font-semibold'>No Registrasi</h1>
                                </div>
                                <div className='flex items-center gap-[15px] min-w-[220px] max-w-[220px]'>
                                    <h1 className='text-black text-xs font-semibold'>Nama Pasien</h1>
                                </div>
                                <div className='flex items-center gap-[15px] min-w-[220px] max-w-[220px]'>
                                    <h1 className='text-black text-xs font-semibold'>Total Pembayaran</h1>
                                </div>
                                <div className='flex items-center gap-[15px] min-w-[220px] max-w-[220px]'>
                                    <h1 className='text-black text-xs font-semibold'>Status Pembayaran</h1>
                                </div>
                                <div className=' w-full flex items-center justify-center'>
                                    <h1 className='text-black text-xs text-center font-semibold'>Action</h1>
                                </div>
                            </div>
                            <div className='flex items-center gap-3 bg-white px-[14px] py-[8px] rounded-[3px] border-t'>
                                <div className='min-w-[150px] max-w-[150px]'>
                                    <h1 className='text-[#0B63F8] text-xs font-[600]'>#A1242161</h1>
                                </div>
                                <div className='min-w-[220px] max-w-[220px]'>
                                    <h1 className='text-[#737373] text-xs font-[600] line-clamp-1'>Muh Rizieq Fazlulrahman Djafar</h1>
                                </div>
                                <div className='min-w-[220px] max-w-[220px]'>
                                    <h1 className='text-[#737373] text-xs font-[600] line-clamp-1'>Rp.300.000</h1>
                                </div>
                                <div className='min-w-[220px] max-w-[220px]'>
                                    <h1 className='text-green-500 text-xs font-bold line-clamp-1'>Lunas</h1>
                                </div>
                                <div className='w-full space-x-2'>
                                    <button className='w-[100px] text-xs p-2 font-medium bg-slate-300 text-white rounded-[9px]'> Edit Status </button>
                                    <button className='w-[50px] text-xs p-2 font-medium bg-slate-600 text-white rounded-[9px]'> Detail </button>
                                    <button onClick={() => navigate('/payment/invoice')} className='w-[100px] text-xs p-2 font-medium bg-slate-600 rounded-[9px] text-white'> Cetak invoice </button>
                                </div>
                            </div>
                        </table>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
