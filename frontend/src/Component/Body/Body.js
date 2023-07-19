import React, { useEffect, useState } from 'react'
import './Body.css'
import Card from '../Card/Card'
import Axios from '../../Helper/utills'

export default function Body() {
  const [data,setData]=useState([])
  useEffect(()=>{
    Axios.get("/product/getallproducts").then((res)=>{
      if(res.data.success){
        setData(res.data.allproducts)
      }
    })
  },[])
  
  return (
    <>
    <div className="body-wrapper py-3">
    <div className="container-lg">
        <div className="row ">
            {data.length ? data.map((d,i)=>{
              return <div className="col-lg-3" >
              <Card data={d} id={i}/>
              </div>
            }):""}
            
        </div>
    </div>
    </div>
    </>
  )
}
