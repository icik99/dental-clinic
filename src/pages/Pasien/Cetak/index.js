import React, { useEffect, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { useLocation } from 'react-router-dom';
import Api from '../../../Api';
import { Logo } from '../../../assets';

export default function CetakKib() {
    const generatePDF = () => {
        const element = document.getElementById('pdf-content');

        const options = {
            margin: [10, 10, 10, 10], // margin: top, right, bottom, left (in mm)
            filename: `RM ${medicalRecord?.fullname} ${medicalRecord?.date}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
        };

        html2pdf().from(element).set(options).save();
    };

    const param = useLocation();
    const [medicalRecord, setMedicalRecord] = useState('');

    const getMedicalRecord = async () => {
        try {
            const response = await Api.GetPasienById(localStorage.getItem('token'), param.state.idPasien);
            console.log('data', response.data.data);
            setMedicalRecord(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const formatServiceNames = (param) => {
        return param.map(service => service.name).join(', ');
      };

      const printContent = () => {
        window.print();
    };

    useEffect(() => {
        getMedicalRecord();
    }, []);

    return (
        <>
            <div className='flex items-center justify-center gap-4 mt-10'>
                <button className=' bg-red-600 text-white font-semibold px-4 py-2' onClick={generatePDF}>
                    Download PDF
                </button>
                <button className=' bg-blue-600 text-white font-semibold px-4 py-2' onClick={printContent}>
                    Print
                </button>
            </div>
            <div className='m-10  border-4 rounded-xl h-full w-fit bg-purple-600'>
                <div id='pdf-content' className='bg-purple-600 rounded-xl' >
                    <div className='h-full w-full pb-28 px-4'>
                        <div className='flex items-center justify-between gap-10 border-b-4  border-white pb-5'>
                            <div className='px-8 py-3'>
                                <img className='w-100 h-64 rounded-full' src={Logo} alt="Logo" />
                            </div>
                            <div className='space-y-1 pr-[200px] text-white'>
                                <h1 className='text-center text-4xl font-semibold mb-2'>Sinar Akbar Dental Clinic</h1>
                                <h1 className='text-center text-2xl font-semibold'>Jl. Watu Miring RT 3 RW 1, Desa Kapas</h1>
                                <h1 className='text-center text-2xl font-semibold'>Kecamatan Kapas - Kabupaten Bojonegoro</h1>
                                <h1 className='text-center text-2xl font-bold'>Buka Senin - Jumat Pukul 16.00 - 20.00 WIB</h1>
                                <h1 className='text-center text-2xl font-bold'>WA: 08133-3334-8419</h1>
                            </div>
                        </div>
                        <h1 className='text-white font-bold  text-center mt-3 mb-7 text-6xl'>Kartu Pasien</h1>
                        <div className="text-white grid grid-cols-3 gap-4 mt-6 text-4xl">
                            <div className="font-semibold">No. Rekam Medis</div>
                            <div className="col-span-2">: {medicalRecord?.number_regristation}</div>
                            <div className="font-semibold">Nama Pasien</div>
                            <div className="col-span-2">: {medicalRecord?.fullname}</div>
                            <div className="font-semibold">Alamat</div>
                            <div className="col-span-2">: {medicalRecord.address}</div>
                        </div>
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
