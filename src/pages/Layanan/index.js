import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { Link } from 'react-router-dom'
import Modal from '../../components/Modal'
import ModalDelete from '../../components/ModalDelete'
import Api from '../../Api'

import toast from 'react-hot-toast'

export default function Layanan() {
    const [addLayanan, setAddLayanan] = useState(false)
    const [editLayanan, setEditLayanan] = useState(false)
    const [deleteLayanan, setDeleteLayanan] = useState(false)
    const [namaLayanan, setNamaLayanan] = useState()
    const [hargaLayanan, setHargaLayanan] = useState()
    const [kodeLayanan, setKodeLayanan] = useState()
    const [idLayanan, setIdLayanan] = useState()
    const [dataLayanan, setDataLayanan] = useState('')
    const [addObat, setAddObat] = useState(false)
    const [editObat, setEditObat] = useState(false)
    const [deleteObat, setDeleteObat] = useState(false)
    const [namaObat, setNamaObat] = useState()
    const [hargaObat, setHargaObat] = useState()
    const [kodeObat, setKodeObat] = useState()
    const [idObat, setIdObat] = useState()
    const [dataObat, setDataObat] = useState('')
    const [refresh, setRefresh] = useState(false)

    const hapusLayanan = async () => {
        try {
            const response = await Api.DeleteLayanan(localStorage.getItem('token'), idLayanan)
            toast.success('Sukses Delete Layanan')
            setDeleteLayanan(!deleteLayanan)
            setRefresh(true)
        } catch (error) {
            console.log(error)
            toast.error('Gagal Delete Layanan')
        }
    }

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

    const actionHapusLayanan = async (id) => {
        setIdLayanan(id)
        setDeleteLayanan(!deleteLayanan)
        setRefresh(true)
    }

    const actionHapusObat = async (id) => {
        setIdObat(id)
        setDeleteObat(!deleteObat)
        setRefresh(true)
    }

    const tambahLayanan = async () => {
        const data ={
            code: kodeLayanan,
            name: namaLayanan,
            price: hargaLayanan
        }
        try {
            const response = await Api.CreateLayanan(localStorage.getItem('token'), data)
            toast.success('Success Create Layanan')
            setAddLayanan(!addLayanan)
            setRefresh(true)
        } catch (error) {
            console.log(error)
            toast.error('Failed Create Layanan')
        }
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

    const getLayanan = async () => {
        try {
            const response = await Api.GetLayanan(localStorage.getItem('token'))
            console.log('data', response.data)
            setDataLayanan(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getObat = async () => {
        try {
            const response = await Api.GetObat(localStorage.getItem('token'))
            console.log('data', response.data)
            setDataObat(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const openEditLayanan = async (id) => {
        setEditLayanan(!editLayanan)
        setIdLayanan(id)
        try {
            const response = await Api.GetLayananById(localStorage.getItem('token'), id)
            setKodeLayanan(response.data.data.code)
            setNamaLayanan(response.data.data.name)
            setHargaLayanan(response.data.data.price)
            console.log(response, 'byId')
        } catch (error) {
            
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

    const updateLayanan = async () => {
        try {
            const data ={
                code: kodeLayanan,
                name: namaLayanan,
                price: hargaLayanan
            }
            const response = await Api.UpdateLayanan(localStorage.getItem('token'), data, idLayanan)
            toast.success('Success Edit Layanan')
            setRefresh(true)
            setEditLayanan(!editLayanan)
        } catch (error) {
            console.log(error)
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

    useEffect(() => {
        getLayanan()
        getObat()
        setRefresh(false)
    }, [refresh])

  return (
    <div>
        <ModalDelete
            activeModal={deleteLayanan}
            buttonClose={() => setDeleteLayanan(!deleteLayanan)}
            submitButton={hapusLayanan}
        />
        <ModalDelete
            activeModal={deleteObat}
            buttonClose={() => setDeleteObat(!deleteObat)}
            submitButton={hapusObat}
        />
        <Modal 
            activeModal={addLayanan}
            title={'Tambah Layanan'}
            buttonClose={ () => setAddLayanan(!addLayanan)}
            width={'832px'}
            content= {
                <div className=' w-full space-y-[40px]'>
                    <div className='bg-[#F8F8F8] rounded-[15px] px-[19px] py-[31px] w-[773px] text-[#737373] text-[14px] font-medium space-y-[20px]'>
                        <div className='flex items-center'>
                            <h1 className='w-1/5'>Kode Layanan</h1>
                            <input onChange={(e) => setKodeLayanan(e.target.value)} type="text" className='px-4 py-2 border rounded-md outline-none w-full' placeholder='Kode Layanan...' />
                        </div>
                        <div className='flex items-center'>
                            <h1 className='w-1/5'>Nama Layanan</h1>
                            <input onChange={(e) => setNamaLayanan(e.target.value)} type="text" className='px-4 py-2 border rounded-md outline-none w-full' placeholder='Nama Layanan...' />
                        </div>
                        <div className='flex items-center'>
                            <h1 className='w-1/5'>Tarif (Rp.)</h1>
                            <input  onChange={(e) => setHargaLayanan(e.target.value)} type="number" className='px-4 py-2 border rounded-md outline-none w-full' placeholder='Tarif Layanan...' />
                        </div>
                    </div>
                    <div className='ml-[560px] flex items-start justify-end gap-3 w-1/4'>
                        <button onClick={() => setAddLayanan(!addLayanan)}  className="py-2 px-5 border rounded-md border-blue-700  w-[100px] text-blue-700 text-lg">Cancel</button>
                        <button onClick={tambahLayanan} className="py-2 px-5 border rounded-md bg-blue-700 w-[100px] text-white text-lg">Create</button>
                    </div>

                </div>
            }
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
                        <button onClick={() => setAddObat(!addObat)}  className="py-2 px-5 border rounded-md border-blue-700  w-[100px] text-blue-700 text-lg">Cancel</button>
                        <button onClick={tambahObat} className="py-2 px-5 border rounded-md bg-blue-700 w-[100px] text-white text-lg">Create</button>
                    </div>

                </div>
            }
        />

        <Modal 
            activeModal={editLayanan}
            title={'Edit Layanan'}
            buttonClose={ () => setEditLayanan(!editLayanan)}
            width={'832px'}
            content= {
                <div className=' w-full space-y-[40px]'>
                    <div className='bg-[#F8F8F8] rounded-[15px] px-[19px] py-[31px] w-[773px] text-[#737373] text-[14px] font-medium space-y-[20px]'>
                        <div className='flex items-center'>
                            <h1 className='w-1/5'>Kode Layanan</h1>
                            <input  onChange={(e) => setKodeLayanan(e.target.value)} value={kodeLayanan} type="text" className='px-4 py-2 border rounded-md outline-none w-full' placeholder='Kode Layanan...' />
                        </div>
                        <div className='flex items-center'>
                            <h1 className='w-1/5'>Nama Layanan</h1>
                            <input  onChange={(e) => setNamaLayanan(e.target.value)} value={namaLayanan} type="text" className='px-4 py-2 border rounded-md outline-none w-full' placeholder='Nama Layanan...' />
                        </div>
                        <div className='flex items-center'>
                            <h1 className='w-1/5'>Tarif (Rp.)</h1>
                            <input  onChange={(e) => setHargaLayanan(e.target.value)} value={hargaLayanan} type="number" className='px-4 py-2 border rounded-md outline-none w-full' placeholder='Tarif Layanan...' />
                        </div>
                    </div>
                    <div className='ml-[560px] flex items-start justify-end gap-3 w-1/4'>
                        <button onClick={() => setEditLayanan(!editLayanan)}  className="py-2 px-5 border rounded-md border-blue-700  w-[100px] text-blue-700 text-lg">Cancel</button>
                        <button onClick={updateLayanan} className="py-2 px-5 border rounded-md bg-blue-700 w-[100px] text-white text-lg">Save</button>
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
                        <button onClick={() => setEditObat(!editObat)}  className="py-2 px-5 border rounded-md border-blue-700  w-[100px] text-blue-700 text-lg">Cancel</button>
                        <button onClick={updateObat} className="py-2 px-5 border rounded-md bg-blue-700 w-[100px] text-white text-lg">Save</button>
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
                    <div>
                        <div className='border-2 bg-white rounded-lg p-10 space-y-[20px]'>
                            <h1 className='text-2xl text-slate-black font-medium mb-[40px]'>Layanan</h1>
                            <button onClick={() => setAddLayanan(!addLayanan)} className='px-3 py-2 border rounded-md shadow-sm text-sm bg-blue-700 text-white'>Tambah Layanan Baru</button>
                            <table className='w-full space-y-[10px]'>
                                <div className='flex items-center gap-3 bg-white px-[14px] py-[10px] rounded-[3px]'>
                                    <div className='flex items-center gap-[15px] min-w-[200px] max-w-[200px]'>
                                        <h1 className='text-black text-xs font-semibold'>Kode Layanan</h1>
                                    </div>
                                    <div className='flex items-center gap-[15px] min-w-[500px] max-w-[500px]'>
                                        <h1 className='text-black text-xs font-semibold'>Nama Layanan</h1>
                                    </div>
                                    <div className='flex items-center gap-[15px] min-w-[100px] max-w-[100px]'>
                                        <h1 className='text-black text-xs font-semibold'>Harga</h1>
                                    </div>
                                    <div className=' w-full flex items-center justify-center'>
                                        <h1 className='text-black text-xs text-center font-semibold'>Action</h1>
                                    </div>
                                </div>
                                {Object.values(dataLayanan).map((item, idx) => (
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
                                        <div className='w-full space-x-2'>
                                            <button onClick={() => openEditLayanan(item.id)} className='w-[50px] text-xs p-2 font-medium bg-slate-600 rounded-[9px] text-white'> Edit</button>
                                            <button onClick={() => actionHapusLayanan(item.id)} className='w-[50px] text-xs p-2 font-medium bg-slate-600 rounded-[9px] text-white'> Hapus</button>
                                        </div>
                                    </div>
                                ))}
                            </table>
                        </div>
                    </div>
                    <div className='mt-10'>
                        <div className='border-2 bg-white rounded-lg p-10 space-y-[20px]'>
                            <h1 className='text-2xl text-slate-black font-medium mb-[40px]'>Obat</h1>
                            <button onClick={() => setAddObat(!addObat)} className='px-3 py-2 border rounded-md shadow-sm text-sm bg-blue-700 text-white'>Tambah Obat Baru</button>
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
                                        <div className='w-full space-x-2'>
                                            <button onClick={() => openEditObat(item.id)} className='w-[50px] text-xs p-2 font-medium bg-slate-600 rounded-[9px] text-white'> Edit</button>
                                            <button onClick={() => actionHapusObat(item.id)} className='w-[50px] text-xs p-2 font-medium bg-slate-600 rounded-[9px] text-white'> Hapus</button>
                                        </div>
                                    </div>
                                ))}
                            </table>
                        </div>
                    </div>

                    </div>
                </div>
            </div>
    </div>
  )
}
