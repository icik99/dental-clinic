import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Api from '../../../Api';
import toast from 'react-hot-toast';
import Sidebar from '../../../components/Sidebar';

export default function CreatePasien() {
    const navigate = useNavigate()
    const [selectedServices, setSelectedServices] = useState([]);
    // create state
    const [tanggal, setTanggal] = useState()
    const [nama, setNama] = useState()
    const [jenisKelamin, setJenisKelamin] = useState()
    const [tempatLahir, setTempatLahir] = useState()
    const [tanggalLahir, setTanggalLahir] = useState()
    const [alamat, setAlamat] = useState()
    const [pekerjaan, setPekerjaan] = useState()
    const [telepon, setTelepon] = useState()
    const [alergi, setAlergi] = useState()

    const createPasien = async () => {
        try {
            const data = {
                fullname: nama,
                place_birth: tempatLahir,
                date_birth: tanggalLahir,
                gender: jenisKelamin,
                address: alamat,
                work: pekerjaan,
                phone: telepon,
                history_illness: alergi
            }
            const response = await Api.CreatePasien(localStorage.getItem('token'), data)
            toast.success('Berhasil Create Pasien')
            navigate('/pasien')
        } catch (error) {
            console.log(error)
            toast.error('Gagal Create Pasien')
        }
    }
  return (
    <div>
        <div className='min-h-screen bg-[#F2F2F2]'>
            <div className='flex w-full'>
                <Sidebar />
                <div className='w-full p-10'>
                    <div className='space-y-[20px] w-full p-5 bg-white border-2 rounded-lg'>
                    <h1 className='text-2xl text-slate-black font-medium mb-[20px]'>Create Pasien</h1>
                        <div className='text-sm space-y-2'>
                            <h1 className='font-medium'>Nama</h1>
                            <input onChange={(e) => setNama(e.target.value)} type="text" className='w-full border outline-none shadow-md px-2 py-2 rounded-md' placeholder='Nama Pasien....'/>
                        </div>
                        <div className='text-sm space-y-2'>
                            <h1 className='font-medium'>Jenis Kelamin</h1>
                            <select onChange={(e) => setJenisKelamin(e.target.value)} className='w-full border outline-none shadow-md px-2 py-2 rounded-md'>
                                <option value="">Pilih Jenis Kelamin</option>
                                <option value="Laki-Laki">Laki-Laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                        </div>
                        <div className='text-sm space-y-2'>
                            <h1 className='font-medium'>Tempat Tanggal Lahir</h1>
                            <div className='flex items-center gap-7'>
                                <input onChange={(e) => setTempatLahir(e.target.value)} type="text" className='w-full border outline-none shadow-md px-2 py-2 rounded-md' placeholder='Tempat....'/>
                                <input onChange={(e) => setTanggalLahir(e.target.value)} type="date" className='w-1/3 border outline-none shadow-md px-2 py-2 rounded-md' placeholder='Tempat, Tanggal Lahir....'/>

                            </div>
                        </div>
                        <div className='text-sm space-y-2'>
                            <h1 className='font-medium'>Alamat</h1>
                            <input onChange={(e) => setAlamat(e.target.value)} type="text" className='w-full border outline-none shadow-md px-2 py-2 rounded-md' placeholder='Alamat....'/>
                        </div>
                        <div className='text-sm space-y-2'>
                            <h1 className='font-medium'>Pekerjaan</h1>
                            <input onChange={(e) => setPekerjaan(e.target.value)} type="text" className='w-full border outline-none shadow-md px-2 py-2 rounded-md' placeholder='Pekerjaan....'/>
                        </div>
                        <div className='text-sm space-y-2'>
                            <h1 className='font-medium'>No Hp/Telepon</h1>
                            <input onChange={(e) => setTelepon(e.target.value)} type="number" className='w-full border outline-none shadow-md px-2 py-2 rounded-md' placeholder='No Hp/Telepon....'/>
                        </div>
                        <div className='text-sm space-y-2'>
                            <h1 className='font-medium'>Alergi / Riwayat Penyakit</h1>
                            <input onChange={(e) => setAlergi(e.target.value)} type="text" className='w-full border outline-none shadow-md px-2 py-2 rounded-md' placeholder='Alergi / Riwayat Penyakit....'/>
                        </div>

                        <div className='space-x-5 pt-7'>
                            <button onClick={() => navigate(-1)} className='py-2 px-5 border rounded-md border-blue-700  w-[100px] text-blue-700 text-lg'>
                                Cancel
                            </button>
                            <button onClick={createPasien} className='py-2 px-5 border rounded-md bg-blue-700 w-[100px] text-white text-lg'>
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}
