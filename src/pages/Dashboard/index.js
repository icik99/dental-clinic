import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import Api from "../../Api";
import moment from "moment";
import { OdontogramGambar } from "../../assets";
import { BiSearch } from "react-icons/bi";
import { debounce } from "lodash";
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = () => {
  const [dataRekamMedis, setDataRekamMedis] = useState([]);
  const [dataCount, setDataCount] = useState('')
  const [detailRekamMedis, setDetailRekamMedis] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);
  const [dataDetailRekamMedis, setDataDetailRekamMedis] = useState("");
  const [dataOdontogram, setDataOdontogram] = useState([])
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [refresh, setRefresh] = useState(false);
  const [patientStats, setPatientStats] = useState([]);
  const navigate = useNavigate()

  const formatServiceNames = (param) => {
    return param.map(service => service.name).join(', ');
  };

  const getRekamMedis = async () => {
    try {
      const response = await Api.GetListKunjungan(localStorage.getItem("token"), '', '');
      console.log('Data List Kunjungan',response)
      setDataRekamMedis(response.data.data);
      aggregatePatientData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchName = (e) => {
    const searchName = e.target.value
    debouncedSearchName(searchName)
  }

  const debouncedSearchName = debounce(async(name) => {
    try {
      const response = await Api.GetRekamMedis(localStorage.getItem('token'), name, '')
      setDataRekamMedis(response.data.data);
      aggregatePatientData(response.data.data);
    } catch (error) {
      console.log(error)
    }
  }, 300)

  const aggregatePatientData = (data) => {
    const monthlyData = Array(12).fill(0);
    data.forEach(record => {
      const month = moment(record.date).month();
      monthlyData[month]++;
    });
    setPatientStats(monthlyData);
  };

  const openDetailRekamMedis = async (id) => {
    setDetailRekamMedis(!detailRekamMedis);
    try {
      const response = await Api.GetRekamMedisById(localStorage.getItem("token"),id);
      setDataDetailRekamMedis(response.data.data);
      setDataOdontogram(response.data.data.odontogram)
    } catch (error) {
      console.log(error);
    }
  };

  const getCountDashboard = async () => {
    try {
      const res = await Api.GetDashboard(localStorage.getItem('token'))
      setDataCount(res.data.data)
      console.log(res, 'res')
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getRekamMedis();
    getCountDashboard()
  }, []);

  const chartData = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: 'Total Patients',
        data: patientStats,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Modal
        activeModal={modalAlert}
        title={""}
        buttonClose={() => setModalAlert(!modalAlert)}
        width={"750px"}
        content={
          <div className=" w-full space-x-[20px]">
            <h1 className="font-semibold mb-10 pl-4">Pilih Status Pasien: </h1>
            <button
              onClick={() => navigate("/pasien")}
              className="rounded-md p-16 border bg-purple-200 text-3xl font-semibold shadow"
            >
              Pasien Lama
            </button>
            <button
              onClick={() => navigate("/pasien/create")}
              className="rounded-md p-16 border bg-purple-700 text-3xl font-semibold text-white shadow"
            >
              Pasien Baru
            </button>
          </div>
        }
      />
      <Modal
        activeModal={detailRekamMedis}
        title={`Detail Rekam Medis ${dataDetailRekamMedis?.fullname}`}
        buttonClose={() => setDetailRekamMedis(!detailRekamMedis)}
        width={"832px"}
        content={
          <div className=" w-full space-y-[40px]">
            <div className="bg-[#F8F8F8] rounded-[15px] px-[19px] py-[31px] w-[773px] text-[#737373] text-[12px] font-semibold">
              <div className="font-bold text mb-5 space-y-2">
                <h1>
                  No Rekam Medis :{" "}
                  {dataDetailRekamMedis.number_regristation
                    ? dataDetailRekamMedis.number_regristation
                    : "-"}
                </h1>
                <h1 className="col-span-3">
                  Tanggal:{" "}
                  {dataDetailRekamMedis.date ? dataDetailRekamMedis.date : "-"}
                </h1>
                <hr className="border-1" />
              </div>

              <div className="grid grid-cols-12 mx-auto">
                <div className="col-span-3">
                  <h1>Diagnosa</h1>
                  <h1>Terapi</h1>
                  <h1>Keterangan</h1>
                  <h1>Layanan</h1>
                </div>
                <div className="col-span-9">
                  <h1>
                    :{" "}
                    {dataDetailRekamMedis.diagnosis
                      ? dataDetailRekamMedis.diagnosis
                      : "-"}
                  </h1>
                  <h1>
                    :{" "}
                    {dataDetailRekamMedis.therapy
                      ? dataDetailRekamMedis.therapy
                      : "-"}
                  </h1>
                  <h1>
                    :{" "}
                    {dataDetailRekamMedis.description
                      ? dataDetailRekamMedis.description
                      : "-"}
                  </h1>
                  <h1>
                    :{" "}
                    {dataDetailRekamMedis.service
                      ? formatServiceNames(dataDetailRekamMedis.service)
                      : "-"}
                  </h1>
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
            </div>
          </div>
        }
      />
      <div className="min-h-screen bg-[#F2F2F2]">
        <div className="flex w-full">
          <div className="w-fit">
            <Sidebar />
          </div>
          <div className="p-10 w-full ">
            <div className="md:flex lg:flex-row md:gap-[40px] lg:gap-[40px] flex-col gap-[20px] items-start mb-10">
              <Link
                to={"/pasien"}
                className="py-[40px] px-[30px] bg-white w-full border-2 shadow-sm"
              >
                <div className="flex items-center justify-between  mb-2">
                  <h1 className="text-[22px] font-medium">Pasien</h1>
                </div>
                <p className="w-[280px] opacity-40 text-black text-sm text-start font-normal">
                  Lihat data dan rekam medis pasien
                </p>
              </Link>
              <button
                onClick={() => setModalAlert(!modalAlert)}
                className="py-[40px] px-[30px] bg-white w-full border-2 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-[22px] font-medium">Tambah Pasien</h1>
                </div>
                <p className="w-[280px] opacity-40 text-black text-sm text-start font-normal">
                  Tambah data pasien baru
                </p>
              </button>
              {/* <Link
                to={"/odontogram"}
                className="py-[40px] px-[30px] bg-white w-full border-2 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-[22px] font-medium">Odontogram</h1>
                </div>
                <p className="w-[280px] opacity-40 text-black text-sm text-start font-normal">
                  Mengetahui kondisi dan rekam gigi pasien
                </p>
              </Link> */}
            </div>
            <div className="flex items-center justify-between gap-10">
                <div className="w-full">
                    <div className="py-[40px] px-[30px] border-teal-200 bg-white w-full border-2 rounded-xl shadow-xl mb-10" >
                        <div className="flex items-center justify-between  mb-2">
                          <h1 className="text-[22px]  font-semibold">Total Pasien</h1>
                        </div>
                        <p className="w-[full]  text-sm text-start font-semibold">
                          Pasien yang telah terdaftar sebanyak {dataCount.patientToday || '0'} orang
                        </p>
                    </div>
                    <div className="py-[40px] px-[30px] border-teal-200 bg-white w-full border-2 rounded-xl shadow-xl" >
                        <div className="flex items-center justify-between  mb-2">
                          <h1 className="text-[22px]  font-semibold">Total Rekam Medis</h1>
                        </div>
                        <p className="w-[full]  text-sm text-start font-semibold">
                          Rekam Medis yang terdata ada sebanyak {dataCount.totalRM || '0'} rekam medis
                        </p>
                    </div>
                </div>
                <div className="bg-white border-2 p-6 rounded shadow-sm w-full">
                  <h1 className="font-medium text-[22px] mb-4">Total Pasien per Bulan</h1>
                  <Bar data={chartData} />
                </div>
            </div>
            <div className='flex items-center justify-between mt-[20px]'>
                <h1 className="text-2xl text-purple-black font-medium">   Data Kunjungan Pasien </h1>
                <div className="flex items-center justify-end gap-10 ">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="block text-sm font-medium text-gray-700">s/d</label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className='relative'>
                      <BiSearch className='absolute left-[14px] top-[10px] text-[#A8A8A8] text-lg'/>
                      <input onChange={handleSearchName} placeholder='Search by Name or Phone...' className='h-[38px] text-[#A8A8A8] text-[10px] font-[500] pl-12 border rounded-[12px] py-2 w-full lg:w-[300px]'/>
                  </div>
                </div>
            </div>
            <div className="mt-[20px] overflow-auto scrollbar-hide bg-white">
              <table className="w-full space-y-[10px]">
                <div className="flex items-center gap-3 bg-white px-[14px] py-[10px] rounded-[3px]">
                  <div className="flex items-center gap-[15px] min-w-[100px] max-w-[100px]">
                    <h1 className="text-black text-xs font-semibold">
                      No. Rekam Medis
                    </h1>
                  </div>
                  <div className="flex items-center gap-[15px] min-w-[150px] max-w-[150px]">
                    <h1 className="text-black text-xs font-semibold">
                      Tanggal
                    </h1>
                  </div>
                  <div className="flex items-center gap-[15px] min-w-[220px] max-w-[220px]">
                    <h1 className="text-black text-xs font-semibold">
                      Nama Pasien
                    </h1>
                  </div>
                  {localStorage.getItem('role') === 'Petugas Rekam Medis' || localStorage.getItem('role') === 'admin' &&(
                    <div className="flex items-center justify-center gap-[15px] min-w-[220px] max-w-[220px]">
                      <h1 className="text-black text-xs font-semibold">
                        Catatan Perawatan
                      </h1>
                    </div>
                  )}
                  <div className="flex items-center justify-center gap-[15px] w-full">
                    <h1 className="text-black text-xs font-semibold">Action</h1>
                  </div>
                </div>
                {Object.values(dataRekamMedis).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-white px-[14px] py-[8px] rounded-[3px] border-t"
                  >
                    <div className="min-w-[100px] max-w-[100px]">
                      <h1 className="text-purple-800 text-xs font-[600]">
                        {item.noRM}
                      </h1>
                    </div>
                    <div className="min-w-[150px] max-w-[150px]">
                      <h1 className="text-[#737373] text-xs font-[600] line-clamp-1">
                        {moment(item.date).format('DD MMMM YYYY')}
                      </h1>
                    </div>
                    <div className="min-w-[220px] max-w-[220px]">
                      <h1 className="text-[#737373] text-xs font-[600] line-clamp-1">
                        {item.fullname}
                      </h1>
                    </div>
                    {localStorage.getItem('role') === 'Petugas Rekam Medis' || localStorage.getItem('role') === 'admin' &&(
                      <div className="min-w-[220px] max-w-[220px] flex items-center justify-center">
                        <button onClick={() => navigate('/rekam-medis', {state: {idPasien : item.idPatient, namaPasien: item.fullname}})} className="w-[150px] text-xs p-2 font-medium bg-purple-600 text-white rounded-[9px]">
                          Lihat Catatan Perawatan
                        </button>
                      </div>
                    )}
                    <div className="w-full space-x-2 flex justify-center items-center">
                      <button
                        onClick={() => openDetailRekamMedis(item.idRM)}
                        className="w-[50px] text-xs p-2 font-medium bg-purple-600 text-white rounded-[9px]"
                      >Detail
                      </button>
                    </div>
                  </div>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
