import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import { MdDelete } from "react-icons/md";
import { useLocation, useNavigate } from 'react-router-dom';
import Api from '../../../Api';
import toast from 'react-hot-toast';
import Odontogram from '../../../components/NewOdontogram/odontogram';
import html2canvas from 'html2canvas';

export default function CreateRekamMedis() {
    const [dataOdontogram, setDataOdontogram] = useState([]);

    const params = useLocation()
    const navigate = useNavigate()
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedObatServices, setSelectedObatServices] = useState([]);

    // create state
    const [tanggal, setTanggal] = useState()
    const [diagnosa, setDiagnosa] = useState()
    const [terapi, setTerapi] = useState()
    const [keterangan, setKeterangan] = useState()
    const [dataLayanan, setDataLayanan] = useState([])
    const [dataObat, setDataObat] = useState([])
    const [idPasien, setIdPasien] = useState('')
    const [dataPasien, setDataPasien] = useState('')


      const getImage = async () => {
        const node = document.getElementById('my-node');
        if (!node) {
            console.error('Node element not found');
            return '';
        }
        try {
            const canvas = await html2canvas(node);
            const dataUrl = canvas.toDataURL('image/png');
            return dataUrl;
        } catch (error) {
            console.error('Error generating image:', error);
            return '';
        }
    };
  
    const [informContent, setInformContent] = useState(false);

    const [namaKeluarga, setNamaKeluarga] = useState('')
    const [jenisKelaminKeluarga, setJenisKelaminKeluarga] = useState('')
    const [alamatKeluarga, setAlamatKeluarga] = useState('')
    const [telpKeluarga, setTelpKeluarga] = useState('')

    // Handler untuk menghandle perubahan nilai checkbox
    const handleCheckboxChange = (event) => {
      setInformContent(event.target.checked);
    };

    const createRekamMedis = async () => {
        if (!informContent){
            toast.error('Wajib meminta persetujuan keluarga pasien dengan mencentang dan mengisi inform content!')
        } else {
            try {
                const data = {
                    date: tanggal,
                    patient_id: params.state ? params.state.idPasien : idPasien,
                    service : selectedServices,
                    obat : selectedObatServices,
                    diagnosis: diagnosa,
                    therapy: terapi,
                    description: keterangan,
                    odontogram: dataOdontogram,
                    namaKeluarga: namaKeluarga,
                    jenisKelaminKeluarga: jenisKelaminKeluarga,
                    alamatKeluarga: alamatKeluarga,
                    telpKeluarga: telpKeluarga,
                    statusInformContent: informContent
                }
                console.log(data, 'data')
                const response = await Api.CreateRekamMedis(localStorage.getItem('token'), data)
                toast.success('Berhasil Create Rekam Medis')
                navigate(-1)
            } catch (error) {
                console.log(error)
                toast.error('Gagal Create Rekam Medis')
            }
        }
    }

    const getLayanan = async () => {
        try {
            const response = await Api.GetLayanan(localStorage.getItem('token'), '', '', '')
            setDataLayanan(response.data.data.map(({ name, price, id }) => ({ name, price, id })))
        } catch (error) {
            console.log(error)
        }
    }

    const getObat = async () => {
        try {
            const response = await Api.GetObat(localStorage.getItem('token'), '','','')
            setDataObat(response.data.data.map(({ name, price, id }) => ({ name, price, id })))
        } catch (error) {
            console.log(error)
        }
    }

    const getPasien = async () => {
        try {
            const res = await Api.GetPasien(localStorage.getItem('token'), '', '')
            setDataPasien(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleServiceChange = (serviceId, action) => {
        const selectedService = dataLayanan.find(service => service.id === serviceId);
        if (action === 'add') {
        setSelectedServices([...selectedServices, selectedService]);
        } else if (action === 'delete') {
        const updatedServices = selectedServices.filter(service => service.id !== serviceId);
        setSelectedServices(updatedServices);
        }
    };

    const handleServiceObatChange = (serviceId, action) => {
        const selectedObatService = dataObat.find(service => service.id === serviceId);
        if (action === 'add') {
        setSelectedObatServices([...selectedObatServices, selectedObatService]);
        } else if (action === 'delete') {
        const updatedServices = selectedObatServices.filter(service => service.id !== serviceId);
        setSelectedObatServices(updatedServices);
        }
    };

    useEffect(() => {
        getLayanan()
        getPasien()
        getObat()
    },[])

    return (
        <div>
            <div className='min-h-screen bg-[#F2F2F2]'>
                <div className='flex w-full'>
                    <Sidebar />
                    <div className='w-full p-10'>
                        <div className='space-y-[20px] w-full p-5 bg-white border-2 rounded-lg'>
                        <h1 className='text-2xl text-slate-black font-medium mb-[20px]'>Create Rekam Medis</h1>
                            {params.state === null && (
                                <div className='text-sm space-y-2'>
                                    <h1 className='font-medium'>Nama Pasien</h1>
                                    <select onChange={(e) => setIdPasien(e.target.value)} className='w-full border outline-none shadow-md px-2 py-2 rounded-md'>
                                        <option value="">Select Pasien...</option>
                                        {Object.values(dataPasien).map((item, idx) => (
                                            <option key={idx} value={item.id}>{item.fullname}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                            <div className='text-sm space-y-2'>
                                <h1 className='font-medium'>Tanggal</h1>
                                <input onChange={(e) => setTanggal(e.target.value)} type="date" className='w-full border outline-none shadow-md px-2 py-2 rounded-md'/>
                            </div>
                            <div className='text-sm w-full gap-3 space-y-4'>
                                <div className='w-full space-y-2 mb-4'>
                                    <h1 className='font-medium'>Layanan</h1>
                                    <select
                                    className='w-full border shadow-md px-2 outline-none py-2 rounded-md'
                                    onChange={(e) => handleServiceChange(e.target.value, 'add')}
                                    >
                                    <option disabled selected value="">Pilih Layanan...</option>
                                    {dataLayanan.map(service => (
                                        <option key={service.id} value={service.id}>{service.name}</option>
                                    ))}
                                    </select>
                                </div>
                                <div className='flex flex-row items-start gap-3'>
                                    {selectedServices.map(service => (
                                        <div key={service.id} className='px-6 py-2 w-full gap-10 rounded-md space-y-2 bg-slate-200 flex items-center'>
                                            <div>
                                                <h1>{service.name}</h1>
                                                <h2 className='font-medium'>Rp. {service.price.toLocaleString()}</h2>
                                            </div>
                                            <div className='flex items-center justify-center gap-1'>
                                                <button className='p-2 border rounded-md bg-red-700 text-white text-lg' onClick={() => handleServiceChange(service.id, 'delete')} >
                                                    <MdDelete />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='text-sm w-full gap-3 space-y-4'>
                                <div className='w-full space-y-2 mb-4'>
                                    <h1 className='font-medium'>Obat</h1>
                                    <select
                                    className='w-full border shadow-md px-2 outline-none py-2 rounded-md'
                                    onChange={(e) => handleServiceObatChange(e.target.value, 'add')}
                                    >
                                    <option disabled selected value="">Pilih Obat...</option>
                                    {dataObat.map(service => (
                                        <option key={service.id} value={service.id}>{service.name}</option>
                                    ))}
                                    </select>
                                </div>
                                <div className='flex flex-row items-start gap-3'>
                                    {selectedObatServices.map(service => (
                                        <div key={service.id} className='px-6 py-2 w-full gap-10 rounded-md space-y-2 bg-slate-200 flex items-center'>
                                            <div>
                                                <h1>{service.name}</h1>
                                                <h2 className='font-medium'>Rp. {service.price.toLocaleString()}</h2>
                                            </div>
                                            <div className='flex items-center justify-center gap-1'>
                                                <button className='p-2 border rounded-md bg-red-700 text-white text-lg' onClick={() => handleServiceObatChange(service.id, 'delete')} >
                                                    <MdDelete />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='text-sm border-2 w-full rounded-md p-3'>
                                <h1 className='mb-3 font-medium'>Odontogram:</h1>
                                {/* <Odontogram/> */}
                                <div id='my-node'>
                                <Odontogram
                                    tooth={(labelT, zoneT, idT) => {
                                        setDataOdontogram((oldArray) => [
                                        ...oldArray,
                                        {
                                            label: labelT,
                                            nomorGigi: zoneT,
                                            id: idT,
                                        },
                                        ]);
                                    }}
                                    rtooth={(id) => {
                                        setDataOdontogram((current) =>
                                            current.filter((obj) => {
                                            return obj.id !== id;
                                            })
                                        );
                                    }}
                                />
                                </div>
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
                            <div className='text-sm  space-y-2 flex gap-2 items-center'>
                                <h3 className='font-medium text-sm'>Inform Content</h3>
                                <label>
                                    <input
                                    type="checkbox"
                                    checked={informContent}
                                    onChange={handleCheckboxChange}
                                    />
                                </label>
                            </div>
                            {informContent && (
                                <>
                                <div className='text-sm space-y-2'>
                                    <h1 className='font-medium text-lg underline'>Informasi Keluarga Pasien</h1>
                                    <h1 className='font-medium'>Nama</h1>
                                    <input onChange={(e) => setNamaKeluarga(e.target.value)} type="text" className='w-full border outline-none shadow-md px-2 py-2 rounded-md' placeholder='Nama....'/>
                                </div>

                                <div className='text-sm space-y-2'>
                                    <h1 className='font-medium'>Jenis Kelamin</h1>
                                    <select onChange={(e) => setJenisKelaminKeluarga(e.target.value)} type="text" className='w-full border outline-none shadow-md px-2 py-2 rounded-md' placeholder='Jenis Kelamin....'>
                                        <option value="">Pilih Jenis Kelamin...</option>
                                        <option value="Laki-Laki">Laki-Laki</option>
                                        <option value="Perempuan">Perempuan</option>
                                    </select>
                                </div>
                                <div className='text-sm space-y-2'>
                                    <h1 className='font-medium'>Alamat</h1>
                                    <input onChange={(e) => setAlamatKeluarga(e.target.value)} type="text" className='w-full border outline-none shadow-md px-2 py-2 rounded-md' placeholder='Alamat....'/>
                                </div>
                                <div className='text-sm space-y-2'>
                                    <h1 className='font-medium'>No Telepon / HP</h1>
                                    <input onChange={(e) => setTelpKeluarga(e.target.value)} type="number" className='w-full border outline-none shadow-md px-2 py-2 rounded-md' placeholder='Telepon....'/>
                                </div>
                                </>
                            )}

                            <div className='space-x-5 pt-7'>
                                <button onClick={() => navigate(-1)} className='py-2 px-5 border rounded-md border-purple-700  w-[100px] text-purple-700 text-lg'>
                                    Cancel
                                </button>
                                <button onClick={createRekamMedis} className='py-2 px-5 border rounded-md bg-purple-700 w-[100px] text-white text-lg'>
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
