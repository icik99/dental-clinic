import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Modal from '../../components/Modal';
import ModalDelete from '../../components/ModalDelete';
import { Link, useNavigate } from 'react-router-dom';

export default function RekamMedis() {
    const [detailRekamMedis, setDetailRekamMedis] = useState(false)
    const [hapusRekamMedis, setHapusRekamMedis] = useState(false)
    const navigate = useNavigate()

    const deleteRekamMedis = async () => {

    }
    return (
        <div>
            <Modal 
            activeModal={detailRekamMedis}
            title={'Detail Rekam Medis'}
            buttonClose={ () => setDetailRekamMedis(!detailRekamMedis)}
            width={'832px'}
            content= {
                <div className=' w-full space-y-[40px]'>
                    <div className='bg-[#F8F8F8] rounded-[15px] px-[19px] py-[31px] w-[773px] text-[#737373] text-[12px] font-semibold'>
                        <div className='font-bold text mb-5 space-y-2'>
                            <h1>ID Pelanggan : A1245</h1>
                            <h1 className='col-span-3'>Tanggal: 17 Februari 2024</h1>
                            <hr className='border-1'/>
                        </div>

                        <div className='grid grid-cols-12 mx-auto'>
                            <div className='col-span-3'>
                                
                                <h1>Nama Pasien</h1>
                                <h1>Tempat, Tanggal Lahir</h1>
                                <h1>Jenis Kelamin</h1>
                                <h1>No Telepon</h1>
                                <h1>Alamat</h1>
                                <h1>Pekerjaan</h1>
                                <h1>Alergi / Riwayat Penyakit</h1>
                                <h1>Nama KK</h1>
                                <h1>Diagnosa</h1>
                                <h1>Terapi</h1>
                                <h1>Keterangan</h1>
                                <h1>Layanan</h1>
                            </div>
                            <div className='col-span-9'>
                                
                                <h1>: Muh Rizieq Fazlulrahman Djafar</h1>
                                <h1>: Palu, 9 September 2002</h1>
                                <h1>: Laki-laki</h1>
                                <h1>: 081946635642</h1>
                                <h1>: Berkoh Indah Blok E2 No. 284</h1>
                                <h1>: Mahasiswa</h1>
                                <h1>: Ampicilin</h1>
                                <h1>: Redoverae</h1>
                                <h1>: -</h1>
                                <h1>: -</h1>
                                <h1>: -</h1>
                                <h1>: Gigi Copot, Dll</h1>
                            </div>
                        </div>
                    </div>

                </div>}
            />
            <ModalDelete
                activeModal={hapusRekamMedis}
                buttonClose={() => setHapusRekamMedis(!hapusRekamMedis)}
                submitButton={deleteRekamMedis}
            />
            <div className='min-h-screen bg-[#F2F2F2]'>
                <div className='flex w-full'>
                    <Sidebar />
                    <div className='w-full p-10'>
                        <div className='border-2 bg-white rounded-lg p-10 space-y-[20px]'>
                            <h1 className='text-2xl text-slate-black font-medium mb-[60px]'>Rekam Medis</h1>
                            <Link to={'create'} className='px-3 py-2 border rounded-md shadow-sm text-sm bg-blue-700 text-white'>New Record</Link>
                            <table className='w-full space-y-[10px]'>
                                <div className='flex items-center gap-3 bg-white px-[14px] py-[10px] rounded-[3px]'>
                                    <div className='flex items-center gap-[15px] min-w-[100px] max-w-[100px]'>
                                        <h1 className='text-black text-xs font-semibold'>No Registrasi</h1>
                                    </div>
                                    <div className='flex items-center gap-[15px] min-w-[100px] max-w-[100px]'>
                                        <h1 className='text-black text-xs font-semibold'>Tanggal</h1>
                                    </div>
                                    <div className='flex items-center gap-[15px] min-w-[200px] max-w-[200px]'>
                                        <h1 className='text-black text-xs font-semibold'>Nama Pasien</h1>
                                    </div>
                                    <div className='flex items-center gap-[15px] min-w-[80px] max-w-[80px]'>
                                        <h1 className='text-black text-xs font-semibold'>Jenis Kelamin</h1>
                                    </div>
                                    <div className='flex items-center gap-[15px] min-w-[100px] max-w-[100px]'>
                                        <h1 className='text-black text-xs font-semibold'>No. Telepon</h1>
                                    </div>
                                    <div className='flex items-center gap-[15px] min-w-[300px] max-w-[300px]'>
                                        <h1 className='text-black text-xs font-semibold'>Layanan</h1>
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
                                    <div className='min-w-[200px] max-w-[200px]'>
                                        <h1 className='text-[#737373] text-xs font-[600] line-clamp-1'>Muh Rizieq Fazlulrahman Djafar</h1>
                                    </div>
                                    <div className='min-w-[80px] max-w-[80px]'>
                                        <h1 className='text-[#737373] text-xs font-[600] line-clamp-1'>Laki-Laki</h1>
                                    </div>
                                    <div className='flex items-center gap-[15px] min-w-[100px] max-w-[100px]'>
                                        <h1 className='text-[#737373]  text-xs font-semibold line'>08123456789</h1>
                                    </div>
                                    <div className='min-w-[300px] max-w-[300px]'>
                                        <h1 className='text-[#737373] text-xs font-[600] line-clamp-1'>Pencabutan Gigi, Pembersihan Karang Gigi</h1>
                                    </div>
                                    <div className='w-full space-x-2'>
                                        <button onClick={() => setDetailRekamMedis(!detailRekamMedis)} className='w-[50px] text-xs p-2 font-medium bg-slate-600 text-white rounded-[9px]'> Detail </button>
                                        <button onClick={() => navigate('/rekam-medis/update')} className='w-[50px] text-xs p-2 font-medium bg-slate-600 rounded-[9px] text-white'> Edit</button>
                                        <button onClick={() => setHapusRekamMedis(!hapusRekamMedis)} className='w-[50px] text-xs p-2 font-medium bg-slate-600 rounded-[9px] text-white'> Hapus</button>
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
