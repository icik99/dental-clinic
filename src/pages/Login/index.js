import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BigLogo, Logo } from '../../assets'
import Api from '../../Api'
import toast from 'react-hot-toast'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    
    const login = async () => {
        try {
            const response = await Api.Login(email, password)
            localStorage.setItem('token', response.data.accessToken)
            navigate('/dashboard')
            toast('Selamat Datang Kembali!', {
                icon: '✨',
              });
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.msg)    
        }
    }

  return (
    <div>
        <section className="bg-purple-800">
            <div className="flex flex-col items-center justify-center px-6 py-36 mx-auto min-h-screen">
                
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <div className=" flex items-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            <img  src={BigLogo} alt="logo" />
                        </div>
                        <div className="space-y-4 md:space-y-6">
                            <div>
                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="text" onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username..." required="" />
                            </div>
                            <div>
                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-6" required="" />
                            </div>
                            <h1 className='text-sm text-gray-900'>Belum punya akun? <span><Link to={'/register'} className=' hover:text-blue-700 font-semibold'>Daftarkan akun!</Link></span></h1>
                            <button onClick={login}  className="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">Log in</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default LoginPage