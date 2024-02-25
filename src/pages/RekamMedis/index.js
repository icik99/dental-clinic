import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Modal from '../../components/Modal';
import ModalDelete from '../../components/ModalDelete';
import { useNavigate, useLocation } from 'react-router-dom';
import Api from '../../Api';
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import moment from 'moment';
import toast from 'react-hot-toast';
import { OdontogramGambar } from '../../assets';
import { FaFileExport } from "react-icons/fa"
;
import { debounce } from 'lodash';
import Pagination from '../../components/Pagination';
import { BiSearch } from 'react-icons/bi';

export default function RekamMedis() {
    const [dataExport, setDataExport] = useState('')
    const [detailRekamMedis, setDetailRekamMedis] = useState(false)
    const params = useLocation()
    const [hapusRekamMedis, setHapusRekamMedis] = useState(false)
    const [dataRekamMedis, setDataRekamMedis] = useState('')
    const [dataServiceRekamMedis, setDataServiceRekamMedis] = useState('')
    const [dataDetailRekamMedis, setDataDetailRekamMedis] = useState('')
    const [dataOdontogram, setDataOdontogram] = useState([])
    const [idRekamMedis, setIdRekamMedis] = useState('')
    const [refresh, setRefresh] = useState('')
    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState('')

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

    const getRekamMedis = async () => {
        try {
            if(params.state === null){
                const response = await Api.GetRekamMedis(localStorage.getItem("token"), '', currentPage);
                console.log(response, 'res')
                setDataRekamMedis(response.data.data);
                setDataServiceRekamMedis(response.data.data.service)
            } else {
                const response = await Api.GetRekamMedisByPatient(localStorage.getItem('token'), params.state.idPasien)
                setDataRekamMedis(response.data.data)
                setDataServiceRekamMedis(response.data.data.service)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSearchName = (e) => {
        const searchName = e.target.value
        debouncedSearchName(searchName)
    }
    const debouncedSearchName = debounce(async(name) => {
        if(params.state === null){
            try {
                const response = await Api.GetRekamMedis(localStorage.getItem('token'), name, currentPage)
                setDataRekamMedis(response.data.data);
                setDataServiceRekamMedis(response.data.data.service)
            } catch (error) {
                console.log(error)
            }
        } else {
            
        }
    }, 300)

    const exportToExcel = () => {
        // Sample data array
        const dataRekamMedis = dataExport;

        // Define custom headers for each table
        const Headers = ['Employee Name', 'Date', 'Check In', 'Location Check In', 'Check Out', 'Location Check Out', 'Duration'];

        // Create modified data arrays with custom headers
        const jobGrade = dataRekamMedis.map(({ user, createdAt, time_checkin, time_checkout, latitude_checkin, longtitude_checkin, latitude_checkout, longtitude_checkout }) => ({
            'Employee Name': user ? user.fullname : '-',
            'Date': moment(createdAt).format('DD MMMM YYYY'),
            'Check In': time_checkin ? moment(time_checkin).format('hh:mm') : '-',
            'Location Check In': latitude_checkin && longtitude_checkin ? latitude_checkin + ',' + longtitude_checkin : '-',
            'Check Out': time_checkout ? moment(time_checkout).format('hh:mm') : '-',
            'Location Check Out': latitude_checkout && longtitude_checkout ? latitude_checkout + ',' + longtitude_checkout : '-',
            // 'Duration': time_checkin && time_checkout ? duration(time_checkin, time_checkout) : '-'
        }));

        // Create a new worksheet for each table
        const worksheetGrade = XLSX.utils.json_to_sheet(jobGrade, { header: Headers });

        // Create a new workbook
        const workbook = XLSX.utils.book_new();

        // Add the worksheets to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheetGrade, 'Rekam Medis');
        // Generate Excel file buffer
        const excelBuffer = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array',
        });

        // Convert buffer to Blob
        const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        // Save the Excel file using FileSaver.js
        saveAs(excelBlob, 'Rekam Medis.xlsx');
    };

    const openDetailRekamMedis = async (id) => {
        setDetailRekamMedis(!detailRekamMedis)
        try {
            const response = await Api.GetRekamMedisById(localStorage.getItem('token'), id)
            setDataDetailRekamMedis(response.data.data)
            setDataOdontogram(response.data.data.odontogram)

        } catch (error) {
            console.log(error)
        }
    }
    const deleteRekamMedis = async () => {
        try {
            const response = await Api.DeleteRekamMedis(localStorage.getItem('token'), idRekamMedis)
            toast.success('Success Delete Rekam Medis')
            setRefresh(true)
            setHapusRekamMedis(!hapusRekamMedis)
        } catch (error) {
            console.log(error)
        }
    }

    const actionDeleteRekamMedis = async (id) => {
        setIdRekamMedis(id)
        setHapusRekamMedis(!hapusRekamMedis)
        setRefresh(true)
    }

    const formatServiceNames = (param) => {
        return param.map(service => service.name).join(', ');
      };

    useEffect(() => {
        getRekamMedis()
        setRefresh(false)
    }, [refresh])

    return (
        <div>
            <Modal 
            activeModal={detailRekamMedis}
            title={`Detail Rekam Medis ${dataDetailRekamMedis?.fullname}`}
            buttonClose={ () => setDetailRekamMedis(!detailRekamMedis)}
            width={'832px'}
            content= {
                <div className=' w-full space-y-[40px]'>
                    <div className='bg-[#F8F8F8] rounded-[15px] px-[19px] py-[31px] w-[773px] text-[#737373] text-[12px] font-semibold'>
                        <div className='font-bold text mb-5 space-y-2'>
                            <h1>No Rekam Medis : {dataDetailRekamMedis.number_regristation ? dataDetailRekamMedis.number_regristation : '-'}</h1>
                            <h1 className='col-span-3'>Tanggal: {dataDetailRekamMedis.date ? dataDetailRekamMedis.date : '-'}</h1>
                            <hr className='border-1'/>
                        </div>

                        <div className='grid grid-cols-12 mx-auto'>
                            <div className='col-span-3'>
                                <h1>Diagnosa</h1>
                                <h1>Terapi</h1>
                                <h1>Keterangan</h1>
                                <h1>Layanan</h1>
                            </div>
                            <div className='col-span-9'>
                                <h1>: {dataDetailRekamMedis.diagnosis ? dataDetailRekamMedis.diagnosis : '-'}</h1>
                                <h1>: {dataDetailRekamMedis.therapy ? dataDetailRekamMedis.therapy : '-'}</h1>
                                <h1>: {dataDetailRekamMedis.description ? dataDetailRekamMedis.description : '-'}</h1>
                                <h1>: {dataDetailRekamMedis.service ? formatServiceNames(dataDetailRekamMedis.service) : '-'}</h1>
                            </div>
                        </div>
                            <div>
                                <h1 className='mt-5 text-lg'>Keterangan Odontogram</h1> 
                                <img src={OdontogramGambar} className='p-4 border-2  mt-2' alt="" />
                                <div className='mt-5'>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th className='border p-2'>No</th>
                                                    <th className='border p-2'>Nomer Gigi</th>
                                                    <th className='border p-2'>Keterangan</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dataOdontogram.map((item, idx) => (
                                                    <tr key={idx}>
                                                        <td className='border p-2'>{idx+1}</td>
                                                        <td className='border p-2'>{item.nomorGigi}</td>
                                                        <td className='border p-2'>{item.label}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                            </div>

                        {/* <div className='text-sm border-2 w-full rounded-md p-3 mt-5'>
                            <h1 className='mb-3 text-[12px] font-medium'>Odontogram:</h1>
                            <div className='p-2'>
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
                                    initialState={dataOdontogram}
                                    />
                            </div>
                        </div> */}
                    </div>

                </div>
                }
            />
            <ModalDelete
                activeModal={hapusRekamMedis}
                buttonClose={() => setHapusRekamMedis(!hapusRekamMedis)}
                submitButton={deleteRekamMedis}
            />
            <div className='min-h-screen bg-[#F2F2F2] w-full'>
                <div className='flex w-full'>
                    <Sidebar />
                    <div className='w-full p-10'>
                        <div className='border-2 bg-white rounded-lg p-10 space-y-[20px]'>
                            <h1 className='text-2xl text-slate-black font-medium mb-[40px]'>Rekam Medis {params.state? params.state.namaPasien : 'Semua Pasien'}</h1>

                                {params.state === null ? (
                                    <div className='flex items-center justify-between gap-2'>
                                        <div className='relative'>
                                            <BiSearch className='absolute left-[14px] top-[10px] text-[#A8A8A8] text-lg'/>
                                            <input onChange={handleSearchName} placeholder='Search by Name...' className='h-[38px] text-[#A8A8A8] text-[10px] font-[500] pl-12 border rounded-[12px] py-2 w-full lg:w-[300px]'/>
                                        </div>
                                        <button className='flex items-center justify-center gap-2 border-2  px-3 py-2 rounded-md shadow-sm font-semibold'>
                                            <FaFileExport className='text-blue-700 font-extrabold'/>
                                            <h1 className='text-sm'>Export Data</h1>
                                        </button>
                                    </div>
                                ) : (
                                    <button onClick={() => navigate('create', {state: {idPasien: params.state.idPasien}})} className='px-3 py-2 border rounded-md shadow-sm text-sm bg-blue-700 text-white'>New Record</button>
                                )}
                            <table className='w-full space-y-[10px]'>
                                <div className='flex items-center gap-3 bg-white px-[14px] py-[10px] rounded-[3px]'>
                                    <div className='flex items-center gap-[15px] min-w-[100px] max-w-[100px]'>
                                        <h1 className='text-black text-xs font-semibold'>No Rekam Medis</h1>
                                    </div>
                                    <div className='flex items-center gap-[15px] min-w-[110px] max-w-[110px]'>
                                        <h1 className='text-black text-xs font-semibold'>Tanggal</h1>
                                    </div>
                                    {params.state === null && (
                                        <div className='flex items-center gap-[15px] min-w-[250px] max-w-[250px]'>
                                            <h1 className='text-black text-xs font-semibold'>Nama Pasien</h1>
                                        </div>
                                    )}
                                    <div className='flex items-center gap-[15px] min-w-[250px] max-w-[250px]'>
                                        <h1 className='text-black text-xs font-semibold'>Layanan</h1>
                                    </div>
                                    <div className='flex items-center gap-[15px] min-w-[200px] max-w-[200px]'>
                                        <h1 className='text-black text-xs font-semibold'>Keterangan</h1>
                                    </div>
                                    <div className=' w-full flex items-center justify-center'>
                                        <h1 className='text-black text-xs text-center font-semibold'>Action</h1>
                                    </div>
                                </div>
                                {Object.values(dataRekamMedis).map((item, idx) => (
                                    <div key={idx} className='flex items-center gap-3 bg-white px-[14px] py-[8px] rounded-[3px] border-t'>
                                        <div className='min-w-[100px] max-w-[100px]'>
                                            <h1 className='text-[#0B63F8] text-xs font-[600]'>{item? item.number_regristation : '-' }</h1>
                                        </div>
                                        <div className='min-w-[110px] max-w-[110px]'>
                                            <h1 className='text-[#737373] text-xs font-[600] line-clamp-1'>{item? moment(item.date).format('DD MMMM YYYY') : '-' }</h1>
                                        </div>
                                        {params.state === null && (
                                            <div className='min-w-[250px] max-w-[250px]'>
                                                <h1 className='text-[#737373] text-xs font-[600] line-clamp-1'>{item? item.fullname : '-' }</h1>
                                            </div>
                                        )}
                                        <div className='min-w-[250px] max-w-[250px]'>
                                            {params.state === null ? (
                                                <h1 className='text-[#737373] text-xs font-[600] line-clamp-1'>{item? item.hasil : '-'}</h1>

                                            ) : (
                                                <h1 className='text-[#737373] text-xs font-[600] line-clamp-1'>{formatServiceNames(item.service)}</h1>
                                            )}
                                        </div>
                                        <div className='min-w-[200px] max-w-[200px]'>
                                            <h1 className='text-[#737373] text-xs font-[600] line-clamp-1'>{item? item.description : '-' }</h1>
                                        </div>
                                        <div className='w-full space-x-2 flex items-center justify-center'>
                                            <button onClick={() => openDetailRekamMedis(item.id)} className='w-[50px] text-xs p-2 font-medium bg-slate-600 text-white rounded-[9px]'> Detail </button>
                                            <button onClick={() => actionDeleteRekamMedis(item.id)} className='w-[50px] text-xs p-2 font-medium bg-slate-600 rounded-[9px] text-white'>Hapus</button>
                                        </div>
                                    </div>
                                ))}
                            </table>
                            {params.state === null && (
                                <Pagination
                                    currentPage={1} 
                                    totalPages={20} 
                                    onPageChange={handlePageChange}
                                    onPrevChange={handlePrevChange}
                                    onNextChange={handleNextChange}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}
