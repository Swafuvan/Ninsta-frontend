'use client'
import { LoginForm } from '@/components/forms/loginForm'
import { RootState } from '@/redux/store'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useSelector } from 'react-redux'

function LoginRoute() {
  const router = useRouter()
  const user = useSelector((state:RootState) => state.auth)

  if(user && user.user){
    router.push('/')
  }
  
  return (
    <LoginForm/>
  )
}

export default LoginRoute
