import React, { useEffect, useState } from 'react'
import './Products.css'
import { useNavigate } from 'react-router-dom'
import Axios, { getImage } from '../../Helper/utills'
import { toast } from 'react-toastify'
export default function Products() {
  const [data,setData]=useState([])
  useEffect(()=>{
    Axios.get("/product/getallproducts").then((res)=>{
      if(res.data.success){
        setData(res.data.allproducts)
      }
    })
  },[])
  const navigate=useNavigate()
  const deleteProducts=(id)=>{

    Axios.post("/product/deleteProduct/"+id).then((res)=>{
      if(res.data.success){
        toast.success(res.data.message)
        Axios.get("/product/getallproducts").then((res)=>{
          if(res.data.success){
            setData(res.data.allproducts)
          }
        })
      }else{
        toast.error(res.data.message)
      }
    })
  }
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
      <h1 className="dashboard-heading">Products</h1>

      <button className='small-btn' onClick={()=>navigate("/dashboard/uploadcycle")}>Upload Cycle</button>
      
      </div>
      <div className="row">
        <div className="col-12">
          <table className="table fs14 ls1">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Color</th>
                <th>Total Images</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length && data.map((d)=>{
                return <tr>
                  <td>{d.name}</td>
                  <td>{d.price}</td>
                  <td>{d.color}</td>
                  <td>{d.images.length}</td>
                  <td><button className='small-btn bg-danger fs12' onClick={()=>deleteProducts(d._id)}>Delete</button></td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
