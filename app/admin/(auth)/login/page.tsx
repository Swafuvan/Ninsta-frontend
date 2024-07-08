"use client"
import React, { useEffect, useState } from 'react'

import { Input } from "@/components/ui/input"
import { AdminLogin } from "@/lib/functions/admin/route";
import NinstaLogo from '../../../../public/Ninsta Logo.png'
import Link from "next/link"
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Image from 'next/image';
import { Button } from '@mui/material';
import { LoginValidationSchema } from '@/lib/validation';
import { useRouter } from 'next/navigation'; 
import Cookies from 'js-cookie'
import { setUser } from '@/redux/userSlice';
import { useDispatch,  } from 'react-redux';

interface LoginFormData {
    email: string
    password: string
}

function AdminLoginpage() {
    const dispatch = useDispatch()
    const router = useRouter()
    const [error,setError] = useState('')

    useEffect(()=>{
        if(Cookies.get('adminToken')){
            router.push('/admin/Dashboard')
        }
    }, [])


    const handleSubmit = async (values: LoginFormData, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        try {
            
            const Admin = await AdminLogin(values)
            if(!Admin.data.status){
                setError(Admin.data.message)
            } else {
                const adminSession = Cookies.set('adminToken',Admin.data.adminToken)
                dispatch(setUser(Admin.data.response))
                router.push('/admin/Dashboard')
            }
        } catch (error) {
            console.log(error);
            
        } finally {
            setSubmitting(false);
        }


    }

    return (
        <div className="w-full max-w-xs ">
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={LoginValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="sm:w-380 flex-col border p-5">
                        <Image src={NinstaLogo} height={70} className="ml-20" alt="Logo" />
                        <span className='flex justify-center text-red-600'>{error}</span>
                        <h2 className='font-bold text-2xl pl-14 pb-3'>Admin Login</h2>
                        <p className="pb-2 pl-6">Only Autherised Users can Enter</p>
                        <div className="flex flex-col w-full mt-4 gap-5">
                            <div>
                                <Field type="email" id="email" name="email" placeholder="sample@gmail.com" as={Input} />
                                <ErrorMessage name="email" component="div" className="text-red-500" />
                            </div>
                            <div>
                                <Field type="password" id="password" name="password" placeholder="Password" as={Input} />
                                <ErrorMessage name="password" component="div" className="text-red-500" />
                            </div>
                            <Button className='hover:bg-gray-200 border border-gray-500' type="submit" disabled={isSubmitting}>Login</Button>
                        </div>
                    </Form>
                )}
            </Formik>
           
        </div>
    )
}

export default AdminLoginpage
