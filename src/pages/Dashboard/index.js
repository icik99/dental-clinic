import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { AiOutlineEye } from "react-icons/ai";
import { HiOutlinePencil } from "react-icons/hi";
import Navbar from '../../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';

const Dashboard = () => {
    const [modalAlert, setModalAlert] = useState(false)
    const navigate = useNavigate()
  return (
    <div>
        <Modal 
            activeModal={modalAlert}
            title={''}
            buttonClose={ () => setModalAlert(!modalAlert)}
            width={'750px'}
            content= {
                <div className=' w-full space-x-[20px]'>
                    <h1 className='font-semibold mb-10 pl-4'>Pilih Status Pasien: </h1>
                    <button onClick={() => navigate('/pasien')} className='rounded-md p-16 border bg-slate-200 text-3xl font-semibold shadow'>Pasien Lama</button>
                    <button onClick={() => navigate('/pasien/create')} className='rounded-md p-16 border bg-slate-700 text-3xl font-semibold text-white shadow'>Pasien Baru</button>
                </div>
            }
        />
        <div className='min-h-screen bg-[#F2F2F2]'>
            <div className='flex w-full'>
                <Sidebar />
                <div className='p-10 w-full '>
                    <div className='md:flex lg:flex-row md:gap-[40px] lg:gap-[40px] flex-col gap-[20px] items-start mb-10'>
                        <Link to={'/pasien'} className='py-[40px] px-[30px] bg-white w-full border-2 shadow-sm'>
                            <div className='flex items-center justify-between  mb-2'>
                                <h1 className='text-[22px] font-medium'>Pasien</h1>
                            </div>
                            <p className='w-[280px] opacity-40 text-black text-sm text-start font-normal'>Lihat data dan rekam medis pasien</p>
                        </Link>
                        <button onClick={() => setModalAlert(!modalAlert)} className='py-[40px] px-[30px] bg-white w-full border-2 shadow-sm'>
                            <div className='flex items-center justify-between  mb-2'>
                                <h1 className='text-[22px] font-medium'>Reservasi</h1>
                            </div>
                            <p className='w-[280px] opacity-40 text-black text-sm text-start font-normal'>Reservasi pasien</p>
                        </button>
                        <Link to={'/payment'} className='py-[40px] px-[30px] bg-white w-full border-2 shadow-sm'>
                            <div className='flex items-center justify-between  mb-2'>
                                <h1 className='text-[22px] font-medium'>Pembayaran</h1>
                            </div>
                            <p className='w-[280px] opacity-40 text-black text-sm text-start font-normal'>Lihat dan edit status pembayaran</p>
                        </Link>
                    </div>
                    <h1 className='text-2xl text-slate-black font-medium'>Data Kunjungan Pasien</h1>
                    <div className='mt-[44px] overflow-auto scrollbar-hide bg-white'>
                        <table className='w-full space-y-[10px]'>
                            <div className='flex items-center gap-3 bg-white px-[14px] py-[10px] rounded-[3px]'>
                                <div className='flex items-center gap-[15px] min-w-[100px] max-w-[100px]'>
                                    <h1 className='text-black text-xs font-semibold'>No Registrasi</h1>
                                </div>
                                <div className='flex items-center gap-[15px] min-w-[150px] max-w-[150px]'>
                                    <h1 className='text-black text-xs font-semibold'>Tanggal</h1>
                                </div>
                                <div className='flex items-center gap-[15px] min-w-[220px] max-w-[220px]'>
                                    <h1 className='text-black text-xs font-semibold'>Nama Pasien</h1>
                                </div>
                                <div className='flex items-center gap-[15px] min-w-[220px] max-w-[220px]'>
                                    <h1 className='text-black text-xs font-semibold'>Layanan</h1>
                                </div>
                                <div className='flex items-center gap-[15px] min-w-[220px] max-w-[220px]'>
                                    <h1 className='text-black text-xs font-semibold'>Catatan Perawatan</h1>
                                </div>
                                <div className='flex items-center justify-center gap-[15px] w-full'>
                                    <h1 className='text-black text-xs font-semibold'>Action</h1>
                                </div>
                            </div>
                            <div className='flex items-center gap-3 bg-white px-[14px] py-[8px] rounded-[3px] border-t'>
                                <div className='min-w-[100px] max-w-[100px]'>
                                    <h1 className='text-[#0B63F8] text-xs font-[600]'>#A1242161</h1>
                                </div>
                                <div className='min-w-[150px] max-w-[150px]'>
                                    <h1 className='text-[#737373] text-xs font-[600] line-clamp-1'>9 September 2024</h1>
                                </div>
                                <div className='min-w-[220px] max-w-[220px]'>
                                    <h1 className='text-[#737373] text-xs font-[600] line-clamp-1'>Muh Rizieq Fazlulrahman Djafar</h1>
                                </div>
                                <div className='min-w-[220px] max-w-[220px]'>
                                    <h1 className='text-[#737373] text-xs font-[600] line-clamp-1'>Cabut Gigi, Pasang Behel</h1>
                                </div>
                                <div className='min-w-[220px] max-w-[220px]'>
                                    <h1 className='w-[150px] text-xs p-2 font-medium bg-slate-600 text-white rounded-[9px]'>Lihat Catatan Perawatan</h1>
                                </div>
                                <div className='w-full space-x-2'>
                                    <button className='w-[50px] text-xs p-2 font-medium bg-slate-600 text-white rounded-[9px]'> Detail </button>
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

export default Dashboard