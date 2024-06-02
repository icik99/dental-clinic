import React, { useEffect, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { Logo, Lunas } from '../../../assets';
import { useLocation } from 'react-router-dom';
import Api from '../../../Api';

export default function Invoice() {
    const generatePDF = () => {
        const element = document.getElementById('pdf-content');

        const options = {
            margin: [10, 10, 10, 10], // margin: top, right, bottom, left (in mm)
            filename: `Invoice ${dataInvoice.fullname} - ${dataInvoice.createdAt} .pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };

        html2pdf().from(element).set(options).save();
    };

    const printInvoice = () => {
        window.print();
    };

    const param = useLocation();
    const [dataInvoice, setDataInvoice] = useState('');
    const [dataPurchased, setDataPurchased] = useState('');
    const [dataObatPurchased, setDataObatPurchased] = useState('');

    const getInvoice = async () => {
        try {
            const response = await Api.GetPaymentById(localStorage.getItem('token'), param.state.idInvoice);
            setDataInvoice(response.data.data[0]);
            setDataPurchased(response.data.data[0].layanan);
            setDataObatPurchased(response.data.data[0].obat);
            console.log('data', response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getInvoice();
    }, []);

    return (
        <>
            <div className='flex items-center justify-end mt-10'>
                <button className='mx-auto bg-red-600 text-white font-semibold px-4 py-2' onClick={generatePDF}>
                    Download PDF
                </button>
                {/* <button className='mx-auto bg-blue-600 text-white font-semibold px-4 py-2 ml-4' onClick={printInvoice}>
                    Klik Untuk Cetak Invoice
                </button> */}
            </div>
            <div  className='m-10 p-5 border-4 rounded-xl h-full'>
                <div id='pdf-content'>
                    <div className='flex items-center justify-center gap-10 border-b-2 border-purple-600 pb-5'>
                        <img className='w-50 h-32' src={Logo} alt="Logo" />
                        <div className='space-y-1'>
                            <h1 className='text-center text-4xl font-semibold mb-2'>Sinar Akbar Dental Clinic</h1>
                            <h1 className='text-center text-base font-semibold'>Jl. Watu Miring RT 3 RW 1, Desa Kapas</h1>
                            <h1 className='text-center text-base font-semibold'>Kecamatan Kapas - Kabupaten Bojonegoro</h1>
                            <h1 className='text-center text-base font-bold'>Buka Senin - Jumat Pukul 16.00 - 20.00 WIB</h1>
                        </div>
                    </div>
                    <div className='mt-6 text-lg font-semibold'>
                        <h1>No Rekam Medis: <span className='font-normal'>{dataInvoice?.noRm}</span></h1>
                        <h1>Nama: <span className='font-normal'>{dataInvoice?.fullname}</span></h1>
                        <h1>Tanggal: <span className='font-normal'>{dataInvoice?.createdAt}</span></h1>
                    </div>
                    <h1 className='font-semibold text-4xl text-center'>INVOICE</h1>
                    <div className='mt-6'>
                        <h1 className='font-semibold text-xl mb-2'>Layanan</h1>
                        <table className='w-full'>
                            <thead>
                                <tr>
                                    <th className='border p-2'>No.</th>
                                    <th className='border p-2'>Deskripsi</th>
                                    <th className='border p-2'>Harga</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.values(dataPurchased).map((item, idx) => (
                                    <tr key={idx}>
                                        <td className='border p-2'>{idx + 1}.</td>
                                        <td className='border p-2'>{item?.name}</td>
                                        <td className='border p-2'>Rp. {item?.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='mt-6'>
                        <h1 className='font-semibold text-xl mb-2'>Obat</h1>
                        <table className='w-full'>
                            <thead>
                                <tr>
                                    <th className='border p-2'>No.</th>
                                    <th className='border p-2'>Deskripsi</th>
                                    <th className='border p-2'>Harga</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.values(dataObatPurchased).map((item, idx) => (
                                    <tr key={idx}>
                                        <td className='border p-2'>{idx + 1}.</td>
                                        <td className='border p-2'>{item?.name}</td>
                                        <td className='border p-2'>Rp. {item?.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='mt-6'>
                        <h1 className='text-lg font-medium text-end'>Total: Rp.{dataInvoice?.total_payment}</h1>
                        <img className='w-40 h-20 -rotate-12' src={Lunas} alt="" />
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
