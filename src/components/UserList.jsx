import React, { useEffect, useState } from 'react'
import { APP_URL } from '../../config'

const UserList = () => {
    const [userlist, setUserList] = useState([])
    const [search, setSearch] = useState('')

    const fetchUser = async () => {
        try {
            const userlist = await fetch(`${APP_URL}/api/users`, {
                method: 'GET'
            })
            const user = await userlist.json()
            setUserList(user[1])
        } catch (error) {

        }
    }

    const filterUserList = userlist?.vdata?.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase()) || item.email.toLowerCase().includes(search.toLowerCase())
    })

    useEffect(() => {
        fetchUser()
    }, [])
    return (
        <>
            <div className='mx-10 md:mx-24'>
                <input type="search"
                    placeholder='search here .....'
                    className="w-full max-w-md p-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="overflow-x-auto mt-6">
                {
                    filterUserList?.length > 0 ? (
                        <table className="table-auto border-separate border-gray-400 min-w-7xl my-6 rounded-lg p-5 mx-5 md:mx-20">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 p-2">S.N</th>
                                    <th className="border border-gray-300 p-2">Name</th>
                                    <th className="border border-gray-300 p-2">Email</th>
                                    <th className="border border-gray-300 p-2">Role</th>
                                    <th className="border border-gray-300 p-2">Email verified At</th>
                                    <th className="border border-gray-300 p-2">Image</th>
                                </tr>
                            </thead>

                            <tbody className="bg-white text-black">
                                {filterUserList?.map((items, index) => {
                                    return (
                                        <tr key={index} className="text-center w-auto">
                                            <td className="border border-gray-300 p-2">
                                                {index + 1}
                                            </td>
                                            <td className="border border-gray-300 p-2 ">
                                                {items.name}
                                            </td>
                                            <td className="border border-gray-300 p-2 ">
                                                {items.email}
                                            </td>
                                            <td className="border border-gray-300 p-2">
                                                {items.role}
                                            </td>
                                            <td className="border border-gray-300 p-2">
                                                {new Date(items.email_verified_at).toLocaleDateString()}
                                            </td>
                                            <td className="border border-gray-300 p-2">
                                                <img src={`${APP_URL}/${items.avatar}`} alt="null" className='w-20 rounded-full' />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <div className='flex items-center text-2xl font-bold mt-4 mx-24'>
                            <h1>No Matching Records Available</h1>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default UserList