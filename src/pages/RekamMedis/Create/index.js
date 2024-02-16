import React, { useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import Odontogram from '../../../components/Odontogram/Odontogram'
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';



export default function CreateRekamMedis() {
    const navigate = useNavigate()
    const [layanans, setLayanans] = useState([
        { id: 1, name: 'Layanan 1', price: 300000 },
        { id: 2, name: 'Layanan 2', price: 400000 },
        { id: 3, name: 'Layanan 3', price: 500000 },
    ]);

    const handleAddLayanan = () => {
        const newLayanan = {
        id: layanans.length + 1,
        name: `Layanan ${layanans.length + 1}`,
        price: 0,
        };
        setLayanans([...layanans, newLayanan]);
    };

    const handleDeleteLayanan = (id) => {
        setLayanans(layanans.filter((layanan) => layanan.id !== id));
    };
  return (
    <div>
        <div className='min-h-screen bg-[#F2F2F2]'>
            <div className='flex w-full'>
                <Sidebar />
                <div className='w-full p-10'>
                    <div className='space-y-[20px] w-full p-5 bg-white border-2 rounded-lg relative'>
                        <div className='text-sm space-y-2'>
                            <h1 className='font-medium'>Nama</h1>
                            <input type="text" className='w-full border shadow-md px-2 py-2 rounded-md' placeholder='Nama Pasien....'/>
                        </div>
                        <div className='text-sm flex items-end justify-center w-full gap-3'>
                            <div className='w-full space-y-2'>
                                <h1 className='font-medium'>Layanan</h1>
                                <select className='w-full border shadow-md px-2 outline-none py-2 rounded-md'>
                                    <option value="">Pilih Layanan...</option>
                                    <option value="">Layanan 1</option>
                                    <option value="">Layanan 2</option>
                                    <option value="">Layanan 3</option>
                                </select>
                            </div>
                            <div className='p-2 w-1/2 rounded-md space-y-2 bg-slate-200'>
                                <h1>Rp. 300.000</h1>
                            </div>
                            <div className='flex items-center justify-center gap-1'>
                                <button className='p-2 border rounded-md bg-blue-700 text-white text-lg'>
                                    <IoMdAdd />
                                </button>
                                <button className='p-2 border rounded-md bg-red-700 text-white text-lg'>
                                    <MdDelete />
                                </button>
                            </div>
                        </div>
                        <div className='text-sm border-2 w-full rounded-md p-3'>
                            <h1 className='mb-3 font-medium'>Odontogram:</h1>
                            <Odontogram />
                        </div>

                        <div className='absolute right-9 -bottom-16 space-x-3'>
                            <button onClick={() => navigate(-1)} className='py-2 px-5 border rounded-md border-blue-700  w-[100px] text-blue-700 text-lg'>
                                Cancel
                            </button>
                            <button className='py-2 px-5 border rounded-md bg-blue-700 w-[100px] text-white text-lg'>
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}
