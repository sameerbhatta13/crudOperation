import React, { useState } from 'react'
import { setToken } from '../redux/slice/UserSlice'
import { APP_URL } from '../../config'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const handleChange = event => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!values.email || !values.password) {
            toast.error('please fill up the form')
        }
        else {
            try {
                const response = await fetch(`${APP_URL}/api/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',

                    },
                    // credentials: 'include',
                    body: JSON.stringify(values)

                })
                if (response.ok) {
                    const data = await response.json()
                    // console.log(data)
                    toast.success('successfully logged in ')

                    const { token } = data
                    console.log("token", token)
                    dispatch(
                        setToken({ token })
                    )
                    navigate('/dashboard')
                    localStorage.setItem('token', token)
                    // localStorage.setItem('refreshToken', data.refreshToken)

                }
                else {
                    const errorData = await response.json()
                    toast.error(`${errorData.message}`)
                }


            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <>
            <>
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-600">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-600">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    onChange={handleChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200 text-xl">
                                Log In
                            </button>
                        </form>
                        <div className='mt-3'>
                            {/* <a href='' onClick={(e) => { setIsModalOpen(true), e.preventDefault() }} className='font-mono text-red-700 my-1'>Forget Password ?</a> */}
                            <h1 className='font-serif'>Does Not Have Account ? <a href='/' className='font-bold hover:text-blue-500'> SignUp</a> </h1>
                        </div>

                    </div>
                </div>


            </>
        </>
    )
}

export default Login