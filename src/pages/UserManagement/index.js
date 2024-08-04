import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Modal from '../../components/Modal';
import ModalDelete from '../../components/ModalDelete';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Api from '../../Api';
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import moment from 'moment';
import toast from 'react-hot-toast';
import { FaFileExport } from "react-icons/fa";
import { debounce } from 'lodash';
import Pagination from '../../components/Pagination';
import { BiSearch } from 'react-icons/bi';

export default function UserManagement() {
    const [detailUserManagement, setDetailUserManagement] = useState(false)
    const params = useLocation()
    const [editUserManagement, setEditUserManagement] = useState(false)
    const [tambahUserManagement, setTambahUserManagement] = useState(false)
    const [hapusUserManagement, setHapusUserManagement] = useState(false)
    const [dataUserManagement, setDataUserManagement] = useState('')
    const [koreksiUserManagement, setKoreksiUserManagement] = useState(false)
    const [dataDetailUserManagement, setDataDetailUserManagement] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [idUserManagement, setIdUserManagement] = useState('')
    const [refresh, setRefresh] = useState('')
    const [revisiUserManagement, setRevisiUserManagement] = useState('')
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

    const getUserManagement = async () => {
        try {
            const response = await Api.GetUserManagement(localStorage.getItem("token"), '', currentPage);
            setDataUserManagement(response.data.data);
            setCurrentPage(parseInt(response.data.currentPages, 10))
            setTotalPages(response.data.totalPages)
            console.log(response, 'res user')
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
                const response = await Api.GetUserManagement(localStorage.getItem('token'), name, currentPage)
                setDataUserManagement(response.data.data);
            } catch (error) {
                console.log(error)
            }
        } else {
            
        }
    }, 300)


    const openEditUserManagement = async (id) => {
        setEditUserManagement(!editUserManagement)
        try {
            const response = await Api.GetUserManagementById(localStorage.getItem('token'), id)
            console.log(response, 'detail User')
            setDataDetailUserManagement(response.data.data)
            setUsername(response.data.data.username)
            setRole(response.data.data.role)
            setPassword(response.data.data.password)
        } catch (error) {
            console.log(error)
        }
    }
    const deleteUserManagement = async () => {
        try {
            const response = await Api.DeleteUserManagement(localStorage.getItem('token'), idUserManagement)
            toast.success('Success Delete Rekam Medis')
            setRefresh(true)
            setHapusUserManagement(!hapusUserManagement)
        } catch (error) {
            console.log(error)
        }
    }


    const createUser = async () => {
        try {
            const data = {
                username: username,
                password: password,
                role: role,
                email: email,
                fullname: fullname,
            }
            const res = await Api.CreateUserManagement(localStorage.getItem('token'), data)
            toast.success('Sukses Tambah User')
            setTambahUserManagement(!tambahUserManagement)
            setRefresh(true)
        } catch (error) {
            console.log(error)
            toast.error('Gagal Tambah User')
        }
    }

    const editUser = async () => {
        try {
            const data = {
                username: username,
                password: password,
                role: role,
                email: email,
                fullname: fullname,
            }
            const res = await Api.UpdateUserManagement(localStorage.getItem('token'), data, idUserManagement)
            toast.success('Sukses Edit User')
            setEditUserManagement(!editUserManagement)
            setRefresh(true)
        } catch (error) {
            console.log(error)
            toast.error('Gagal Edit User')
        }
    }

    const actionDeleteUserManagement = async (id) => {
        setIdUserManagement(id)
        setHapusUserManagement(!hapusUserManagement)
        setRefresh(true)
    }

    useEffect(() => {
        getUserManagement()
        setRefresh(false)
    }, [refresh])

    return (
        <div>
            <Modal 
                activeModal={tambahUserManagement}
                title={'Add User'}
                buttonClose={ () => setTambahUserManagement(!tambahUserManagement)}
                width={'832px'}
                content= {
                    <div className=' w-full space-y-[40px]'>
                        <div className='bg-[#F8F8F8] rounded-[15px] px-[19px] py-[31px]  text-[#737373] text-[12px] font-semibold space-y-[20px]'>
                            <div className='flex items-center'>
                                <h1 className='w-1/2'>Username</h1>
                                <input value={username}  onChange={(e) => setUsername(e.target.value)} className='px-4 py-2 border rounded-md  w-full' />
                            </div>
                            <div className='flex items-center'>
                                <h1 className='w-1/2'>Fullname</h1>
                                <input value={fullname}  onChange={(e) => setFullname(e.target.value)} className='px-4 py-2 border rounded-md  w-full' />
                            </div>
                            <div className='flex items-center'>
                                <h1 className='w-1/2'>Email</h1>
                                <input value={email}  onChange={(e) => setEmail(e.target.value)} className='px-4 py-2 border rounded-md  w-full' />
                            </div>
                            <div className='flex items-center'>
                                <h1 className='w-1/2'>Role</h1>
                                <select value={role}  onChange={(e) => setRole(e.target.value)} className='px-4 py-2 border rounded-md  w-full' >
                                    <option value="">Select Role...</option>
                                    <option value="admin">Admin</option>
                                    <option value="Petugas Pendaftaran">Petugas Pendaftaran</option>
                                    <option value="Petugas Rekam Medis">Petugas Rekam Medis</option>
                                    <option value="Petugas Kasir">Petugas Kasir</option>
                                </select>
                            </div>
                            <div className='flex items-center'>
                                <h1 className='w-1/2'>Password</h1>
                                <input value={password} type='password'  onChange={(e) => setPassword(e.target.value)} className='px-4 py-2 border rounded-md  w-full' />
                            </div>
                        </div>
                        <div className='ml-[560px] flex items-start justify-end gap-3 w-1/4'>
                            <button onClick={() => setTambahUserManagement(!tambahUserManagement)}  className="py-2 px-5 border rounded-md border-purple-700  w-[100px] text-purple-700 text-lg">Cancel</button>
                            <button onClick={createUser} className="py-2 px-5 border rounded-md bg-purple-700 w-[100px] text-white text-lg">Add</button>
                        </div>
                    </div>
                }
            />
            <Modal 
                activeModal={editUserManagement}
                title={'Edit User'}
                buttonClose={ () => setEditUserManagement(!editUserManagement)}
                width={'832px'}
                content= {
                    <div className=' w-full space-y-[40px]'>
                        <div className='bg-[#F8F8F8] rounded-[15px] px-[19px] py-[31px]  text-[#737373] text-[12px] font-semibold space-y-[20px]'>
                            <div className='flex items-center'>
                                <h1 className='w-1/2'>Username</h1>
                                <input value={username}  onChange={(e) => setUsername(e.target.value)} className='px-4 py-2 border rounded-md  w-full' />
                            </div>
                            <div className='flex items-center'>
                                <h1 className='w-1/2'>Fullname</h1>
                                <input value={fullname}  onChange={(e) => setFullname(e.target.value)} className='px-4 py-2 border rounded-md  w-full' />
                            </div>
                            <div className='flex items-center'>
                                <h1 className='w-1/2'>Email</h1>
                                <input value={email}  onChange={(e) => setEmail(e.target.value)} className='px-4 py-2 border rounded-md  w-full' />
                            </div>
                            <div className='flex items-center'>
                                <h1 className='w-1/2'>Role</h1>
                                <select value={role}  onChange={(e) => setRole(e.target.value)} className='px-4 py-2 border rounded-md  w-full' >
                                    <option value="">Select Role...</option>
                                    <option value="admin">Admin</option>
                                    <option value="Petugas Pendaftaran">Petugas Pendaftaran</option>
                                    <option value="Petugas Rekam Medis">Petugas Rekam Medis</option>
                                    <option value="Petugas Kasir">Petugas Kasir</option>
                                </select>
                            </div>
                            <div className='flex items-center'>
                                <h1 className='w-1/2'>Password</h1>
                                <input value={password}   onChange={(e) => setPassword(e.target.value)} type='password' className='px-4 py-2 border rounded-md  w-full' />
                            </div>
                        </div>
                        <div className='ml-[560px] flex items-start justify-end gap-3 w-1/4'>
                            <button onClick={() => setEditUserManagement(!editUserManagement)}  className="py-2 px-5 border rounded-md border-purple-700  w-[100px] text-purple-700 text-lg">Cancel</button>
                            <button onClick={editUser} className="py-2 px-5 border rounded-md bg-purple-700 w-[100px] text-white text-lg">Save</button>
                        </div>
                    </div>
                }
            />
            <ModalDelete
                activeModal={hapusUserManagement}
                buttonClose={() => setHapusUserManagement(!hapusUserManagement)}
                submitButton={deleteUserManagement}
            />
            <div className='min-h-screen bg-[#F2F2F2] w-full overflow-auto'>
                <div className='flex w-full'>
                    <div className='w-fit'>
                        <Sidebar />
                    </div>
                    <div className='w-full p-10'>
                        <div className='border-2 bg-white rounded-lg p-10 space-y-[20px]'>
                            <h1 className='text-2xl text-purple-black font-medium mb-[40px]'>User Management</h1>
                            <button onClick={() => setTambahUserManagement(!tambahUserManagement)} className='px-3 py-2 border rounded-md shadow-sm text-sm bg-purple-700 text-white'>New User</button>

                            <table className='w-full space-y-[10px] '>
                                <div className='flex items-center gap-3 bg-white px-[14px] py-[10px] rounded-[3px]'>
                                    <div className='flex items-center gap-[15px] w-full'>
                                        <h1 className='text-black text-xs font-semibold'>No.</h1>
                                    </div>
                                    <div className='flex items-center gap-[15px] w-full'>
                                        <h1 className='text-black text-xs font-semibold'>Role</h1>
                                    </div>
                                    <div className='flex items-center gap-[15px] w-full'>
                                        <h1 className='text-black text-xs font-semibold'>Username</h1>
                                    </div>
                                    <div className='flex items-center gap-[15px] w-full'>
                                        <h1 className='text-black text-xs font-semibold'>Fullname</h1>
                                    </div>
                                    <div className='flex items-center gap-[15px] w-full'>
                                        <h1 className='text-black text-xs font-semibold'>Email</h1>
                                    </div>
                                    <div className=' w-full flex items-center justify-start'>
                                        <h1 className='text-black text-xs text-center font-semibold'>Action</h1>
                                    </div>
                                </div>
                                {Object.values(dataUserManagement).map((item, idx) => (
                                    <div key={idx} className='flex items-center gap-3 bg-white px-[14px] py-[8px] rounded-[3px] border-t'>
                                        <div className='w-full'>
                                            <h1 className='text-purple-800 text-xs font-[600]'>{idx + 1 }</h1>
                                        </div>
                                        <div className='w-full'>
                                            <h1 className='text-purple-800 text-xs font-[600]'>{item.role? item.role : '-' }</h1>
                                        </div>
                                        <div className='w-full'>
                                            <h1 className='text-[#737373] text-xs font-[600] line-clamp-1'>{item.username? item.username : '-' }</h1>
                                        </div>
                                        <div className='w-full'>
                                            <h1 className='text-[#737373] text-xs font-[600] line-clamp-1'>{item.fullname? item.fullname : '-' }</h1>
                                        </div>
                                        <div className='w-full'>
                                            <h1 className='text-[#737373] text-xs font-[600] line-clamp-1'>{item.email? item.email : '-' }</h1>
                                        </div>
                                        <div className='w-full space-x-2 flex items-center justify-start'>
                                            <button onClick={() => openEditUserManagement(item.id)} className='w-[50px] text-xs p-2 font-medium bg-purple-600 text-white rounded-[9px]'>Edit</button>
                                            <button onClick={() => actionDeleteUserManagement(item.id) } className='w-[50px] text-xs p-2 font-medium bg-purple-600 rounded-[9px] text-white'>Delete</button>
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
                </div>
            </div>
        </div>
  )
}
