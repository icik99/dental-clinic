import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import { useLocation, useNavigate } from 'react-router-dom';
import Api from '../../../Api';
import toast from 'react-hot-toast';

export default function UpdatePasien() {
    const navigate = useNavigate()
    const params = useLocation()
    // update state
    const [tanggal, setTanggal] = useState()
    const [nama, setNama] = useState()
    const [jenisKelamin, setJenisKelamin] = useState()
    const [tempatLahir, setTempatLahir] = useState()
    const [tanggalLahir, setTanggalLahir] = useState()
    const [alamat, setAlamat] = useState()
    const [pekerjaan, setPekerjaan] = useState()
    const [telepon, setTelepon] = useState()
    const [alergi, setAlergi] = useState()
    const [nik, setNik] = useState()
    const [agama, setAgama] = useState()
    const [namaIbuKandung, setNamaIbuKandung] = useState()
    const [alamatKtp, setAlamatKtp] = useState()
    const [kecamatan, setKecamatan] = useState()
    const [kelurahan, setKelurahan] = useState()
    const [kota, setKota] = useState()
    const [kodePos, setKodePos] = useState()
    const [rt, setRt] = useState()
    const [rw, setRw] = useState()
    const [dataProvinsi, setDataProvinsi] = useState([])
    const [dataKota, setDataKota] = useState([])
    const [dataKecamatan, setDataKecamatan] = useState([])
    const [dataKelurahan, setDataKelurahan] = useState([])
    const [idProvinsi, setIdProvinsi] = useState('')
    const [idKota, setIdKota] = useState('')
    const [idKecamatan, setIdKecamatan] = useState('')
    const [idKelurahan, setIdKelurahan] = useState('')
    const [provinsi, setProvinsi] = useState()

    

    const getPasienById = async () => {
        try {
            const response = await Api.GetPasienById(localStorage.getItem('token'), params.state.idPasien)
            setNama(response.data.data.fullname)
            setJenisKelamin(response.data.data.gender)
            setTempatLahir(response.data.data.place_birth)
            setTanggalLahir(response.data.data.date_birth)
            setAlamat(response.data.data.address)
            setPekerjaan(response.data.data.work)
            setTelepon(response.data.data.phone)
            setAlergi(response.data.data.history_illness)
            setNik(response.data.data.nik)
            setNamaIbuKandung(response.data.data.namaIbuKandung)
            setAgama(response.data.data.agama)
            setAlamatKtp(response.data.data.alamatKTP)
            setKecamatan(response.data.data.kecamatan)
            setKelurahan(response.data.data.kelurahan)
            setKota(response.data.data.kota)
            setKodePos(response.data.data.kodePos)
            setRt(response.data.data.rt)
            setRw(response.data.data.rw)
            console.log(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const updatePasien = async () => {
        try {
            const data = {
                fullname: nama,
                place_birth: tempatLahir,
                date_birth: tanggalLahir,
                gender: jenisKelamin,
                address: alamat,
                work: pekerjaan,
                phone: telepon,
                history_illness: alergi,
                nik: nik,
                namaIbuKandung: namaIbuKandung,
                agama: agama,
                alamatKTP: alamatKtp,
                kecamatan: kecamatan,
                kelurahan: kelurahan,
                kota: kota,
                provinsi: provinsi,
                kodePos: kodePos,
                rt: rt,
                rw: rw
            }
            console.log(data, 'data')
            const response = await Api.UpdatePasien(localStorage.getItem('token'), data, params.state.idPasien)
            toast.success('Berhasil Update Pasien')
            navigate('/pasien')
        } catch (error) {
            console.log(error)
            toast.error('Gagal Update Pasien')
        }
    }
    const getDataWilayah = async () => {
        try {
            const res = await Api.GetWilayah(localStorage.getItem('token'), '', '', '')
            setDataProvinsi(res.data)
        } catch (error) {
            
        }
    }

    const handleSelectProvinsi = (e) => {
        const selectedOption = dataProvinsi.find(
          (data) => data.kodeProvinsi === e.target.value
        );
        if (selectedOption) {
          setIdProvinsi(selectedOption.kodeProvinsi);
          setProvinsi(selectedOption.namaProvinsi);
        } else {
          setIdProvinsi('')
          setProvinsi('')
        }
    };

    const getKota = async () => {
        try {
            const res = await Api.GetWilayah(localStorage.getItem('token'), idProvinsi, '', '')
            setDataKota(res.data)
        } catch (error) { 
        }
    }

    const handleSelectKota = (e) => {
        const selectedOption = dataKota.find(
          (data) => data.kodeKota === e.target.value
        );
        if (selectedOption) {
          setIdKota(selectedOption.kodeKota);
          setKota(selectedOption.namaKota);
        } else {
          setIdKota('')
          setKota('')
        }
    };

    const getKecamatan = async () => {
        try {
            const res = await Api.GetWilayah(localStorage.getItem('token'), idProvinsi, idKota, '')
            setDataKecamatan(res.data)
        } catch (error) { 
        }
    }

    const handleSelectKecamatan = (e) => {
        const selectedOption = dataKecamatan.find(
          (data) => data.kodeKecamatan === e.target.value
        );
        if (selectedOption) {
          setIdKecamatan(selectedOption.kodeKecamatan);
          setKecamatan(selectedOption.namaKecamatan);
        } else {
          setIdKecamatan('')
          setKecamatan('')
        }
    };

    const getKelurahan = async () => {
        try {
            const res = await Api.GetWilayah(localStorage.getItem('token'), idProvinsi, idKota, idKecamatan)
            setDataKelurahan(res.data)
        } catch (error) { 
        }
    }

    useEffect(() => {
        getDataWilayah()
    }, [])

    useEffect(() => {
        getKota()
    }, [idProvinsi, provinsi])

    useEffect(() => {
        getKecamatan()
    }, [idKota, kota])

    useEffect(() => {
        getKelurahan()
    }, [kecamatan, idKecamatan])

    useEffect(() => {
        getPasienById()
    }, [])


  return (
    <div>
        <div className='min-h-screen bg-[#F2F2F2]'>
            <div className='flex w-full'>
                <Sidebar />
                <div className='w-full p-10'>
                    <div className='space-y-[20px] w-full p-5 bg-white border-2 rounded-lg'>
                    <h1 className='text-2xl text-slate-black font-medium mb-[20px]'>Edit Pasien</h1>
                        <div className='text-sm space-y-2'>
                            <h1 className='font-medium'>Nama</h1>
                            <input value={nama} onChange={(e) => setNama(e.target.value)} type="text" className='w-full border outline-none shadow-md px-2 py-2 rounded-md' placeholder='Nama Pasien....'/>
                        </div>
                        <div className='text-sm space-y-2'>
                            <h1 className='font-medium'>NIK</h1>
                            <input value={nik} onChange={(e) => setNik(e.target.value)} type="text" className='w-full border outline-none shadow-md px-2 py-2 rounded-md' placeholder='Nik....'/>
                        </div>
                        <div className='text-sm space-y-2'>
                            <h1 className='font-medium'>Jenis Kelamin</h1>
                            <select onChange={(e) => setJenisKelamin(e.target.value)} value={jenisKelamin} className='w-full border outline-none shadow-md px-2 py-2 rounded-md'>
                                <option value="">Pilih Jenis Kelamin</option>
                                <option value="Laki-Laki">Laki-Laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                        </div>
                        <div className='text-sm space-y-2'>
                            <h1 className='font-medium'>Tempat Tanggal Lahir</h1>
                            <div className='flex items-center gap-7'>
                                <input value={tempatLahir} onChange={(e) => setTempatLahir(e.target.value)} type="text" className='w-full border outline-none shadow-md px-2 py-2 rounded-md' placeholder='Tempat....'/>
                                <input value={tanggalLahir} onChange={(e) => setTanggalLahir(e.target.value)} type="date" className='w-1/3 border outline-none shadow-md px-2 py-2 rounded-md' placeholder='Tempat, Tanggal Lahir....'/>
                            </div>
                        </div>
                        <div className='text-sm space-y-2'>
                            <h1 className='font-medium'>Agama</h1>
                            <input value={agama} onChange={(e) => setAgama(e.target.value)} type="text" className='w-full border outline-none shadow-md px-2 py-2 rounded-md' placeholder='Agama....'/>
                        </div>
                        <div className='text-sm space-y-2'>
                            <h1 className='font-medium'>Nama Ibu Kandung</h1>
                            <input value={namaIbuKandung} onChange={(e) => setNamaIbuKandung(e.target.value)} type="text" className='w-full border outline-none shadow-md px-2 py-2 rounded-md' placeholder='Nama Ibu Kandung....'/>
                        </div>
                        <div className='text-sm space-y-2'>
                            <h1 className='font-medium'>Alamat KTP</h1>
                            <input value={alamatKtp} onChange={(e) => setAlamatKtp(e.target.value)} type="text" className='w-full border outline-none shadow-md px-2 py-2 rounded-md' placeholder='Alamat KTP....'/>
                        </div>
                        <div className='text-sm space-y-2'>
                            <h1 className='font-medium'>Alamat Domisili</h1>
                            <input value={alamat} onChange={(e) => setAlamat(e.target.value)} type="text" className='w-full border outline-none shadow-md px-2 py-2 rounded-md' placeholder='Alamat....'/>
                        </div>
                        <div className='flex items-center justify-between gap-4'>
                            <div className=' w-full text-sm space-y-2'>
                                <h1 className='font-medium'>Provinsi</h1>
                                <select onChange={handleSelectProvinsi} type="text" className='w-full border outline-none shadow-md px-2 py-2 rounded-md' placeholder='Kota....'>
                                    <option value="">Select Provinsi...</option>
                                    {Object.values(dataProvinsi).map((item, idx) => (
                                        <option key={idx} value={item.kodeProvinsi}>{item.namaProvinsi}</option>
                                    ))}
                                </select>
                            </div>
                            <div className=' w-full text-sm space-y-2'>
                                <h1 className='font-medium'>Kota</h1>
                                <select onChange={handleSelectKota} type="text" className='w-full border outline-none shadow-md px-2 py-2 rounded-md' placeholder='Kota....'>
                                    <option value="">Select Kota...</option>
                                    {Object.values(dataKota).map((item, idx) => (
                                        <option key={idx} value={item.kodeKota}>{item.namaKota}</option>
                                    ))}
                                </select>
                            </div>
                            <div className=' w-full text-sm space-y-2'>
                                <h1 className='font-medium'>Kecamatan</h1>
                                <select onChange={handleSelectKecamatan} type="text" className='w-full border outline-none shadow-md px-2 py-2 rounded-md' placeholder='Kecamatan....'>
                                    <option value="">Select Kecamatan...</option>
                                    {Object.values(dataKecamatan).map((item, idx) => (
                                        <option key={idx} value={item.kodeKecamatan}>{item.namaKecamatan}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='flex items-center justify-between gap-4'>
                            <div className=' w-full text-sm space-y-2'>
                                <h1 className='font-medium'>Kelurahan / Desa </h1>
                                <input value={kelurahan} onChange={(e) => setKelurahan(e.target.value)} type="text" className='w-full border outline-none shadow-md px-2 py-2 rounded-md' placeholder='Kelurahan....' />
                            </div>
                            <div className=' w-full text-sm space-y-2'>
                                <h1 className='font-medium'>RT</h1>
                                <input value={rt} onChange={(e) => setRt(e.target.value)} type="text" className='w-full border outline-none shadow-md px-2 py-2 rounded-md' placeholder='Rt....'/>
                            </div>
                            <div className=' w-full text-sm space-y-2'>
                                <h1 className='font-medium'>RW</h1>
                                <input value={rw} onChange={(e) => setRw(e.target.value)} type="text" className='w-full border outline-none shadow-md px-2 py-2 rounded-md' placeholder='Rw....'/>
                            </div>
                        </div>
                        <div className='flex items-center justify-between gap-4'>
                            <div className=' w-full text-sm space-y-2'>
                                <h1 className='font-medium'>Kode Pos</h1>
                                <input value={kodePos} onChange={(e) => setKodePos(e.target.value)} type="text" className='w-full border outline-none shadow-md px-2 py-2 rounded-md' placeholder='Kode Pos....'/>
                            </div>
                        </div>
                        <div className='text-sm space-y-2'>
                            <h1 className='font-medium'>Pekerjaan</h1>
                            <input value={pekerjaan} onChange={(e) => setPekerjaan(e.target.value)} type="text" className='w-full border outline-none shadow-md px-2 py-2 rounded-md' placeholder='Pekerjaan....'/>
                        </div>
                        <div className='text-sm space-y-2'>
                            <h1 className='font-medium'>No Hp/Telepon</h1>
                            <input value={telepon} onChange={(e) => setTelepon(e.target.value)} type="number" className='w-full border outline-none shadow-md px-2 py-2 rounded-md' placeholder='No Hp/Telepon....'/>
                        </div>
                        <div className='text-sm space-y-2'>
                            <h1 className='font-medium'>Alergi / Riwayat Penyakit</h1>
                            <input value={alergi} onChange={(e) => setAlergi(e.target.value)} type="text" className='w-full border outline-none shadow-md px-2 py-2 rounded-md' placeholder='Alergi / Riwayat Penyakit....'/>
                        </div>

                        <div className='space-x-5 pt-7 flex items-center justify-end'>
                            <button onClick={() => navigate(-1)} className='py-2 px-5 border rounded-md border-purple-700  w-[100px] text-purple-700 text-lg'>
                                Cancel
                            </button>
                            <button onClick={updatePasien} className='py-2 px-5 border rounded-md bg-purple-700 w-[100px] text-white text-lg'>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}
