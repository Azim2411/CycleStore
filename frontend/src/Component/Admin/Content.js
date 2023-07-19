import React from 'react'
import './Content.css'
import { Route, Routes } from 'react-router-dom'
import Products from './Products'
import User from './User'
import CreateUser from './CreateUser'
import { useSelector } from 'react-redux'
import Home from './Home'
import UploadCycle from './UploadCycle'
export default function Content() {
  const usertype=useSelector(state=>state.userType)
  return (
    <>
    <div className="content-wrapper">
    <Routes>
      <Route path="" element={<Home/>} />
        <Route path="/products" element={<Products/>} />
        { <Route path="users" element={<User/>} />}
        <Route path="createuser" element={<CreateUser/>}/>
        <Route path="uploadcycle" element={<UploadCycle/>}/>
    </Routes>
    </div>
    </>
  )
}
