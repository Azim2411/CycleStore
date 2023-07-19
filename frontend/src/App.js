import React, { useEffect } from 'react'
import {BrowserRouter,Routes,Route, useNavigate, Navigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import AOS from "aos";
import "aos/dist/aos.css";
import DashBoard from './Component/Admin/DashBoard';
import HomeLayout from './Component/HomeLayout/HomeLayout';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
export default function App() {
  useEffect(() => {
    AOS.init({
      duration:1000,
    });
    AOS.refresh();
  }, []);
    const state=useSelector(state=>state);
  return (
    <>
    <BrowserRouter>
    <Routes>
    {state.isLoggedIn && <Route path="/dashboard/*" exact element={<DashBoard/>} /> }
      <Route path="*" exact element={<HomeLayout/>} />
      
    </Routes>   
    <ToastContainer autoClose={2000} position='top-center' theme='dark'/>
    </BrowserRouter>
    </>
  )
}
