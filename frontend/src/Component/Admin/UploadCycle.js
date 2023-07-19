import React, { useEffect, useState } from 'react'
import './UploadCycle.css'
import Axios from '../../Helper/utills'
import {toast} from 'react-toastify'
import Lottie from "react-lottie";
import animationData from "./animation.json";
export default function UploadCycle() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };
    const [data,setData]=useState({
        name:"",
        price:0,
        color:"",
        description:"",
        images:[]
    })
    const [files,setfiles]=useState([])
    const [loader,setLoader]=useState(false)
    const updateData=(e)=>{
        if(e.target.name != "images"){
            setData({...data,[e.target.name]:e.target.value})
        }
    }
    const uploadCycle=()=>{
        const formdata= new FormData()
        for (let file of files){
            formdata.append("files",file)
        }
        if(files.length < 1){
            return toast.error("Please Select Images")
        }
        Axios.post("/s3/uploadmultiple",formdata).then((res)=>{
            setLoader(true)
            if(res.data.success && res.data.files.length){
                Axios.post("/product/uploadProduct",{...data,images:res.data.files}).then((prores)=>{
                    if(prores.data.success){
                        toast.success(prores.data.message)
                        setLoader(false)
                    }else{
                        toast.error(prores.data.message)
                    }
                })
            }else{
                toast.error(res.data.message)
            }
        })
    }
    const updatefiles=(e)=>{
        setfiles([...files,e.target.files[0]])
    }
   
  return (
    <div className='uc-wrapper position-relative'>
        {loader && <div className="uc-loader">
            <div className="d-flex flex-column align-items-center">
            <Lottie options={defaultOptions} height={300} width={300} />
            <h4 className='text-dark mb-3 mt-3'>Product Uploading...</h4>
            {/* <div className="spinner">
            </div> */}
            </div>

            </div>}
        <h1 className='dashboard-heading'>Upload Cycle</h1>
        <div className="row flex-column py-2">
            <div className="col-lg-4">
            <div className="form-group py-2">
                <lable className="form-label">Product Name</lable>
                <input type="text" name="name" className="form-control" onChange={updateData} />
            </div>
            </div>
            <div className="col-lg-4">
            <div className="form-group py-2">
                <lable className="form-label">Description</lable>
                <textarea type="number" className="form-control" name="description" rows={4} onChange={updateData} />
            </div>
            </div>
            <div className="col-lg-4">
            <div className="form-group py-2">
                <lable className="form-label">Price</lable>
                <input type="number" className="form-control" name="price" onChange={updateData} />
            </div>
            </div>
            <div className="col-lg-4">
            <div className="form-group py-2">
                <lable className="form-label">Color</lable>
                <input type="text" className="form-control" name='color' onChange={updateData} />
            </div>
            </div>
            <div className="row py-2">
                {[1,2,3,4,5,6,7,8].map((count)=>{
                    return <div className="col-lg-3 ">
                        <div className="form-group py-2">
                            <label htmlFor="" className="form-label">Image {count}</label>
                    <input type="file" className='form-control' accept='image/*' name='images'  onChange={updatefiles}/>
                    
                        </div>
                    </div>
                })}
            <div className="my-2">
                <button className='btn btn-success' onClick={uploadCycle}>Upload Cycle</button>
            </div>
            </div>
        </div>
    </div>
  )
}
