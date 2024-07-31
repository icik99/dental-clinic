import React, { useEffect, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { useLocation } from 'react-router-dom';
import Api from '../../../Api';
import { Logo } from '../../../assets';

export default function InformContent() {
    const generatePDF = () => {
        const element = document.getElementById('pdf-content');

        const options = {
            margin: [10, 10, 10, 10], // margin: top, right, bottom, left (in mm)
            filename: `Persetujuan_Tindakan_Medis_${medicalRecord?.fullname}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };

        html2pdf().from(element).set(options).save();
    };

    const printContent = () => {
        window.print();
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

    useEffect(() => {
        getMedicalRecord();
    }, []);

    return (
        <>
            <div className='flex items-center justify-center mt-10 gap-3'>
                <button className=' bg-red-600 text-white font-semibold px-4 py-2' onClick={generatePDF}>
                    Download PDF
                </button>
                <button className=' bg-blue-600 text-white font-semibold px-4 py-2' onClick={printContent}>
                    Print
                </button>
            </div>
            <div className='m-10 p-5 border-4 rounded-xl h-full w-fit'>
                <div id='pdf-content' className='h-[1000px] w-full'>
                    <div className='flex items-center justify-center gap-10 border-b-2 border-purple-600 pb-2'>
                        <img className='w-50 h-32' src={Logo} alt="Logo" />
                        <div className='space-y-1'>
                            <h1 className='text-center text-4xl font-semibold mb-2'>Sinar Akbar Dental Clinic</h1>
                            <h1 className='text-center text-base font-semibold'>Jl. Watu Miring RT 3 RW 1, Desa Kapas</h1>
                            <h1 className='text-center text-base font-semibold'>Kecamatan Kapas - Kabupaten Bojonegoro</h1>
                            <h1 className='text-center text-base font-bold'>Buka Senin - Jumat Pukul 16.00 - 20.00 WIB</h1>
                        </div>
                    </div>
                    <h2 className='text-center text-lg font-semibold mb-2'>LEMBAR PERSETUJUAN / PENOLAKAN TINDAKAN MEDIS</h2>
                    <p>Saya yang bertanda tangan di bawah ini :</p>
                    <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                        <div>Nama</div>
                        <div className="col-span-2">: {medicalRecord?.namaKeluarga}</div>
                        <div>Jenis Kelamin</div>
                        <div className="col-span-2">: {medicalRecord?.jenisKelaminKeluarga}</div>
                        <div>Alamat</div>
                        <div className="col-span-2">: {medicalRecord?.alamatKeluarga}</div>
                        <div>No. Telepon/HP</div>
                        <div className="col-span-2">: {medicalRecord?.telpKeluarga}</div>
                    </div>
                    <p className='mt-4 text-sm'>Dengan ini sesungguhnya saya menyatakan:</p>
                    <h3 className='text-center font-semibold my-2'>SETUJU / MENOLAK *)</h3>
                    <p className='text-sm'>Untuk dilakukan tindakan medis berupa : {medicalRecord?.medicalAction}</p>
                    <p className='mt-2 text-sm'>Terhadap diri saya sendiri / istri / suami / anak / ayah / ibu *) dengan</p>
                    <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                        <div>Nama</div>
                        <div className="col-span-2">: {medicalRecord?.fullname}</div>
                        <div>enis Kelamin</div>
                        <div className="col-span-2">: {medicalRecord?.gender}</div>
                        <div>Alamat</div>
                        <div className="col-span-2">: {medicalRecord?.address}</div>
                        <div>No. Telepon/HP</div>
                        <div className="col-span-2">: {medicalRecord?.phone}</div>
                        <div>No. Rekam Medis</div>
                        <div className="col-span-2">: {medicalRecord?.number_regristation}</div>
                    </div>
                    <p className='mt-4 text-sm'>Saya telah menyatakan dengan sesungguhnya dan tanpa paksaan bahwa saya:</p>
                    <ol className='list-decimal list-inside text-sm'>
                        <li>Telah diberikan informasi dan penjelasan serta peringatan akan risiko kemungkinan yang timbul apabila tidak dilakukan tindakan medis yang berupa {medicalRecord?.risks}</li>
                        <li>Telah saya pahami sepenuhnya informasi dan penjelasan yang diberikan dokter</li>
                        <li>Atas tanggung jawab dan risiko saya sendiri tetap setuju / menolak *) tindakan medis yang dianjurkan oleh dokter</li>
                    </ol>
                    <p className='mt-2 text-sm'>Demikian pernyataan ini saya buat dengan penuh kesadaran dan tanpa paksaan</p>
                    <div className='grid grid-cols-3 mt-10 mx-10'>
                        <div className='text-start'>
                            <p>Dokter</p>
                            <div className='mt-16 w-full'></div>
                            <p>drg. Mega Rafika Baroroh</p>
                        </div>
                        <div className='col-span-2 text-right'>
                            <p>Yang Membuat Pernyataan</p>
                            <div className='mt-16 w-full'></div>
                            <p>{medicalRecord?.namaKeluarga}</p>
                        </div>
                    </div>
                    <div className='text-center mt-10'>
                        <p>Saksi</p>
                        <div className='mt-16 w-full'></div>
                        <p>(......................................)</p>
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
