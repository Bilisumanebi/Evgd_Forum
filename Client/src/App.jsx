import {  Route, Routes } from 'react-router-dom'

import React from 'react'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'



function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />  

    </Routes>   
    </>
  )
}

export default App
