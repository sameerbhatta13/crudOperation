import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className='min-h-screen'>
                <div className='grid grid-cols-2 md:grid-cols-4 items-center justify-center p-5 m-20 gap-5'>
                    <div className='border-2 p-4'>
                        <NavLink to='userlist' className={({ isActive }) =>
                            `${isActive ? 'underline underline-offset-4 font-bold text-xl' : ''}`
                        }>User List</NavLink>

                    </div>
                    <div className='border-2 p-4'>
                        <NavLink to='cvlist' className={({ isActive }) =>
                            `${isActive ? 'underline underline-offset-4 font-bold text-xl' : ''}`
                        }>CV List</NavLink>
                    </div>

                    <div className='border-2 p-4'>
                        <NavLink to='hiredcv' className={({ isActive }) =>
                            `${isActive ? 'underline underline-offset-4 font-bold text-xl' : ''}`
                        }>Hired CV</NavLink>

                    </div>
                    <div className='border-2 p-4'>
                        <NavLink to='interviewerlist' className={({ isActive }) =>
                            `${isActive ? 'underline underline-offset-4 font-bold text-xl' : ''}`
                        }>Interviewer List</NavLink>
                    </div>

                </div>
                <Outlet />
            </div>


        </>

    )
}

export default Dashboard