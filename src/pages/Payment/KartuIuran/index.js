import React, { useEffect, useState } from 'react'
import html2pdf from 'html2pdf.js';
import { Logo, Lunas } from '../../../assets';
import { useLocation } from 'react-router-dom';
import Api from '../../../Api';

export default function KartuIuran() {
    const generatePDF = () => {
        const element = document.getElementById('pdf-content');
    
        const options = {
            margin: 10,
            filename: `Kartu Iuran ${dataInvoice.fullname} .pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };
    
        html2pdf().from(element).set(options).save();
    };

    const printPage = () => {
        window.print();
    };

    const param = useLocation();
    const [dataInvoice, setDataInvoice] = useState('');
    const [dataPurchased, setDataPurchased] = useState([]);

    const getInvoice = async () => {
        try {
            const response = await Api.GetPaymentById(localStorage.getItem('token'), param.state.idInvoice);
            setDataInvoice(response.data.data[0]);
            setDataPurchased(response.data.data[0].purchased);
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
            <div className='flex items-center justify-end pr-40 mt-10 no-print'>
                <div>
                    <button className='mx-auto bg-red-600 text-white font-semibold px-4 py-2 mb-2' onClick={generatePDF}>Download PDF</button>
                </div>
                {/* <div>
                    <button className='mx-auto bg-blue-600 text-white font-semibold px-4 py-2 mb-2 ml-2' onClick={printPage}>Klik Untuk Print Kartu Iuran</button>
                </div> */}
            </div>
            <div  className='mx-20 p-10 border-4 rounded-xl'>
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
                    <div className='mt-5  text-lg font-semibold'>
                        <h1>No. Rekam Medis Pasien: <span className='font-normal'> {dataInvoice?.noRm}</span></h1>
                        <h1>Nama Pasien: <span className='font-normal'>{dataInvoice?.fullname}</span></h1>
                        <h1>Alamat: <span className='font-normal'>{dataInvoice?.address}</span></h1>
                    </div>
                    <h1 className='font-semibold text-4xl text-center'>KARTU IURAN / CICILAN</h1>
                    <div>
                        <table className='w-full mt-6'>
                            <thead>
                                <tr>
                                    <th className='border border-black p-2'>No.</th>
                                    <th className='border border-black p-2'>Nama Tindakan</th>
                                    <th className='border border-black p-2'>Jumlah</th>
                                    <th className='border border-black p-2'>Harga Satuan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.from({ length: 15 }, (_, idx) => (
                                    <tr key={idx}>
                                        <td className='border border-black p-2 text-lg'>{idx + 1}.</td>
                                        <td className='border border-black p-2'></td>
                                        <td className='border border-black p-2'></td>
                                        <td className='border border-black p-2'></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <style>
                {`
                    @media print {
                        .no-print {
                            display: none;
                        }
                        body {
                            margin: 0;
                        }
                        #pdf-content {
                            margin: 0;
                            padding: 0;
                            border: none;
                            width: 100%;
                            height: 100%;
                        }
                    }
                `}
            </style>
        </>
    );
}
