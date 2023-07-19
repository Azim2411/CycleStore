import React, { useState } from 'react'
import Axios from '../../Helper/utills'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function CreateUser() {
    const [data,setdata]=useState({})
    const navigate=useNavigate()
    const createUser=()=>{
        Axios.post("/user/createUser",{...data}).then((res)=>{
            if(res.data.success){
                toast.success(res.data.message)
                setdata({})
                navigate("/dashboard/users")
            }else{
                toast.error(res.data.message)
            }
        })
    }
    const updateField=(e)=>{
        setdata({...data,[e.target.name]:e.target.value})
    }
    console.log(data)
  return (
    <>
    <h1 className='dashboard-heading'>Create User</h1>
    <div className="container-fluid">
        <div className="row pt-4">
        <div className="col-lg-5">
            <div className="form-group my-2">
                <lable className="form-label d-inline-block">Name</lable>
                <input type="text" value={data.name} className="form-control" name="name" onChange={updateField} />
            </div>
            <div className="form-group my-2">
                <lable className="form-label d-inline-block">Phone</lable>
                <input type="text" value={data.phone} className="form-control"name="phone" onChange={updateField} />
            </div>
            <div className="form-group my-2">
                <lable className="form-label d-inline-block">Email</lable>
                <input type="email" value={data.email} className="form-control" name="email" onChange={updateField} />
            </div>
            <div className="form-group my-2">
                <lable className="form-label d-inline-block">Password</lable>
                <input type="password" value={data.password} className="form-control" name="password" onChange={updateField} />
            </div>
            <div className="form-group my-4">
                <select  id="" name="userType" value={data.userType} onChange={updateField} className='form-select'>
                    <option value="">Select Type</option>
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
                </select>
            </div>
            
        </div>
        <div className="">
            
        <button className='btn btn-success' onClick={createUser}>Create</button>
        </div>
        </div>
    </div>
    
    </>
  )
}
