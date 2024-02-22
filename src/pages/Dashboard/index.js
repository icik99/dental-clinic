import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { AiOutlineEye } from "react-icons/ai";
import { HiOutlinePencil } from "react-icons/hi";
import Navbar from "../../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import Api from "../../Api";
import Odontogram from "../../components/Odontogram/Odontogram";
import moment from "moment";

const Dashboard = () => {
  const [dataRekamMedis, setDataRekamMedis] = useState("");
  const [detailRekamMedis, setDetailRekamMedis] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);
  const [dataDetailRekamMedis, setDataDetailRekamMedis] = useState("");
  const [refresh, setRefresh] = useState(false);

  const formatServiceNames = (param) => {
    return param.map(service => service.name).join(', ');
  };

  const getRekamMedis = async () => {
    try {
      const response = await Api.GetRekamMedis(localStorage.getItem("token"));
      console.log(response, "response rekam medis");
      setDataRekamMedis(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const openDetailRekamMedis = async (id) => {
    setDetailRekamMedis(!detailRekamMedis);
    try {
      const response = await Api.GetRekamMedisById(localStorage.getItem("token"),id
      );
      setDataDetailRekamMedis(response.data.data);
      console.log(response, "detail");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRekamMedis();
  }, []);

  const navigate = useNavigate();
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
              className="rounded-md p-16 border bg-slate-200 text-3xl font-semibold shadow"
            >
              Pasien Lama
            </button>
            <button
              onClick={() => navigate("/pasien/create")}
              className="rounded-md p-16 border bg-slate-700 text-3xl font-semibold text-white shadow"
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

              <div className="text-sm border-2 w-full rounded-md p-3 mt-5">
                <h1 className="mb-3 text-[12px] font-medium">Odontogram:</h1>
                {/* <Odontogram /> */}
              </div>
            </div>
          </div>
        }
      />
      <div className="min-h-screen bg-[#F2F2F2]">
        <div className="flex w-full">
          <Sidebar />
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
                <div className="flex items-center justify-between  mb-2">
                  <h1 className="text-[22px] font-medium">Reservasi</h1>
                </div>
                <p className="w-[280px] opacity-40 text-black text-sm text-start font-normal">
                  Reservasi pasien
                </p>
              </button>
              <Link
                to={"/payment"}
                className="py-[40px] px-[30px] bg-white w-full border-2 shadow-sm"
              >
                <div className="flex items-center justify-between  mb-2">
                  <h1 className="text-[22px] font-medium">Pembayaran</h1>
                </div>
                <p className="w-[280px] opacity-40 text-black text-sm text-start font-normal">
                  Lihat dan edit status pembayaran
                </p>
              </Link>
            </div>
            <h1 className="text-2xl text-slate-black font-medium">
              Data Kunjungan Pasien
            </h1>
            <div className="mt-[44px] overflow-auto scrollbar-hide bg-white">
              <table className="w-full space-y-[10px]">
                <div className="flex items-center gap-3 bg-white px-[14px] py-[10px] rounded-[3px]">
                  <div className="flex items-center gap-[15px] min-w-[100px] max-w-[100px]">
                    <h1 className="text-black text-xs font-semibold">
                      No Registrasi
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
                  <div className="flex items-center gap-[15px] min-w-[300px] max-w-[300px]">
                    <h1 className="text-black text-xs font-semibold">
                      Layanan
                    </h1>
                  </div>
                  <div className="flex items-center gap-[15px] min-w-[220px] max-w-[220px]">
                    <h1 className="text-black text-xs font-semibold">
                      Catatan Perawatan
                    </h1>
                  </div>
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
                      <h1 className="text-[#0B63F8] text-xs font-[600]">
                        {item.number_regristation}
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
                    <div className="min-w-[300px] max-w-[300px]">
                      <h1 className="text-[#737373] text-xs font-[600] line-clamp-1">
                        {item.hasil}
                      </h1>
                    </div>
                    <div className="min-w-[220px] max-w-[220px]">
                      <h1 className="w-[150px] text-xs p-2 font-medium bg-slate-600 text-white rounded-[9px]">
                        Lihat Catatan Perawatan
                      </h1>
                    </div>
                    <div className="w-full space-x-2">
                      <button
                        onClick={() => openDetailRekamMedis(item.id)}
                        className="w-[50px] text-xs p-2 font-medium bg-slate-600 text-white rounded-[9px]"
                      >
                        {" "}
                        Detail{" "}
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
