import React, { useEffect, useState } from 'react'
import './ProductDetails.css'
import { useNavigate, useParams } from 'react-router-dom'
import Axios, { formatIndianRupee, getImage } from '../../Helper/utills'
export default function ProductDetails() {
    const params=useParams()
    const [data,setData]=useState({})
    const [activeScreen,setActiveScreen]=useState("")
    useEffect(()=>{
        Axios.get("/product/getSingleProduct/"+params.id).then((res)=>{
            if(res.data.success){
                setData(res.data.product)
                setActiveScreen(res.data.product.images[0])
            }
        }
        )
    },[])
    console.log(data)
    console.log(activeScreen)
    const navigate=useNavigate()
  return (
    <div className="pd-wrapper">
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-6 position-relative">
                    <div className="pd-screen-stepper position-absolute d-flex flex-wrap ">
                        {data.images?.length && data.images.map((imglink)=>{
                            return <div className="" onClick={()=>{setActiveScreen(imglink)}}>
                                 <img src={getImage(imglink)} width={"100px"} className=' m-2 box-shadow d-inline-block' height={"80px"} />
                            </div>
                        })}
                    </div>
                        {activeScreen &&
                    <div className="pd-screen" >
                        <img src={getImage(activeScreen)} className="pd-screen-img" alt=""/>
                    </div>
                        }
                </div>
                <div className="col-lg-6 py-3 d-flex flex-column justify-content-between">
                    <div className="">
                    <button className='pointer btn btn-light mb-2 bg-white' onClick={()=>navigate("/")}>Home</button>
                    <h1 className='pd-name text-uppercase my-3'>{data.name}</h1>
                    <h4 className='my-4'>{formatIndianRupee(data.price)}</h4>
                    <label htmlFor="" className="form-label text-uppercase lp1">Description</label>
                    <p className='text-secondary'>{data.description}</p>
                    </div>
                    <button className='btn btn-dark w-100 rounded-0 py-3 text-uppercase'>Contact Us</button>
                </div>
            </div>
        </div>
    </div>
  )
}
