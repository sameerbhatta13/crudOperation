import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import SignUp from './src/pages/SignUp'
import Login from './src/pages/Login'
import Dashboard from './src/components/Dashboard'
import UserList from './src/components/UserList'
import CVList from './src/components/CVList'
import InterviewerList from './src/components/InterviewerList'
import IndividaulCV from './src/components/IndividaulCV'
import ProtectedRoute from './src/pages/ProtectedRoute'
import HiredCVList from './src/components/HiredCVList'

const MyRoutes = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={localStorage.getItem('token') ? <Navigate to='/dashboard' /> : <Navigate to='/signup' />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/dashboard' element={<ProtectedRoute Cmp={Dashboard} />} >
                        <Route path='userlist' element={<UserList />} />
                        <Route path='cvlist' element={<CVList />} />
                        <Route path='interviewerlist' element={< InterviewerList />} />
                        <Route path='cvlist/:id' element={< IndividaulCV />} />
                        <Route path='hiredcv' element={< HiredCVList />} />
                    </Route>
                </Routes>
            </Router>

        </>
    )
}

export default MyRoutes