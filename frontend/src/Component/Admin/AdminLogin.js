import React, { useEffect, useState } from 'react'
import "./AdminLogin.css"
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../../Helper/utills'
import { toast } from 'react-toastify'

export default function AdminLogin() {
    const [data,setdata]=useState({})
    const navigate=useNavigate()
    const state=useSelector(state=>state)
    useEffect(()=>{
        if(state.isLoggedIn){
            navigate("/dashboard")
        }else{
          navigate("/adminlogin")
        }
        console.log(state.isLoggedIn)
    },[state]);
    const dispatch=useDispatch()
    const count=useSelector(state=>state.count)
    
    const login=()=>{
        Axios.post("/user/login",{...data}).then((res)=>{
            if(res.data.success){
                dispatch({type:"setIsLoggedIn"})
                dispatch({type:"setUserType",payload:res.data.user.userType})
                dispatch({type:"setuser",payload:res.data.user})
                navigate("/dashboard")
            }else{
                toast.error(res.data.message)
            }
        })
    }
    const updateField=(e)=>{
        setdata({...data,[e.target.name]:e.target.value})
    }
  return (
    <div className="adminlogin-wrapper w-100 bg-dark">
        <div className="container h-100">
            <div className="row justify-content-center align-items-center h-100">
                <div className="col-lg-4 text-center">
                   <div className="admin-login-box py-4 px-3 ">
                   <div className="form-group my-3">
                        <input type="email" name="email" value={data.email} onChange={updateField} className="form-control" placeholder='Enter Email'/>
                    </div>
                    <div className="form-group my-3">
                        <input type="password" name="password" value={data.password} onChange={updateField} className="form-control" placeholder='Enter Email'/>
                    </div>
                    <button className='btn btn-light my-0 ' onClick={login}>Login</button>
                   </div>
                </div>
            </div>
        </div>
    </div>
  )
}
