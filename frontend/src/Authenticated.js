import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import DashBoard from './Component/Admin/DashBoard'
import AdminLogin from './Component/Admin/AdminLogin'

export default function Authenticated() {
  const navigate=useNavigate()
    const state=useSelector(state=>state);

  return (
    <>
    <Routes>
    {state.isLoggedIn && <Route path="/dashboard/*" exact element={<DashBoard/>} /> }
    </Routes>
    </>
  )
}
