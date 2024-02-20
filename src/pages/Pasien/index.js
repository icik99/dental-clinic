import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import ModalDelete from '../../components/ModalDelete'
import Modal from '../../components/Modal'

export default function Pasien() {
    const navigate = useNavigate()
    const [deletePasien, setDeletePasien] = useState(false)
    const [detailPasien, setDetailPasien] = useState(false)
    const role = 'dokter'

    const hapusPasien = async () => {

    }
  return (
    <div>
        <Modal 
            activeModal={detailPasien}
            title={`Detail Pasien`}
            buttonClose={ () => setDetailPasien(!detailPasien)}
            width={'832px'}
            content= {
                <div className=' w-full space-y-[40px]'>
                    <div className='bg-[#F8F8F8] rounded-[15px] px-[19px] py-[31px] w-[773px] text-[#737373] text-[12px] font-semibold'>

                        <div className='grid grid-cols-12 mx-auto'>
                            <div className='col-span-3'>
                                <h1>Nama</h1>
                                <h1>Jenis Kelamin</h1>
                                <h1>Tempat Tanggal Lahir</h1>
                                <h1>Alamat</h1>
                                <h1>Pekerjaan</h1>
                                <h1>No Telepon</h1>
                                <h1>Alergi / Riwayat Penyakit</h1>
                            </div>
                            <div className='col-span-9'>
                                <h1>: Lorem ipsum dolor sit amet.</h1>
                                <h1>: Lorem ipsum dolor sit amet.</h1>
                                <h1>: Lorem ipsum dolor sit amet.</h1>
                                <h1>: Lorem ipsum dolor sit amet.</h1>
                                <h1>: Lorem ipsum dolor sit amet.</h1>
                                <h1>: Lorem ipsum dolor sit amet.</h1>
                                <h1>: Lorem ipsum dolor sit amet.</h1>
                            </div>
                        </div>
                    </div>

                </div>
                }
        />
        <ModalDelete
            activeModal={deletePasien}
            buttonClose={() => setDeletePasien(!deletePasien)}
            submitButton={hapusPasien}
        />
        <div className='min-h-screen bg-[#F2F2F2]'>
                <div className='flex w-full'>
                    <Sidebar />
                    <div className='w-full p-10'>
                        <div className='border-2 bg-white rounded-lg p-10 space-y-[20px]'>
                            <h1 className='text-2xl text-slate-black font-medium mb-[40px]'>Pasien</h1>
                            <Link to={'create'} className='px-3 py-2 border rounded-md shadow-sm text-sm bg-blue-700 text-white'>New Pasien</Link>
                            <table className='w-full space-y-[10px]'>
                                <div className='flex items-center gap-3 bg-white px-[14px] py-[10px] rounded-[3px]'>
                                    <div className='flex items-center gap-[15px] min-w-[100px] max-w-[100px]'>
                                        <h1 className='text-black text-xs font-semibold'>Id Pasien</h1>
                                    </div>
                                    <div className='flex items-center gap-[15px] min-w-[300px] max-w-[300px]'>
                                        <h1 className='text-black text-xs font-semibold'>Nama Pasien</h1>
                                    </div>
                                    <div className='flex items-center gap-[15px] min-w-[250px] max-w-[250px]'>
                                        <h1 className='text-black text-xs font-semibold'>Jenis Kelamin</h1>
                                    </div>
                                    <div className='flex items-center gap-[15px] min-w-[250px] max-w-[250px]'>
                                        <h1 className='text-black text-xs font-semibold'>No. Telepon</h1>
                                    </div>
                                    <div className=' w-full flex items-center justify-center'>
                                        <h1 className='text-black text-xs text-center font-semibold'>Action</h1>
                                    </div>
                                </div>
                                <div className='flex items-center gap-3 bg-white px-[14px] py-[8px] rounded-[3px] border-t'>
                                    <div className='min-w-[100px] max-w-[100px]'>
                                        <h1 className='text-[#0B63F8] text-xs font-[600]'>000001</h1>
                                    </div>
                                    <div className='min-w-[300px] max-w-[300px]'>
                                        {role === 'dokter' ? (
                                            <button onClick={() => navigate('/rekam-medis')} className='text-[#737373] text-xs font-[600] line-clamp-1 underline hover:text-blue-700'>Muh Rizieq Fazlurahman</button>

                                        ) : (
                                            <h1 className='text-[#737373] text-xs font-[600] line-clamp-1 '>Muh Rizieq Fazlurahman</h1>

                                        )}
                                    </div>
                                    <div className='min-w-[250px] max-w-[250px]'>
                                        <h1 className='text-[#737373] text-xs font-[600] line-clamp-1'>Lorem ipsum dolor sit amet.</h1>
                                    </div>
                                    <div className='flex items-center gap-[15px] min-w-[250px] max-w-[250px]'>
                                        <h1 className='text-[#737373]  text-xs font-semibold line'>Lorem ipsum dolor sit amet.</h1>
                                    </div>
                                    <div className='w-full space-x-2'>
                                        <button onClick={() => setDetailPasien(!detailPasien)} className='w-[50px] text-xs p-2 font-medium bg-slate-600 rounded-[9px] text-white'> Detail</button>
                                        <button onClick={() => navigate('update')}  className='w-[50px] text-xs p-2 font-medium bg-slate-600 rounded-[9px] text-white'> Edit</button>
                                        <button onClick={() => setDeletePasien(!deletePasien)} className='w-[50px] text-xs p-2 font-medium bg-slate-600 rounded-[9px] text-white'> Hapus</button>
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
