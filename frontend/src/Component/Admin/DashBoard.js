import React from 'react'
import './DashBoard.css'
import Sidebar from './Sidebar'
import Content from './Content'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
export default function DashBoard() {
  const state=useSelector(state=>state)
  const navigate=useNavigate()
  console.log(state.isLoggedIn)
  return (
    
      <>
      <Sidebar/>
      <Content/>
      </>
      
  
  )
}
