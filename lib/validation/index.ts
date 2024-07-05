import * as Yup from 'yup';
import { z } from 'zod';

// Define the Zod schema
export const forgotPasswordSchema = z.object({
    email: z.string()
    .email({ message: 'Invalid email address' }),
    password: z.string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(15,{message: "Password less than 15 characters long"}),
    confirmPassword: z.string()
    .min(6, { message: 'Confirm password must be at least 6 characters long' })
    .max(15,{message: "Password less than 15 characters long"})
}).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

// Formik Schema
export const SignupValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .max(12,'Username should not exceed 12 characters')
        .required('Username is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .max(14,"password should not exceed 14 character")
        .required('Password is required')
});

export const LoginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .max(14,"password should not exceed 14 characters")
        .required('Password is required'),
});