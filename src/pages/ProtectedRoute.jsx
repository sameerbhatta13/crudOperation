import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import SignUp from './SignUp'

const ProtectedRoute = (props) => {
    const { Cmp } = props
    const token = localStorage.getItem('token')
    // console.log('token', token)
    if (!token) {
        return <Navigate to='/login' />
    }

    return (
        <>
            <Cmp />
        </>
    )

}

export default ProtectedRoute