import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    
    // const login = async () => {
    //     try {
    //         const response = await Api.Login(email, password)
    //         localStorage.setItem('token', response.data.accessToken)
    //         navigate('/dashboard')
    //         toast('Selamat Datang Kembali!', {
    //             icon: '✨',
    //           });
    //     } catch (error) {
    //         console.log(error)
    //         toast.error(error.response.data.msg)    
    //     }
    // }

  return (
    <div>
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className='flex items-center justify-between pt-7 px-4'>
                <img className="w-16 h-16 mr-2" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Logo_BNN.svg/900px-Logo_BNN.svg.png" alt="logo" />
                <div className=''>
                    <h1 className='text-center text-3xl font-bold'>Klinik Halo Halo Bandung - Makassar</h1>
                    <h1 className='text-center text-xl font-semibold'>Jalan Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, necessitatibus.</h1>
                </div>
                <img className="w-16 h-16 mr-2" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Logo_BNN.svg/900px-Logo_BNN.svg.png" alt="logo" />
            </div>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Silahkan Masukan Username dan Password!
                        </h1>
                        <div className="space-y-4 md:space-y-6">
                            <div>
                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="text" onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username..." required="" />
                            </div>
                            <div>
                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-6" required="" />
                            </div>
                            <button onClick={() => navigate('/')}  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Log in</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default LoginPage