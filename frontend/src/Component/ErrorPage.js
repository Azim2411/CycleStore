import React from 'react'
import './ErrorPage.css'
import { useNavigate } from 'react-router-dom'
export default function ErrorPage() {
    const navigate=useNavigate()
  return (
    <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
        <div className="d-flex flex-column align-items-center">
        <h1 className='text-danger fw-bold err-heading'>404 Page Not Found</h1>
        <button className="btn btn-dark rounded-0 btn-lg" onClick={()=>navigate('/')}>Home</button>
        </div>
    </div>
  )
}
