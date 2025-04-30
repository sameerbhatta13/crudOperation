import { useState } from 'react'
import React from 'react'
import './App.css'
import MyRoutes from '../MyRoutes'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { ToastContainer } from 'react-toastify'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Provider store={store}>
      <ToastContainer />
      <MyRoutes />
    </Provider>
  )
}

export default App
