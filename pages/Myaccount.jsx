import React, { useEffect } from 'react'
import Router from "next/router";


const Myaccount = () => {
  const router = Router
  useEffect(()=>{
    if(!localStorage.getItem('token')){
      router.push('/')
    }

  })

  return (
    <div>
      my Account
    </div>
  )
}

export default Myaccount
