import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Body from '../Body/Body'
import AdminLogin from '../Admin/AdminLogin'
import Navbar from '../Navbar/Navbar'
import ErrorPage from '../ErrorPage'
import ProductDetails from '../Body/ProductDetails'

export default function HomeLayout() {
  return (
    <>
    {  <Navbar/>}
    <Routes>
    <Route path="/" exact element={<Body/>}/>
      <Route path="/adminlogin" exact element={<AdminLogin/>}/>
      <Route path="/productDetails/:id" exact element={<ProductDetails/>}/>
      <Route path="*" exact element={<ErrorPage/>}/>
    </Routes>
    </>
  )
}
