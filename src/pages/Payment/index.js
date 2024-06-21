import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

import Modal from '../../components/Modal'
import Api from '../../Api'
import toast from 'react-hot-toast'
import Pagination from '../../components/Pagination'
import { BiSearch } from 'react-icons/bi'
import { debounce } from 'lodash'
import moment from 'moment'

export default function Payment() {
    const navigate = useNavigate()
    const [editStatus, setEditStatus] = useState(false)
    const [idPayment, setIdPayment] = useState()
    const [dataPayment, setDataPayment] = useState([])
    const [status, setStatus] = useState()
    const [refresh, setRefresh] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState('')
    const [nominalBayar, setNominalBayar] = useState('')
    const [dataPasien, setDataPasiem] = useState('')
    const [pasien, setPasien] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setRefresh(true)
    };
    
    const handlePrevChange = () => {
        if(currentPage === 1) {
            setCurrentPage(1)
        } else {
            setCurrentPage(currentPage - 1);
        }
        setRefresh(true)
    };
    
    const handleNextChange = () => {
        if(currentPage === totalPages) {
            setCurrentPage(totalPages)
        } else {
            setCurrentPage(currentPage + 1);
        }
        setRefresh(true)
    };

    const getPayment = async () => {
        try {
            const response  = await Api.GetPayment(localStorage.getItem('token'), '', currentPage, startDate, endDate, pasien)
            console.log(response, 'getPayment')
            setCurrentPage(parseInt(response.data.currentPages, 10))
            setTotalPages(response.data.totalPages)
            setDataPayment(response.data.data)
        } catch (error) {
            console.log(error)   
        }
    }

    const getPasien = async () => {
        try {
            const res = await Api.GetPasien(localStorage.getItem('token'), '', '')
            setDataPasiem(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSearchName = (e) => {
        const searchName = e.target.value
        debouncedSearchName(searchName)
    }
    const debouncedSearchName = debounce(async(name) => {
        try {
            const response = await Api.GetPayment(localStorage.getItem('token'), name, currentPage, '','','')
            setDataPayment(response.data.data)
            setCurrentPage(response.data.currentPages)
            setTotalPages(response.data.totalPages)
        } catch (error) {
            console.log(error)
        }
    }, 300)

    const openEditPayment = async (id) => {
        setIdPayment(id)
        setEditStatus(!editStatus)
        try {
            const response = await Api.GetPaymentById(localStorage.getItem('token'), id)
            setStatus(response.data.data[0].status)
        } catch (error) {
            console.log(error)
        }
    }

    const updatePayment = async () => {
        try {
            const data = {
                status: status,
                bayar: nominalBayar
            }
            const response = await Api.UpdatePayment(localStorage.getItem('token'), data, idPayment)
            setEditStatus(!editStatus)
            setRefresh(true)
            toast.success('Pembayaran Berhasil di Update')
        } catch (error) {
            console.log(error)   
            toast.error(error.response.data.message)
        }
    }

    const exportToExcel = () => {
        // Sample data array
        const dataExport = dataPayment;

        // Define custom headers for each table
        const Headers = ['No Rm Pasien', 'Invoice ID', 'NIK', 'Nama Pasien', 'Tanggal', 'Pelayanan', 'Obat', 'Total Pembayaran'];

        // Create modified data arrays with custom headers
        const rekamMedis = dataPayment.map(({noRm, invoice, nik,  fullname, createdAt, layanan, obat,  total_payment}) => ({
            'No Rm Pasien': noRm ? noRm : '-',
            'NIK': nik ? nik : '-',
            'Invoice ID': invoice ? invoice : '-',
            'Nama Pasien': fullname ? fullname : '-',
            'Tanggal': createdAt? createdAt : '-',
            'Pelayanan': layanan ? formatServiceNames(layanan) : '-',
            'Obat': obat? formatObatNames(obat) : '-',
            'Total Pembayaran': total_payment? total_payment : '-',
        }));

        // Create a new worksheet for each table
        const worksheetGrade = XLSX.utils.json_to_sheet(rekamMedis, { header: Headers });

        // Create a new workbook
        const workbook = XLSX.utils.book_new();

        // Add the worksheets to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheetGrade, 'Rekap Pembayaran');
        // Generate Excel file buffer
        const excelBuffer = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array',
        });

        // Convert buffer to Blob
        const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        // Save the Excel file using FileSaver.js
        saveAs(excelBlob, `Rekap Pembayaran.xlsx`);
    };

    const formatServiceNames = (param) => {
        return param
            .filter(service => service.type === 'service')
            .map(service => service.name)
            .join(', ');
    };
    
    const formatObatNames = (param) => {
        return param
            .filter(service => service.type === 'obat')
            .map(service => service.name)
            .join(', ');
    };

    useEffect(() => {
        getPayment()
        setRefresh(false)
        getPasien()
    }, [refresh])
    
    useEffect(() => {
        getPayment()
    }, [pasien, startDate, endDate])

  return (
    <div>
        <Modal 
            activeModal={editStatus}
            title={'Edit Status Pembayaran'}
            buttonClose={ () => setEditStatus(!editStatus)}
            width={'832px'}
            content= {
                <div className=' w-full space-y-[40px]'>
                    <div className='bg-[#F8F8F8] rounded-[15px] px-[19px] py-[31px] w-[773px] text-[#737373] text-[14px] font-semibold space-y-3'>
                        <div className='flex items-center'>
                            <h1 className='w-1/2'>Status Pembayaran</h1>
                            <input value={status === '0' ? 'Belum Lunas' : 'Lunas'} onChange={(e) => setStatus(e.target.value)} readOnly  className='px-4 py-2 border rounded-md  w-full cursor-not-allowed bg-slate-200' />
                        </div>
                        <div className='flex items-center'>
                            <h1 className='w-1/2'>Nominal Bayar</h1>
                            <input value={nominalBayar} onChange={(e) => setNominalBayar(e.target.value)} className='px-4 py-2 border rounded-md  w-full' placeholder='Rp....'/>
                        </div>
                    </div>
                    <div className='ml-[560px] flex items-start justify-end gap-3 w-1/4'>
                        <button onClick={() => setEditStatus(!editStatus)}  className="py-2 px-5 border rounded-md border-purple-700  w-[100px] text-purple-700 text-lg">Cancel</button>
                        <button onClick={updatePayment} className="py-2 px-5 border rounded-md bg-purple-700 w-[100px] text-white text-lg">Save</button>
                    </div>

                </div>
            }
        />
        <div className='min-h-screen bg-[#F2F2F2] overflow-auto scrollbar-hide'>
            <div className='flex w-full'>
                <div className='w-fit'>
                    <Sidebar />
                </div>
                <div className='w-full p-10 '>
                    <div className='space-y-4'>
                        <div className='border-2 bg-white rounded-lg p-10 space-y-[20px]'>
                            <h1 className='text-2xl text-purple-black font-medium mb-[40px]'>Pembayaran</h1>
                            <div className='relative'>
                                <BiSearch className='absolute left-[14px] top-[10px] text-[#A8A8A8] text-lg'/>
                                <input onChange={handleSearchName} placeholder='Search by NIK and No. Rekam Medis...' className='h-[38px] text-[#A8A8A8] text-[10px] font-[500] pl-12 border rounded-[12px] py-2 w-full lg:w-[300px]'/>
                            </div>
                            <div className='mt-[44px] bg-white overflow-auto'>
                            <table className='w-full space-y-[10px]'>
                                <div className='flex items-center gap-3 bg-white px-[14px] py-[10px] rounded-[3px]'>
                                    <div className='flex items-center gap-[15px] min-w-[80px] max-w-[80px]'>
                                        <h1 className='text-black text-xs font-semibold'>No. RM Pasien</h1>
                                    </div>
                                    <div className='flex items-center gap-[15px] min-w-[80px] max-w-[80px]'>
                                        <h1 className='text-black text-xs font-semibold'>NIK</h1>
                                    </div>
                                    <div className='flex items-center gap-[15px] min-w-[130px] max-w-[130px]'>
                                        <h1 className='text-black text-xs font-semibold'>Tanggal</h1>
                                    </div>
                                    <div className='flex items-center gap-[15px] min-w-[130px] max-w-[130px]'>
                                        <h1 className='text-black text-xs font-semibold'>Nama Pasien</h1>
                                    </div>
                                    <div className='flex items-center gap-[15px] min-w-[180px] max-w-[180px]'>
                                        <h1 className='text-black text-xs font-semibold'>Pelayanan</h1>
                                    </div>
                                    <div className='flex items-center gap-[15px] min-w-[180px] max-w-[180px]'>
                                        <h1 className='text-black text-xs font-semibold'>Obat</h1>
                                    </div>
                                    <div className='flex items-center gap-[15px] min-w-[130px] max-w-[130px]'>
                                        <h1 className='text-black text-xs font-semibold'>Sisa Pembayaran</h1>
                                    </div>
                                    <div className='flex items-center gap-[15px] min-w-[130px] max-w-[130px]'>
                                        <h1 className='text-black text-xs font-semibold'>Total Pembayaran</h1>
                                    </div>
                                    <div className='flex items-center gap-[15px] min-w-[130px] max-w-[130px]'>
                                        <h1 className='text-black text-xs font-semibold'>Pendapatan</h1>
                                    </div>
                                    <div className='flex items-center gap-[15px] min-w-[120px] max-w-[120px]'>
                                        <h1 className='text-black text-xs font-semibold'>Status Pembayaran</h1>
                                    </div>
                                    <div className=' w-full flex items-center justify-center'>
                                        <h1 className='text-black text-xs text-center font-semibold'>Action</h1>
                                    </div>
                                </div>
                                {Object.values(dataPayment).map((item, idx) => (
                                    <div className='flex items-center gap-3 bg-white px-[14px] py-[8px] rounded-[3px] border-t'>
                                        <div className='line-clamp-1 truncate min-w-[80px] max-w-[80px]'>
                                            <h1 className='text-purple-800 text-xs font-[600] line-clamp-1'>{item.noRm ? item.noRm : '-'}</h1>
                                        </div>
                                        <div className='line-clamp-1 truncate min-w-[80px] max-w-[80px]'>
                                            <h1 className='text-purple-800 text-xs font-[600] line-clamp-1'>{item.nik ? item.nik : '-'}</h1>
                                        </div>
                                        <div className='line-clamp-1 truncate min-w-[130px] max-w-[130px]'>
                                            <h1 className='text-[#737373] text-xs font-[600] line-clamp-1'>{item.createdAt ? item.createdAt : '-'}</h1>
                                        </div>
                                        <div className='line-clamp-1 truncate min-w-[130px] max-w-[130px]'>
                                            <h1 className='text-[#737373] text-xs font-[600] line-clamp-1'>{item.fullname ? item.fullname : '-'}</h1>
                                        </div>
                                        <div className='line-clamp-1 truncate min-w-[180px] max-w-[180px]'>
                                            <h1 className='text-[#737373] text-xs font-[600] line-clamp-1'>{item.layanan ? formatServiceNames(item.layanan) : '-'}</h1>
                                        </div>
                                        <div className='line-clamp-1 truncate min-w-[180px] max-w-[180px]'>
                                            <h1 className='text-[#737373] text-xs font-[600] line-clamp-1'>{item.obat ? formatObatNames(item.obat) : '-'}</h1>
                                        </div>
                                        <div className='line-clamp-1 truncate min-w-[130px] max-w-[130px]'>
                                            <h1 className='text-[#737373] text-xs font-[600] line-clamp-1'>Rp. {item.sisa_pembayaran ? item.sisa_pembayaran : '0'}</h1>
                                        </div>
                                        <div className='line-clamp-1 truncate min-w-[130px] max-w-[130px]'>
                                            <h1 className='text-[#737373] text-xs font-[600] line-clamp-1'>Rp. {item.total_payment ? item.total_payment : '-'}</h1>
                                        </div>
                                        <div className='line-clamp-1 truncate min-w-[130px] max-w-[130px]'>
                                            <h1 className='text-[#737373] text-xs font-[600] line-clamp-1'>Rp. {item.pendapatan ? item.pendapatan : '-'}</h1>
                                        </div>
                                        <div className='line-clamp-1 truncate min-w-[120px] max-w-[120px]'>
                                            <h1 className={`${item.status === '0' ? 'text-red-500' : 'text-green-500' } text-xs font-bold line-clamp-1`}>{item.status === '0' ? 'Belum Lunas' : 'Lunas'}</h1>
                                        </div>
                                        <div className='w-full space-x-2 flex items-center justify-center'>
                                            {item.status === '0' ? (
                                                <>
                                                    <button onClick={() => openEditPayment(item.id)} className={` bg-purple-600 w-[100px] text-xs p-2 font-medium text-white rounded-[9px]`}> Edit Tagihan </button>
                                                    <button disabled onClick={() => navigate('/payment/invoice', {state: {idInvoice: item.id}})} className={` bg-purple-300 w-[100px] text-xs p-2 font-medium text-white rounded-[9px]`}> Cetak invoice </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button disabled onClick={() => openEditPayment(item.id)} className={` bg-purple-300 w-[100px] text-xs p-2 font-medium text-white rounded-[9px]`}> Edit Tagihan </button>
                                                    <button onClick={() => navigate('/payment/invoice', {state: {idInvoice: item.id}})} className={` bg-purple-600 w-[100px] text-xs p-2 font-medium text-white rounded-[9px]`}> Cetak invoice </button>
                                                </>
                                                
                                            )}
                                            <button onClick={() => navigate('/payment/kartu-iuran', {state: {idInvoice: item.id}})} className={` bg-purple-600 w-[120px] text-xs p-2 font-medium text-white rounded-[9px]`}> Cetak Kartu Iuran</button>
                                            
                                        </div>
                                    </div>
                                ))}
                            </table>
                            <Pagination
                                currentPage={currentPage} 
                                totalPages={totalPages} 
                                onPageChange={handlePageChange}
                                onPrevChange={handlePrevChange}
                                onNextChange={handleNextChange}
                            />
                        </div>
                        </div>
                        <div className='border-2 bg-white rounded-lg p-10 space-y-[40px]'>
                            <h1 className='text-2xl text-purple-black font-medium mb-[40px]'>Rekapitulasi Biaya Pemeriksaan</h1>
                            <div className='flex items-center gap-4'>
                                <h1 className='font-semibold'>Tanggal Pemeriksaan</h1>
                                <input onChange={(e) => setStartDate(e.target.value)} type='date' className='mt-1 block w-full p-2 rounded-md border-gray-300 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm' />
                                <h1 className='font-semibold'>s/d</h1>
                                <input onChange={(e) => setEndDate(e.target.value)} type='date' className='mt-1 block w-full p-2 rounded-md border-gray-300 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm' />
                            </div>
                            <div>
                                <h1 className='font-semibold mb-2'>Pilih Pasien</h1>
                                <select  onChange={(e) => setPasien(e.target.value)} className='px-4 py-2 border rounded-md  w-full'>
                                    <option value="">Pilih Pasien...</option>
                                    {Object.values(dataPasien).map((item, idx) => (
                                        <option value={item.id}>{item.fullname}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Action</label>
                                    <div className="mt-2 space-y-2">
                                    <div className="flex items-center">
                                        <input
                                        type="radio"
                                        id="excel"
                                        name="option"
                                        value="excel"
                                        checked={selectedOption === 'excel'}
                                        onChange={handleOptionChange}
                                        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                        />
                                        <label htmlFor="excel" className="ml-3 block text-sm font-medium text-gray-700">
                                        Export to Excel
                                        </label>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            <div className='space-x-5 pt-7 flex items-center justify-end'>
                                {selectedOption === 'excel' ? (
                                    <button onClick={exportToExcel} className='py-2 px-5 border rounded-md bg-purple-700 w-[100px] text-white text-lg'>
                                        Rekap
                                    </button>

                                ) : (
                                    <button disabled onClick={exportToExcel} className='py-2 px-5 border rounded-md bg-purple-300 w-[100px] text-white text-lg cursor-not-allowed'>
                                        Rekap
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
