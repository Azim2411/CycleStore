import React, { useEffect, useState } from 'react'
import './User.css'
import Axios from '../../Helper/utills'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
export default function User() {
    const [users,setUsers]=useState([])
    // const [status,setStatus]=useState("")
    const navigate=useNavigate()
    useEffect(()=>{
        Axios.get("/user/getalluser").then((res)=>{
            if(res.data.success){
                setUsers(res.data.users)
            }
        })
    },[])
    const updateUserType=(e,id)=>{
        if(e.target.value == ""){
            return
        }
        let value=e.target.value
        Axios.patch("/user/updateUser/"+id,{userType:value}).then((res)=>{
            if(res.data.success){
                console.log(res.data.user)
                toast.success(res.data.message)
                Axios.get("/user/getalluser").then((res)=>{
                    if(res.data.success){
                        setUsers(res.data.users)
                    }
                })
            }
        })
    }
    const updateStatus=(e,id)=>{
        if(e.target.value == ""){
            return
        }
        let value=e.target.value=="active"?true:false
        Axios.patch("/user/updateUser/"+id,{active:value}).then((res)=>{
            if(res.data.success){
                console.log(res.data.user)
                Axios.get("/user/getalluser").then((res)=>{
                    if(res.data.success){
                        setUsers(res.data.users)
                    }
                })
            }
        })
    }
    
  return (
    <>
     <h1 className='dashboard-heading'>Users</h1>
            <div className='text-end'>
                <button className="btn btn-success small-btn mb-2" onClick={()=>navigate("/dashboard/createuser")}>Create Admin</button>
            </div>
     <div className="container-fluid">
        <div className="row">
            <table className="table fs14">
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>User Type</th>
                    <th>Change Status</th>
                    <th>Active</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length && users.map((u)=>{
                        return <tr>
                            <td>{u.name}</td>
                            <td>{u.phone}</td>
                            <td>{u.email}</td>
                            <td>{u.password}</td>
                            <td>{u.userType}</td>
                            <td>
                            <select className='form-select fs14' onChange={(e)=>updateUserType(e,u._id)}>
                                <option  value="">Select Type</option>
                                <option selected={u.userType=="admin"} value="admin">Admin</option>
                                <option selected={u.userType=="superadmin"} value="superadmin">Super Admin</option>
                            
                                </select>
                            </td>
                            <td><select className='form-select fs14' onChange={(e)=>updateStatus(e,u._id)}>
                                <option value="" >Select Status</option>
                                <option selected={u.active==true} value="active">Active</option>
                                <option selected={u.active==false} value="inactive">In Active</option>
                            
                                </select></td>
                            <td className='ps-4'>{u.active ? <span className='greenlight'></span>:<span className='redlight'></span>}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
     </div>
    </>
  )
}
