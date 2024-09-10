
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
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/userSlice';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

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
    const [error, setError] = useState('');
    const [resend, setResend] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
    const router = useRouter();
    const dispatch = useDispatch();

    React.useLayoutEffect(() => {
        const token = Cookies.get('userToken')
        if (token) {
            router.push('/');
        }
    });

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
            const response = await createUserAccount(values);
            if (response) {
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
            const response = await verifyOtp(signupData?.email!, Number(otp));
            if (response?.data?.message) {
                setError(response?.data?.message);
                return;
            }
            if (response?.data?.userData) {
                Cookies.set('userToken', response?.data?.JWTtoken);
                dispatch(setUser(response?.data?.userData));
                router.push('/');
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
                const resended = await ResendOtp(signupData.email);
                if (resended) {
                    setResend(resended.data.message);
                    setIsOtpSent(true);
                    setResendEnabled(false);
                    setTimer(60);
                }
            }
        } catch (error) {
            console.error('Resending OTP failed', error);
        }
    };

    const googleSuccess = async (response: any) => {
        if (response.credential) {
            const { email, given_name, name, picture, sub } = jwtDecode(response.credential) as JwtPayload & {
                email: string;
                name: string;
                sub: string;
                given_name: string;
                picture: string;
            };
            const data: googleUser = {
                email: email,
                fullName: name,
                image: picture,
                username: given_name,
                password: sub,
            };
            const UserResult = await googleSignup(data);
            if (UserResult) {
                Cookies.set('userToken', UserResult.JWTtoken);
                dispatch(setUser(UserResult.userData));
                router.push('/');
            }
        }
    };

    const errorGoogle = () => {
        alert('Google Sign-In failed');
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

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

                                    <div className="relative">
                                        <Field
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            placeholder="Password"
                                            as={Input}
                                        />
                                        <ErrorMessage name="password" component="div" className="text-red-500" />
                                        <div
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                        </div>
                                    </div>

                                    <Button type="submit" className='hover:bg-slate-500 bg-slate-300' disabled={isSubmitting}>Create account</Button>
                                </div>

                                <p className="text-small-regular text-light-2 text-center mt-2">
                                    Already have an account?
                                    <Link href="/Login" className="text-small-semibold ml-1" style={{ color: 'navy' }}>Log in</Link>
                                </p>
                            </Form>
                        )}
                    </Formik>

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
                    <span className='text-red-600 text-xl'>{error}</span>
                    <span className='text-green-600 text-xl'>{resend}</span>
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
                        <Button className='bg-slate-300 cursor-pointer hover:bg-slate-500' onClick={handleOtpSubmit} disabled={isSubmitting || otp.length < 6}>Verify OTP</Button>
                        <Button onClick={handleResendOtp} className='bg-black hover:bg-black text-white' disabled={!resendEnabled}>Resend OTP </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
