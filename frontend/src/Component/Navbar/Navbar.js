import React, { useState } from 'react'
import './Navbar.css'
import Axios from '../../Helper/utills'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [contact,setContact]=useState({
    name:"",
    phone:"",
    email:"",
    message:"",
  })
  const submitContact=()=>{
    Axios.post("/contact/createContact",{...contact}).then((res)=>{
      if(res.data.success){
        alert(res.data.message)
      }else{
        alert(res.data.message)
      }
    })
  }

  const updateContact=(e)=>{
    setContact({...contact,[e.target.name]:e.target.value})
  }
  const user=useSelector(state=>state)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  console.log(user)
  const logout=(e)=>{
    // e.preventDefault();
    dispatch({type:"setLogout"});
    navigate("/");
    window.location.reload();
  }
  return (
    <>
    <div className="mynavbar d-flex justify-content-between align-items-center">
        <h1 className="fw-bold mynavbar-logo m-0"><i>BUMSONTHESADDLE</i></h1>
        {/* <button className='btn btn-dark'><i>Contact Us</i></button> */}
        <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModalcontact" onClick={()=>dispatch({type:"setIsLoggedIn"})}>
  <i>Contact Us</i>
</button>
      
    </div>

<div className="modal fade" id="exampleModalcontact" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered ">
    <div className="modal-content bg-dark">
      <div className="modal-header">
        <h5 className="modal-title " id="exampleModalLabel">Contact Us</h5>
        <button type="button" className="btn-close text-white bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body bg-dark text-white border-0 outline-0 box-shadow-none">
        <div className="form-group mb-2">
          <label htmlFor="" className='form-label'>Name</label>
          <input type="text" className='form-control' name="name"  value={contact.name} onChange={updateContact}/>
        </div>
        <div className="form-group mb-2">
          <label htmlFor="" className='form-label'>Phone</label>
          <input type="number" className='form-control' name="phone" value={contact.phone} onChange={updateContact}/>
        </div>
        <div className="form-group mb-2">
          <label htmlFor="" className='form-label'>Email</label>
          <input type="email" className='form-control' name="email" value={contact.email} onChange={updateContact}/>
        </div>
        <div className="form-group mb-2">
          <label htmlFor="" className='form-label'>Message</label>
          <textarea className='form-control' rows="3" name="message" value={contact.message} onChange={updateContact}></textarea>
        </div>
      </div>
      <div className="modal-footer text-center d-flex justify-content-center">
        {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
        <button type="button" className="btn bg-white text-dark fw-bold" data-bs-dismiss="modal" onClick={submitContact}><i>Submit</i></button>
      </div>
    </div>
  </div>
</div>

    </>
  )
}
