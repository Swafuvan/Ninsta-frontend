"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import NinstaLogo from '../../public/Ninsta Logo.png';
import { Input } from "@/components/ui/input";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Button } from "../ui/button";
import Image from "next/image";
import { SignupValidationSchema } from "@/lib/validation";
import { ResendOtp, createUserAccount, googleSignup, verifyOtp } from "@/lib/functions/user/route";
import OtpInput from 'react-otp-input';
import { GoogleLogin } from '@react-oauth/google';
import { JwtPayload, jwtDecode } from 'jwt-decode'
import { googleUser } from '@/type/users';
import Cookies from 'js-cookie'



interface SignupFormValues {
    email: string;
    username: string;
    password: string;
}

export function SignupRoute() {
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [signupData, setSignupData] = useState<SignupFormValues | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [resendEnabled, setResendEnabled] = useState(true);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;

        if (isOtpSent && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        setResendEnabled(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isOtpSent, timer]);

    const handleSubmit = async (values: SignupFormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        try {
            console.log("vannno")
            const response = await createUserAccount(values);
            console.log(response);
            if (response) {
                console.log("kerrri")
                setSignupData(values);
                setIsOtpSent(true);
                setResendEnabled(false);
                setTimer(60);
            }
        } catch (error) {
            console.error('Signup failed', error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleOtpSubmit = async () => {
        setIsSubmitting(true);
        try {
            console.log(signupData)
            const response = await verifyOtp(signupData?.email!, Number(otp));
            console.log(response)
            if (response) {
                Cookies.set('userToken',response.JWTtoken)
                location.href = '/';
            } else {
                console.error('OTP verification failed');
            }
        } catch (error) {
            console.error('OTP verification failed', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResendOtp = async () => {
        try {
            if (signupData?.email) {
                await ResendOtp(signupData.email);
                setIsOtpSent(true); 
                setResendEnabled(false);
                setTimer(60);
            }
        } catch (error) {
            console.error('Resending OTP failed', error);
        }
    };

    const googleSuccess = async (response: any) => {
        console.log(response.credential);
        if (response.credential) {
            const {email,given_name,name,picture,sub} = jwtDecode(response.credential) as JwtPayload & {
                email: string;
                name: string;
                sub: string;
                given_name:string;
                picture:string;
            }
            const data:googleUser = {
                email:email,
                fullName:name,
                image:picture,
                username:given_name,
                password:sub,
            } 
            console.log(data)
            const UserResult = await googleSignup(data)
            if (UserResult) {
                location.href = '/';
            }

        }


    }

    const errorGoogle = () => {
        console.log()
        alert('eda mone error ada')
    }

    // const handleGoogleSignIn = async () => {
    //     const auth = getAuth();
    //     const provider = new GoogleAuthProvider();

    //     try {
    //         const result = await signInWithPopup(auth, provider);
    //         const user = result.user;
    //         console.log('Google user:', user);
    //         // location.href = '/';
    //     } catch (error) {
    //         console.error('Google Sign-In error:', error);
    //         alert('Google Sign-In failed');
    //     }
    // };


    return (
        <div className="w-full max-w-xs">
            {!isOtpSent ? (
                <div>
                    <Formik
                        initialValues={{
                            email: '',
                            username: '',
                            password: '',
                        }}
                        validationSchema={SignupValidationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="sm:w-380 flex-center flex-col">
                                <Image src={NinstaLogo} width={120} height={70} className="ml-20" alt="Logo" />
                                <p className="pb-2 pl-2">Sign up and see photos and videos<br /> of your friends</p>

                                <div className="flex flex-col mt-4 gap-3">
                                    <div>
                                        <Field type="email" id="email" name="email" placeholder="sample@gmail.com" as={Input} />
                                        <ErrorMessage name="email" component="div" className="text-red-500" />
                                    </div>

                                    <div>
                                        <Field type="text" id="username" name="username" placeholder="Username" as={Input} />
                                        <ErrorMessage name="username" component="div" className="text-red-500" />
                                    </div>

                                    <div>
                                        <Field type="password" id="password" name="password" placeholder="Password" as={Input} />
                                        <ErrorMessage name="password" component="div" className="text-red-500" />
                                    </div>

                                    <Button type="submit" disabled={isSubmitting}>Create account</Button>
                                </div>

                                <p className="text-small-regular text-light-2 text-center mt-2">
                                    Already have an account?
                                    <Link href="/Login" className="text-small-semibold ml-1" style={{ color: 'navy' }}>Log in</Link>
                                </p>
                            </Form>
                        )}
                    </Formik>
                    {/* <div className="flex items-center justify-center pt-6 dark:bg-gray-800">
                        <button
                            onClick={handleGoogleSignIn}
                            className="px-10 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
                        >
                            <Image className="w-6 h-6" width={200} height={100} src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                            <span>Sign up with Google</span>
                        </button>
                    </div> */}
                    <div className='ml-16 mt-4'>
                        <GoogleLogin
                            onSuccess={googleSuccess}
                            onError={errorGoogle}
                            size='large'
                            theme='filled_black'
                            logo_alignment='center'
                            ux_mode='popup'
                            text='signup_with'
                            shape='circle'
                        />
                    </div>

                </div>
            ) : (
                <div className="flex flex-col items-center mb-40 mt-52">
                    <p className="text-small-regular text-light-2 text-center mt-2 mb-5">
                        Please enter the OTP sent to {signupData?.email}
                    </p>
                    <div className="flex items-center justify-center mb-4">
                        <span className="mr-2">Resend OTP in:</span>
                        <span className="text-red-500">{timer}</span>
                    </div>
                    <OtpInput
                        inputStyle={{
                            borderColor: 'gray',
                            backgroundColor: 'beige',
                            marginBottom: '15px',
                            borderRadius: '5px',
                            width: '40px',
                            height: '40px',
                            textAlign: 'center',
                            fontSize: '16px',
                            appearance: 'textfield',
                            MozAppearance: 'textfield',
                        }}
                        value={otp}
                        inputType='number'
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span>-</span>}
                        placeholder='-'
                        renderInput={(props) => (
                            <input
                                {...props}
                                className="input-no-spinner"
                                style={{
                                    ...props.style,
                                }}
                                onWheel={(e) => e.preventDefault()}
                            />
                        )}
                    />
                    <div className='flex justify-around pl-3 w-60'>
                        <Button className='' onClick={handleOtpSubmit} disabled={isSubmitting || otp.length < 6}>Verify OTP</Button>
                        <Button onClick={handleResendOtp} disabled={!resendEnabled}>Resend OTP </Button>
                    </div>
                </div>
            )
            }
        </div >
    );
}
