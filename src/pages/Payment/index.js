import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineEye } from 'react-icons/ai'
import { HiOutlinePencil } from 'react-icons/hi'
import Modal from '../../components/Modal'

export default function Payment() {
    const navigate = useNavigate()
    const [editStatus, setEditStatus] = useState(false)
  return (
    <div>
        <Modal 
            activeModal={editStatus}
            title={'Detail Rekam Medis'}
            buttonClose={ () => setEditStatus(!editStatus)}
            width={'832px'}
            content= {
                <div className=' w-full space-y-[40px]'>
                    <div className='bg-[#F8F8F8] rounded-[15px] px-[19px] py-[31px] w-[773px] text-[#737373] text-[14px] font-semibold'>
                        <div className='flex items-center'>
                            <h1 className='w-1/2'>Status Pembayaran</h1>
                            <select name="" id="" className='px-4 py-2 border rounded-md  w-full'>
                                <option value="Lunas">Lunas</option>
                                <option value="Belum Lunas">Belum Lunas</option>
                                <option value="Pending">Pending</option>
                            </select>
                        </div>
                    </div>
                    <div className='ml-[560px] flex items-start justify-end gap-3 w-1/4'>
                        <button onClick={() => setEditStatus(!editStatus)}  className="py-2 px-5 border rounded-md border-blue-700  w-[100px] text-blue-700 text-lg">Cancel</button>
                        <button  className="py-2 px-5 border rounded-md bg-blue-700 w-[100px] text-white text-lg">Save</button>
                    </div>

                </div>}
            />
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
                                    <button onClick={() => navigate('/payment/invoice')} className='w-[100px] text-xs p-2 font-medium bg-slate-600 rounded-[9px] text-white'> Cetak invoice </button>
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
                                    <h1 className='text-red-500 text-xs font-bold line-clamp-1'>Belum Lunas</h1>
                                </div>
                                <div className='w-full space-x-2'>
                                    <button onClick={() => setEditStatus(!editStatus)} className='w-[100px] text-xs p-2 font-medium bg-slate-600 text-white rounded-[9px]'> Edit Status </button>
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
