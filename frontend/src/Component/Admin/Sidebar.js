import React from 'react'
import './Sidebar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../../Helper/utills'
import {toast} from 'react-toastify'
export default function Sidebar() {
  const usertype=useSelector(state=>state.userType)
  const state=useSelector(state=>state)
  console.log("state",state)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const logout=()=>{
    Axios.post("/user/logout").then((res)=>{
      if(res.data.success){
        toast.success(res.data.message)
        dispatch({type:"setLogout"})
        dispatch({type:"setUserType",payload:""})
        dispatch({type:"setuser",payload:{}})
        navigate("/")
      }else{
        toast.error(res.data.message)
      }
    })
    
  }
  return (
    <>
    <div className="sidebar-wrapper d-flex flex-column justify-content-between">
        <div className="sidebar-top">
        <Link className='sidebar-link' to=""><h2 className='sidebar-btn'>Dashboard</h2></Link>
      {usertype=="superadmin" && <Link className='sidebar-link' to="users"><h2 className='sidebar-btn'>Users</h2></Link>}
        <Link className='sidebar-link' to="products"><h2  className='sidebar-btn'>Product</h2></Link>
        </div>
        <div className="sidebar-bottom ">
        <h2  className='sidebar-btn border-2 border-secondary border-top' onClick={logout}>Logout</h2>

        </div>
    </div>
    </>
  )
}
