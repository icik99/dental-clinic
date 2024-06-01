import React, { useEffect, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { useLocation } from 'react-router-dom';
import Api from '../../../Api';
import { Logo } from '../../../assets';

export default function CetakRekaMedis() {
    const generatePDF = () => {
        const element = document.getElementById('pdf-content');

        const options = {
            margin: [10, 10, 10, 10], // margin: top, right, bottom, left (in mm)
            filename: `RM ${medicalRecord?.fullname} ${medicalRecord?.date}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };

        html2pdf().from(element).set(options).save();
    };

    const param = useLocation();
    const [medicalRecord, setMedicalRecord] = useState('');

    const getMedicalRecord = async () => {
        try {
            const response = await Api.GetRekamMedisById(localStorage.getItem('token'), param.state.idRekamMedis);
            console.log('data', response.data.data);
            setMedicalRecord(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const formatServiceNames = (param) => {
        return param.map(service => service.name).join(', ');
      };

    useEffect(() => {
        getMedicalRecord();
    }, []);

    return (
        <>
            <div className='flex items-center justify-end mt-10'>
                <button className='mx-auto bg-red-600 text-white font-semibold px-4 py-2' onClick={generatePDF}>
                    Download PDF
                </button>
            </div>
            <div className='m-10 p-5 border-4 rounded-xl h-full w-fit'>
                <div id='pdf-content' className='h-[1000px] w-full'>
                    <div className='flex items-center justify-center gap-10 border-b-2 border-purple-600 pb-5'>
                        <img className='w-50 h-32' src={Logo} alt="Logo" />
                        <div className='space-y-1'>
                            <h1 className='text-center text-4xl font-semibold mb-2'>Sinar Akbar Dental Clinic</h1>
                            <h1 className='text-center text-base font-semibold'>Jl. Watu Miring RT 3 RW 1, Desa Kapas</h1>
                            <h1 className='text-center text-base font-semibold'>Kecamatan Kapas - Kabupaten Bojonegoro</h1>
                            <h1 className='text-center text-base font-bold'>Buka Senin - Jumat Pukul 16.00 - 20.00 WIB</h1>
                        </div>
                    </div>
                    <h1 className='font-semibold text-xl text-center mt-6'>Catatan Rekam Medis</h1>
                    <div className="grid grid-cols-3 gap-2 mt-6">
                        <div className="font-semibold">No. Rekam Medis</div>
                        <div className="col-span-2">: {medicalRecord?.number_regristation}</div>
                        <div className="font-semibold">Nama Pasien</div>
                        <div className="col-span-2">: {medicalRecord?.fullname}</div>
                        <div className="font-semibold">Jenis Kelamin</div>
                        <div className="col-span-2">: {medicalRecord.gender}</div>
                        <div className="font-semibold">Tanggal Lahir</div>
                        <div className="col-span-2">: {medicalRecord?.date_birth}</div>
                        <div className="font-semibold">Tanggal Periksa</div>
                        <div className="col-span-2">: {medicalRecord?.date}</div>
                    </div>
                    <div className='border-b border-dashed my-6'></div>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="font-semibold">Diagnosis</div>
                        <div className="col-span-2">: {medicalRecord?.diagnosis}</div>
                        <div className="font-semibold">Deskripsi</div>
                        <div className="col-span-2">: {medicalRecord?.description}</div>
                        <div className="font-semibold">Layanan</div>
                        <div className="col-span-2">: {medicalRecord.service? formatServiceNames(medicalRecord.service) : '-'}</div>
                        <div className="font-semibold">Terapi</div>
                        <div className="col-span-2">: {medicalRecord?.therapy}</div>
                        <div className="font-semibold">Riwayat Penyakit</div>
                        <div className="col-span-2">: {medicalRecord?.history_illness}</div>
                        <div className="font-semibold">Catatan Tambahan</div>
                        <div className="col-span-2">: {medicalRecord?.koreksi}</div>
                    </div>
                    <div className='mt-20'>
                        <h1 className='text-md font-medium text-end mb-16'>Bojonegoro, <span>{medicalRecord?.date}</span></h1>
                        <p className='text-end'>Dr. Mega Rafika Baroroh</p>
                    </div>
                </div>
            </div>
            <style>
                {`
                    @media print {
                        body * {
                            visibility: hidden;
                        }
                        #pdf-content, #pdf-content * {
                            visibility: visible;
                        }
                        #pdf-content {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            margin: 0;
                            padding: 0;
                        }
                    }
                `}
            </style>
        </>
    );
}
