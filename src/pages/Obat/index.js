import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { Link } from 'react-router-dom'
import Modal from '../../components/Modal'
import ModalDelete from '../../components/ModalDelete'
import Api from '../../Api'

import toast from 'react-hot-toast'
import Pagination from '../../components/Pagination'

export default function Obat() {
    const [addObat, setAddObat] = useState(false)
    const [editObat, setEditObat] = useState(false)
    const [deleteObat, setDeleteObat] = useState(false)
    const [namaObat, setNamaObat] = useState()
    const [hargaObat, setHargaObat] = useState()
    const [kodeObat, setKodeObat] = useState()
    const [idObat, setIdObat] = useState()
    const [dataObat, setDataObat] = useState('')
    const [refresh, setRefresh] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState('')


    const hapusObat = async () => {
        try {
            const response = await Api.DeleteObat(localStorage.getItem('token'), idObat)
            toast.success('Sukses Delete Obat')
            setDeleteObat(!deleteObat)
            setRefresh(true)
        } catch (error) {
            console.log(error)
            toast.error('Gagal Delete Obat')
        }
    }

    const actionHapusObat = async (id) => {
        setIdObat(id)
        setDeleteObat(!deleteObat)
        setRefresh(true)
    }


    const tambahObat = async () => {
        const data ={
            code: kodeObat,
            name: namaObat,
            price: hargaObat
        }
        try {
            const response = await Api.CreateObat(localStorage.getItem('token'), data)
            toast.success('Success Create Obat')
            setAddObat(!addObat)
            setRefresh(true)
        } catch (error) {
            console.log(error)
            toast.error('Failed Create Obat')
        }
    }


    const getObat = async () => {
        try {
            const response = await Api.GetObat(localStorage.getItem('token'), currentPage, '', '', 10)
            console.log('data Obat', response.data)
            setDataObat(response.data.data)
            setTotalPages(response.data.totalPages)
            setCurrentPage(parseInt(response.data.currentPages, 10))
        } catch (error) {
            console.log(error)
        }
    }


    const openEditObat = async (id) => {
        setEditObat(!editObat)
        setIdObat(id)
        try {
            const response = await Api.GetObatById(localStorage.getItem('token'), id)
            setKodeObat(response.data.data.code)
            setNamaObat(response.data.data.name)
            setHargaObat(response.data.data.price)
            console.log(response, 'byId')
        } catch (error) {
            
        }
    }


    const updateObat = async () => {
        try {
            const data ={
                code: kodeObat,
                name: namaObat,
                price: hargaObat
            }
            const response = await Api.UpdateObat(localStorage.getItem('token'), data, idObat)
            toast.success('Success Edit Obat')
            setRefresh(true)
            setEditObat(!editObat)
        } catch (error) {
            console.log(error)
        }
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setRefresh(true)
    };
    
    const handlePrevChange = () => {
        if(currentPage === 1) {
            setCurrentPage(1)
        } else {
            setCurrentPage(currentPage - 1);
        }
        setRefresh(true)
    };
    
    const handleNextChange = () => {
        if(currentPage === totalPages) {
            setCurrentPage(totalPages)
        } else {
            setCurrentPage(currentPage + 1);
        }
        setRefresh(true)
    };

    useEffect(() => {
        getObat()
        setRefresh(false)
    }, [refresh])

  return (
    <div>
        <ModalDelete
            activeModal={deleteObat}
            buttonClose={() => setDeleteObat(!deleteObat)}
            submitButton={hapusObat}
        />
        <Modal 
            activeModal={addObat}
            title={'Tambah Obat'}
            buttonClose={ () => setAddObat(!addObat)}
            width={'832px'}
            content= {
                <div className=' w-full space-y-[40px]'>
                    <div className='bg-[#F8F8F8] rounded-[15px] px-[19px] py-[31px] w-[773px] text-[#737373] text-[14px] font-medium space-y-[20px]'>
                        <div className='flex items-center'>
                            <h1 className='w-1/5'>Kode Obat</h1>
                            <input onChange={(e) => setKodeObat(e.target.value)} type="text" className='px-4 py-2 border rounded-md outline-none w-full' placeholder='Kode Obat...' />
                        </div>
                        <div className='flex items-center'>
                            <h1 className='w-1/5'>Nama Obat</h1>
                            <input onChange={(e) => setNamaObat(e.target.value)} type="text" className='px-4 py-2 border rounded-md outline-none w-full' placeholder='Nama Obat...' />
                        </div>
                        <div className='flex items-center'>
                            <h1 className='w-1/5'>Tarif (Rp.)</h1>
                            <input  onChange={(e) => setHargaObat(e.target.value)} type="number" className='px-4 py-2 border rounded-md outline-none w-full' placeholder='Tarif Obat...' />
                        </div>
                    </div>
                    <div className='ml-[560px] flex items-start justify-end gap-3 w-1/4'>
                        <button onClick={() => setAddObat(!addObat)}  className="py-2 px-5 border rounded-md border-purple-700  w-[100px] text-purple-700 text-lg">Cancel</button>
                        <button onClick={tambahObat} className="py-2 px-5 border rounded-md bg-purple-700 w-[100px] text-white text-lg">Create</button>
                    </div>

                </div>
            }
        />


        <Modal 
            activeModal={editObat}
            title={'Edit Obat'}
            buttonClose={ () => setEditObat(!editObat)}
            width={'832px'}
            content= {
                <div className=' w-full space-y-[40px]'>
                    <div className='bg-[#F8F8F8] rounded-[15px] px-[19px] py-[31px] w-[773px] text-[#737373] text-[14px] font-medium space-y-[20px]'>
                        <div className='flex items-center'>
                            <h1 className='w-1/5'>Kode Obat</h1>
                            <input  onChange={(e) => setKodeObat(e.target.value)} value={kodeObat} type="text" className='px-4 py-2 border rounded-md outline-none w-full' placeholder='Kode Obat...' />
                        </div>
                        <div className='flex items-center'>
                            <h1 className='w-1/5'>Nama Obat</h1>
                            <input  onChange={(e) => setNamaObat(e.target.value)} value={namaObat} type="text" className='px-4 py-2 border rounded-md outline-none w-full' placeholder='Nama Obat...' />
                        </div>
                        <div className='flex items-center'>
                            <h1 className='w-1/5'>Tarif (Rp.)</h1>
                            <input  onChange={(e) => setHargaObat(e.target.value)} value={hargaObat} type="number" className='px-4 py-2 border rounded-md outline-none w-full' placeholder='Tarif Obat...' />
                        </div>
                    </div>
                    <div className='ml-[560px] flex items-start justify-end gap-3 w-1/4'>
                        <button onClick={() => setEditObat(!editObat)}  className="py-2 px-5 border rounded-md border-purple-700  w-[100px] text-purple-700 text-lg">Cancel</button>
                        <button onClick={updateObat} className="py-2 px-5 border rounded-md bg-purple-700 w-[100px] text-white text-lg">Save</button>
                    </div>

                </div>
            }
        />
        <div className='min-h-screen bg-[#F2F2F2]'>
                <div className='flex w-full'>
                    <div className='w-fit'>
                        <Sidebar />
                    </div>
                    <div className='w-full p-10'>
                    
                    <div className='mt-10'>
                        <div className='border-2 bg-white rounded-lg p-10 space-y-[20px]'>
                            <h1 className='text-2xl text-purple-black font-medium mb-[40px]'>Daftar Obat</h1>
                            <button onClick={() => setAddObat(!addObat)} className='px-3 py-2 border rounded-md shadow-sm text-sm bg-purple-700 text-white'>Tambah Obat Baru</button>
                            <table className='w-full space-y-[10px]'>
                                <div className='flex items-center gap-3 bg-white px-[14px] py-[10px] rounded-[3px]'>
                                    <div className='flex items-center gap-[15px] min-w-[200px] max-w-[200px]'>
                                        <h1 className='text-black text-xs font-semibold'>Kode Obat</h1>
                                    </div>
                                    <div className='flex items-center gap-[15px] min-w-[500px] max-w-[500px]'>
                                        <h1 className='text-black text-xs font-semibold'>Nama Obat</h1>
                                    </div>
                                    <div className='flex items-center gap-[15px] min-w-[100px] max-w-[100px]'>
                                        <h1 className='text-black text-xs font-semibold'>Harga</h1>
                                    </div>
                                    <div className=' w-full flex items-center justify-center'>
                                        <h1 className='text-black text-xs text-center font-semibold'>Action</h1>
                                    </div>
                                </div>
                                {Object.values(dataObat).map((item, idx) => (
                                    <div key={idx} className='flex items-center gap-3 bg-white px-[14px] py-[8px] rounded-[3px] border-t'>
                                        <div className='min-w-[200px] max-w-[200px]'>
                                            <h1 className='text-[#737373] text-xs font-[600] line-clamp-1'>{item.code}</h1>
                                        </div>
                                        <div className='min-w-[500px] max-w-[500px]'>
                                            <h1 className='text-[#737373] text-xs font-[600] line-clamp-1'>{item.name}</h1>
                                        </div>
                                        <div className='min-w-[100px] max-w-[100px]'>
                                            <h1 className='text-[#737373] text-xs font-[600] line-clamp-1'>Rp. {item.price}</h1>
                                        </div>
                                        <div className='w-full flex justify-center space-x-2'>
                                            <button onClick={() => openEditObat(item.id)} className='w-[50px] text-xs p-2 font-medium bg-purple-600 rounded-[9px] text-white'> Edit</button>
                                            <button onClick={() => actionHapusObat(item.id)} className='w-[50px] text-xs p-2 font-medium bg-purple-600 rounded-[9px] text-white'> Hapus</button>
                                        </div>
                                    </div>
                                ))}
                            </table>
                            <Pagination
                                currentPage={currentPage} 
                                totalPages={totalPages} 
                                onPageChange={handlePageChange}
                                onPrevChange={handlePrevChange}
                                onNextChange={handleNextChange}
                            />
                        </div>
                    </div>

                    </div>
                </div>
            </div>
    </div>
  )
}
