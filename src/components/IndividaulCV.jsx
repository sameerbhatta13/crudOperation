import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { APP_URL } from '../../config'
import { RxAvatar } from "react-icons/rx";
import Modal from 'react-modal'

const IndividaulCV = () => {
    const { id } = useParams()
    const { state } = useLocation()
    const navigate = useNavigate()

    const [individualCV, setIndividualCV] = useState([])
    const cv = individualCV[1]?.vdata

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [previewImg, setPreviewImg] = useState(null)

    const [cvData, setCVData] = useState({
        name: '',
        tech: '',
        level: '',
        salaryexp: '',
        exp: '',
        number: '',
        email: '',
        ref: '',
        image: null,
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setCVData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setCVData((prev) => ({
            ...prev,
            image: file
        }))
        setPreviewImg(URL.createObjectURL(file))
    }

    const fetchCVData = async () => {
        try {
            const response = await fetch(`${APP_URL}/api/cvlists/${id}`, {
                method: 'GET'
            })
            const data = await response.json()
            setIndividualCV(data)
        } catch (error) {

        }
    }

    const updateCV = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('name', cvData.name)
        formData.append('tech', cvData.tech)
        formData.append('level', cvData.level)
        formData.append('salaryexp', cvData.salaryexp)
        formData.append('exp', cvData.exp)
        formData.append('number', cvData.number)
        formData.append('email', cvData.email)
        formData.append('ref', cvData.ref)

        if (cvData.image) {
            formData.append('image', cvData.image)
        }
        try {
            const response = await fetch(`${APP_URL}/api/update/cv/${id} `, {
                method: 'POST',
                body: formData
            })
            const udpateData = await response.json()
            console.log('first', udpateData)
            await fetchCVData()
            setIsModalOpen(false)
        } catch (error) {
        }
    }

    const deleteCV = async () => {
        if (!window.confirm("Are you sure you want to delete this CV?")) return;
        try {
            const response = await fetch(`${APP_URL}/api/delete/cv/${id}`, {
                method: 'POST'
            })
            if (response.ok) {
                alert('cv deleted successfully')
                navigate('/dashboard/cvlist')
            }
            else {
                alert('unable to delete cv')
            }
        } catch (error) {
            alert('An Error Occured while deleting cv')

        }
    }

    useEffect(() => {
        if (state) {
            setCVData({
                name: state.name,
                tech: state.tech,
                level: state.level,
                salaryexp: state.salaryexp,
                exp: state.exp,
                number: state.number,
                email: state.email,
                ref: state.ref,
                image: null,
            })
        }
    }, [state])

    useEffect(() => {
        fetchCVData()
    }, [])


    return (
        <>
            <div className='flex flex-col items-center mx-20'>
                {
                    cv?.image === 'null' ? (
                        <img src={`${APP_URL}/image/${cv?.image}`} alt="image" className='w-40 h-32 rounded-lg object-cover p-2 my-2' />

                    ) : (
                        <RxAvatar size={100} className='my-7 ' />
                    )
                }
                <h1>Image</h1>
                <div>
                    <h1><b>Name:</b> <span className='ml-1.5'>{cv?.name}</span> </h1>
                    <h1><b>Tech:</b> <span className='ml-1.5'>{cv?.tech}</span></h1>
                    <h1><b>level:</b> <span className='ml-1.5'>{cv?.level}</span></h1>
                    <h1><b>Salary Exp:</b> <span className='ml-1.5'> {cv?.salaryexp}</span></h1>
                    <h1><b>Exp:</b> <span className='ml-1.5'>{cv?.exp}</span></h1>
                    <h1><b>Number:</b> <span className='ml-1.5'> {cv?.number}</span></h1>
                    <h1><b>Email:</b> <span className='ml-1.5'> {cv?.email}</span></h1>
                    <h1><b>Ref:</b> <span className='ml-1.5'>{cv?.ref}</span></h1>
                    <h1><b>Task:</b> <span className='ml-1.5'>{cv?.task === null ? 'not assigined' : ''}</span> </h1>
                    <h1><b>Interviewer:</b> <span className='ml-1.5'>{cv?.interviewer === '' ? 'not assigined' : ''}</span></h1>
                    <h1><b>Status:</b> <span className='ml-1.5'> {cv?.status}</span></h1>
                </div>
                <div className='flex flex-row gap-1.5 items-start'>
                    <button type='submit' className='border-2 rounded-lg p-2 my-2 hover:bg-green-300 font-bold' onClick={() => setIsModalOpen(true)}>Update CV</button>
                    <button type='submit' className='border-2 rounded-lg p-2 my-2 hover:bg-red-500  font-bold' onClick={() => deleteCV()}>Delete CV</button>
                </div>
            </div>


            {/* for update cv */}

            <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}
                overlayClassName="fixed top-0 left-0 w-full bg-black/60 h-full"
                className='bg-white  relative p-6 rounded-lg shadow-lg w-[300px] md:w-96 mt-20 mx-auto max-h-[80vh] overflow-y-auto'>
                <div className=''>
                    <form action="" className='flex flex-col' onSubmit={updateCV}>
                        <label htmlFor="" className='text-lg font-semibold my-2'>Name</label>
                        <input type="text" placeholder='enter the name' name='name' value={cvData.name} onChange={handleChange} className='border border-gray-300 rounded-lg p-2 focus:ring focus:ring-red-300 outline-none' />

                        <label htmlFor="" className='text-lg font-semibold my-2'>Tech</label>
                        <input type="text" placeholder='tech for' name='tech' value={cvData.tech} onChange={handleChange} className='border border-gray-300 rounded-lg p-2 focus:ring focus:ring-red-300 outline-none' />

                        <label htmlFor="" className='text-lg font-semibold my-2'>level</label>
                        <input type="text" placeholder='level' name='level' value={cvData.level} onChange={handleChange} className='border border-gray-300 rounded-lg p-2 focus:ring focus:ring-red-300 outline-none' />

                        <label htmlFor="" className='text-lg font-semibold my-2'>salary Expection</label>
                        <input type="number" placeholder='salary' name='salaryexp' value={cvData.salaryexp} onChange={handleChange} className='border border-gray-300 rounded-lg p-2 focus:ring focus:ring-red-300 outline-none' />

                        <label htmlFor="" className='text-lg font-semibold my-2'>Exp</label>
                        <input type="text" placeholder='exp' name='exp' value={cvData.exp} onChange={handleChange} className='border border-gray-300 rounded-lg p-2 focus:ring focus:ring-red-300 outline-none' />

                        <label htmlFor="" className='text-lg font-semibold my-2'>Number</label>
                        <input type="number" placeholder='number' name='number' value={cvData.number} onChange={handleChange} className='border border-gray-300 rounded-lg p-2 focus:ring focus:ring-red-300 outline-none' />

                        <label htmlFor="" className='text-lg font-semibold my-2'>Email</label>
                        <input type="email" placeholder='email' name='email' value={cvData.email} onChange={handleChange} className='border border-gray-300 rounded-lg p-2 focus:ring focus:ring-red-300 outline-none' />

                        <label htmlFor="" className='text-lg font-semibold my-2'>Ref</label>
                        <input type="text" placeholder='reference' name='ref' value={cvData.ref} onChange={handleChange} className='border border-gray-300 rounded-lg p-2 focus:ring focus:ring-red-300 outline-none' />

                        <label htmlFor="" className='text-lg font-semibold my-2'>Image</label>
                        <input type="file" placeholder='img' name='image' onChange={handleImageChange} className='border border-gray-300 rounded-lg p-2 focus:ring focus:ring-red-300 outline-none' />
                        {
                            previewImg && (
                                <img src={previewImg} alt="preview" className='w-40 h-32 rounded-lg object-cover p-2 my-2' />
                            )
                        }

                        <div className='my-2 mx-1'>
                            <button className='border-2 rounded-lg p-2 bg-green-800 text-white'>Submit</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default IndividaulCV