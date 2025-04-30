import React, { useEffect, useState } from 'react'
import { RxAvatar } from "react-icons/rx";
import { APP_URL } from '../../config'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"

const CVList = () => {
    const navigate = useNavigate()
    const [cvlist, setCVList] = useState([])
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

    const fetchCV = async () => {
        try {
            const userlist = await fetch(`${APP_URL}/api/cvlists`, {
                method: 'GET'
            })
            const user = await userlist.json()
            setCVList(user[1])

        } catch (error) {

        }
    }

    const addCV = async (e) => {
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
            const response = await fetch(`${APP_URL}/api/store/cv`, {
                method: 'POST',
                body: formData
            })
            const data = await response.json()
            setIsModalOpen(false)
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchCV()
    }, [])


    return (
        <>
            <div className='flex justify-end mx-25'>
                <Button className='border rounded-lg p-2 gap-2 shadow-[-7px_7px_0px_#000000] font-bold' onClick={() => setIsModalOpen(true)}>Add CV</Button>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-5 p-5 mx-20 my-10'>
                {
                    cvlist?.vdata?.map((item, index) => {
                        return <div key={index} className=' flex flex-col justify-center items-center'>
                            {item?.image === 'null' ? (
                                <img src={`${APP_URL}/${item.image} `} alt="" />
                            ) : (
                                <RxAvatar size={50} className='my-7 ' />
                            )}

                            <h1 className='text-2xl text-neutral-600'>{item.name}</h1>
                            <h1 className='text-xl text-neutral-600'>For: {item.tech}</h1>
                            <button className='bg-green-600 text-white font-light rounded-lg p-2 my-3' onClick={() => navigate(`${item.id}`, { state: item })}>See More</button>
                        </div>
                    })
                }
            </div>


            <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}
                overlayClassName="fixed top-0 left-0 w-full bg-black/60 h-full"
                className='bg-white  relative p-6 rounded-lg shadow-lg w-[300px] md:w-96 mt-20 mx-auto max-h-[80vh] overflow-y-auto'>
                <div className=''>
                    <form action="" className='flex flex-col' onSubmit={addCV}>
                        <label htmlFor="" className='text-lg font-semibold my-2'>Name</label>
                        <input type="text" placeholder='enter the name' name='name' onChange={handleChange} className='border border-gray-300 rounded-lg p-2 focus:ring focus:ring-red-300 outline-none' />

                        <label htmlFor="" className='text-lg font-semibold my-2'>Tech</label>
                        <input type="text" placeholder='tech for' name='tech' onChange={handleChange} className='border border-gray-300 rounded-lg p-2 focus:ring focus:ring-red-300 outline-none' />

                        <label htmlFor="" className='text-lg font-semibold my-2'>level</label>
                        <input type="text" placeholder='level' name='level' onChange={handleChange} className='border border-gray-300 rounded-lg p-2 focus:ring focus:ring-red-300 outline-none' />

                        <label htmlFor="" className='text-lg font-semibold my-2'>salary Expection</label>
                        <input type="number" placeholder='salary' name='salaryexp' onChange={handleChange} className='border border-gray-300 rounded-lg p-2 focus:ring focus:ring-red-300 outline-none' />

                        <label htmlFor="" className='text-lg font-semibold my-2'>Exp</label>
                        <input type="text" placeholder='exp' name='exp' onChange={handleChange} className='border border-gray-300 rounded-lg p-2 focus:ring focus:ring-red-300 outline-none' />

                        <label htmlFor="" className='text-lg font-semibold my-2'>Number</label>
                        <input type="number" placeholder='number' name='number' onChange={handleChange} className='border border-gray-300 rounded-lg p-2 focus:ring focus:ring-red-300 outline-none' />

                        <label htmlFor="" className='text-lg font-semibold my-2'>Email</label>
                        <input type="email" placeholder='email' name='email' onChange={handleChange} className='border border-gray-300 rounded-lg p-2 focus:ring focus:ring-red-300 outline-none' />

                        <label htmlFor="" className='text-lg font-semibold my-2'>Ref</label>
                        <input type="text" placeholder='reference' name='ref' onChange={handleChange} className='border border-gray-300 rounded-lg p-2 focus:ring focus:ring-red-300 outline-none' />

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

export default CVList