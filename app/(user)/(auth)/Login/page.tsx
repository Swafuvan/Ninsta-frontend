'use client'
import { LoginForm } from '@/components/forms/loginForm'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useSelector } from 'react-redux'

function LoginRoute() {
  const router = useRouter()
  const user = useSelector((state:any) => state.auth)

  if(user && user.token){
    router.push('/')
  }
  
  return (
    <LoginForm/>
  )
}

export default LoginRoute
