"use client";
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import NinstaLogo from '../../public/Ninsta Logo.png'
import Link from "next/link"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Image from "next/image"
import { LoginValidationSchema } from "@/lib/validation"
import { userLogin } from "@/lib/functions/user/route";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie'
import { googleUser } from "@/type/users";
import { useRouter } from "next/navigation";
import { UseSelector, useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";
import { FaEye,FaEyeSlash } from 'react-icons/fa'; 

interface LoginFormValues {
    email: string;
    password: string;
}

export function LoginForm() {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const dispatch = useDispatch();
    const [passwordVisible, setPasswordVisible] = useState(false); 

    React.useLayoutEffect(() => {
        const token = Cookies.get('userToken');
        if (token) {
            router.push('/');
        }
    }, [router]);

    const [Error, setError] = React.useState('');
    const handleSubmit = async (values: LoginFormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        try {
            const user = await userLogin(values);
            if (user.userDetails && user.JWTtoken) {
                await Cookies.set('userToken', user.JWTtoken);
                dispatch(setUser(user.userDetails));
                router.push('/');
            } else {
                setError(user.message);
            }
        } catch (error) {
            console.error('Login failed', error);
        } finally {
            setSubmitting(false);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(prevState => !prevState);
    };

    const googleSuccess = async (response: any) => {
        if (response.credential) {
            const usersResult = JSON.parse(JSON.stringify(jwtDecode(response.credential)));
            let data = { email: usersResult?.email, password: usersResult?.sub };
            const UserResult = await userLogin(data);
            if (UserResult) {
                Cookies.set('userToken', UserResult.JWTtoken);
                dispatch(setUser(UserResult.userDetails));
                router.push('/');
            }
        }
    };

    const errorGoogle = () => {
        console.log('Google login failed');
    };

    return (
        <div className="w-full max-w-xs">
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={LoginValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="sm:w-380 flex-col">
                        <Image src={NinstaLogo} height={70} className="ml-24" alt="Logo" />
                        <p className="pb-2 pl-14">Log in and enjoy with friends</p>
                        <span className="text-red-600 flex justify-center">{Error}</span>
                        <div className="flex flex-col w-full mt-4 gap-5">
                            <div>
                                <Field type="email" id="email" name="email" placeholder="sample@gmail.com" as={Input} />
                                <ErrorMessage name="email" component="div" className="text-red-500" />
                            </div>
                            <div className="relative">
                                <Field
                                    type={passwordVisible ? "text" : "password"} 
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    as={Input}
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500" />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-2 text-gray-500"
                                >
                                    {passwordVisible ? ( 
                                        <FaEyeSlash className="h-5 w-5" aria-hidden="true" />
                                    ) : (
                                        <FaEye className="h-5 w-5" aria-hidden="true" />
                                    )}
                                </button>
                            </div>
                            <Button type="submit" className="bg-slate-300 hover:bg-slate-500 rounded-md" disabled={isSubmitting}>
                                Login
                            </Button>
                        </div>
                        <p className="text-small-regular text-light-2 text-center mt-2">
                            Dont have an account?
                            <Link href="/signup" className="text-small-semibold ml-1" style={{ color: 'navy' }}>Sign up</Link>
                        </p>
                        <p className="text-small-regular text-light-2 text-center mt-3">
                            Forgot Password?
                            <Link href="/forgot-password" className="text-small-semibold ml-1" style={{ color: 'navy' }}>Click here</Link>
                        </p>
                    </Form>
                )}
            </Formik>
            <div className="ml-16 mt-4">
                <GoogleLogin
                    onSuccess={googleSuccess}
                    onError={errorGoogle}
                    size='large'
                    theme='filled_black'
                    logo_alignment='center'
                    ux_mode='popup'
                    text="signin_with"
                    shape="circle"
                />
            </div>
        </div>
    );
}
