import React, { useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import Odontogram from '../../../components/Odontogram/Odontogram'
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Api from '../../../Api';
import toast from 'react-hot-toast';

export default function CreateRekamMedis() {
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
    const [namaKK, setNamaKK] = useState()
    const [diagnosa, setDiagnosa] = useState()
    const [terapi, setTerapi] = useState()
    const [keterangan, setKeterangan] = useState()

    const createRekamMedis = async () => {
        try {
            const data = {
                date: tanggal,
                name: nama,
                place_birth: tempatLahir,
                date_birth: tanggalLahir,
                gender: jenisKelamin,
                address: alamat,
                work: pekerjaan,
                phone: telepon,
                history_illness: alergi,
                service : selectedServices,
                diagnosis: diagnosa,
                therapy: terapi,
                status: 'proses',
                description: keterangan,
                // odontogram:{
                //     oke: masuk,
                //     sip: ya
                // }
            }
            console.log(data, 'data')
            const response = await Api.CreateRekamMedis(localStorage.getItem('token'), data)
            toast.success('Berhasil Create Rekam Medis')
            navigate('/rekam-medis')
        } catch (error) {
            console.log(error)
            toast.error('Gagal Create Rekam Medis')
        }
    }


    const initialServices = [
        { id: 1, name: 'Cabut Gigi', price: 300000 },
        { id: 2, name: 'Pasang Behel', price: 400000 },
        { id: 3, name: 'Tambal Gigi', price: 500000 },
    ];
    const handleServiceChange = (serviceId, action) => {
        const selectedService = initialServices.find(service => service.id === serviceId);
    
        if (action === 'add') {
        setSelectedServices([...selectedServices, selectedService]);
        } else if (action === 'delete') {
        const updatedServices = selectedServices.filter(service => service.id !== serviceId);
        setSelectedServices(updatedServices);
        }
    };
    console.log(selectedServices, 'selected')

    return (
        <div>
            <div className='min-h-screen bg-[#F2F2F2]'>
                <div className='flex w-full'>
                    <Sidebar />
                    <div className='w-full p-10'>
                        <div className='space-y-[20px] w-full p-5 bg-white border-2 rounded-lg'>
                        <h1 className='text-2xl text-slate-black font-medium mb-[20px]'>Create Rekam Medis</h1>
                            <div className='text-sm space-y-2'>
                                <h1 className='font-medium'>Tanggal</h1>
                                <input onChange={(e) => setTanggal(e.target.value)} type="date" className='w-full border outline-none shadow-md px-2 py-2 rounded-md' placeholder='Nama Pasien....'/>
                            </div>
                           
                            <div className='text-sm border-2 w-full rounded-md p-3'>
                                <h1 className='mb-3 font-medium'>Odontogram:</h1>
                                <Odontogram />
                            </div>

                            <div className='text-sm space-y-2'>
                                <h1 className='font-medium text-lg underline'>Catatan Perawatan</h1>
                                <h1 className='font-medium'>Diagnosa</h1>
                                <input onChange={(e) => setDiagnosa(e.target.value)} type="text" className='w-full border outline-none shadow-md px-2 py-2 rounded-md' placeholder='Diagnosa....'/>
                            </div>

                            <div className='text-sm space-y-2'>
                                <h1 className='font-medium'>Terapi</h1>
                                <input onChange={(e) => setTerapi(e.target.value)} type="text" className='w-full border outline-none shadow-md px-2 py-2 rounded-md' placeholder='Terapi....'/>
                            </div>
                            <div className='text-sm space-y-2'>
                                <h1 className='font-medium'>Keterangan</h1>
                                <input onChange={(e) => setKeterangan(e.target.value)} type="text" className='w-full border outline-none shadow-md px-2 py-2 rounded-md' placeholder='Keterangan....'/>
                            </div>

                            <div className='space-x-5 pt-7'>
                                <button onClick={() => navigate(-1)} className='py-2 px-5 border rounded-md border-blue-700  w-[100px] text-blue-700 text-lg'>
                                    Cancel
                                </button>
                                <button onClick={createRekamMedis} className='py-2 px-5 border rounded-md bg-blue-700 w-[100px] text-white text-lg'>
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
