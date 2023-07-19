import React, { useEffect, useState } from 'react'
import Axios from '../../Helper/utills'
import './Home.css'
import { useSelector } from 'react-redux'
export default function Home() {
  const [data,setdata]=useState({})
  const [totaladmin,settotaladmin]=useState(0)
  const [totalproduct,settotalprodcut]=useState(0)
  useEffect(()=>{
    Axios.get("/user/getDashboardDetails").then((res)=>{
      settotaladmin(res.data.totaladmin)
      // settotaladmin(res.data.totalproduct)
    })
  },[])
  const isSuperAdmin=useSelector(state=>state.userType=="superadmin")
  return (
    <div className="">
        <h1 className='dashboard-heading mb-3'>Dashboard</h1>

        <div className="container-fluid">
            <div className="row px-0">
                {isSuperAdmin && <div className="col-lg-3 ">
                  <div className="db-card">
                    <h6 className='text-white '>Total Admin</h6>
                    <h3 className='text-white'>{totaladmin}</h3>
                  </div>
                </div>}
                <div className="col-lg-3 ">
                  <div className="db-card">
                    <h6 className='text-white '>Total Product</h6>
                    <h3 className='text-white'>{totalproduct}</h3>
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}
