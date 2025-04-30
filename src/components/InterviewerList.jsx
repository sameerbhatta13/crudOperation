import React, { useEffect, useState } from 'react'
import { APP_URL } from '../../config'
import Modal from 'react-modal'
import axios from 'axios'

const InterviewerList = () => {
    const [interList, setInterList] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        position: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const fetchList = async () => {
        try {
            const response = await fetch(`${APP_URL}/api/intlists`, {
                method: 'GET'
            })
            const interviewer = await response.json()
            setInterList(interviewer)
        } catch (error) {

        }
    }

    const addInterviewer = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${APP_URL}/api/addInterviewer`, formData)
            if (response.status === 200) {
                setIsModalOpen(false)
                setFormData({ name: '', position: '' })
                await fetchList()
            }
            else {
                console.log('error occured')
            }

        } catch (error) {
            console.log('error', error)

        }
    }

    useEffect(() => {
        fetchList()
    }, [])

    return (
        <>

            <div className='flex justify-end mx-25'>
                <button className='border rounded-lg p-2 gap-2 shadow-[-7px_7px_0px_#000000] font-bold' onClick={() => setIsModalOpen(true)}>Add Interviewer</button>
            </div>
            <div className="overflow-x-auto mt-6">
                <table className="table-auto border-separate border-gray-400 min-w-7xl my-6 rounded-lg p-5 m-20">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">S.N</th>
                            <th className="border border-gray-300 p-2">Name</th>
                            <th className="border border-gray-300 p-2">Postion</th>
                            <th className="border border-gray-300 p-2">Status</th>
                            <th className="border border-gray-300 p-2">DateTime</th>

                        </tr>
                    </thead>

                    <tbody className="bg-white text-black">
                        {interList?.map((items, index) => {
                            return (
                                <tr key={index} className="text-center w-auto">
                                    <td className="border border-gray-300 p-2">
                                        {index + 1}
                                    </td>
                                    <td className="border border-gray-300 p-2 ">
                                        {items.name}
                                    </td>
                                    <td className="border border-gray-300 p-2 ">
                                        {items.position}
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        {items.status}
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        {items.datatime || 'no date available'}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}
                overlayClassName="fixed top-0 left-0 w-full bg-black/60 h-full"
                className='bg-white  relative p-6 rounded-lg shadow-lg w-[300px] md:w-96 mt-28  mx-auto max-h-[80vh] overflow-y-auto'>
                <div className='flex m-3'>
                    <form action="" className='flex flex-col' onSubmit={addInterviewer}>
                        <label htmlFor="" className='text-lg font-semibold my-2'>Name</label>
                        <input type="text" placeholder='enter the name' name='name' onChange={handleChange} className='border border-gray-300 rounded-lg p-2 focus:ring focus:ring-red-300 outline-none' />

                        <label htmlFor="" className='text-lg font-semibold my-2'>Position</label>
                        <input type="text" placeholder='enter the name' name='position' onChange={handleChange} className='border border-gray-300 rounded-lg p-2 focus:ring focus:ring-red-300 outline-none' />

                        <button type='submit' className='border-2 rounded-lg my-4 p-1 bg-green-950 text-white font-bold'>ADD Interviewer</button>
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default InterviewerList