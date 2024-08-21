import * as Yup from 'yup';
import { z } from 'zod';

// Define the Zod schema
export const forgotPasswordSchema = z.object({
    email: z.string()
        .email({ message: 'Invalid email address' }),
    password: z.string()
        .min(6, { message: 'Password must be at least 6 characters long' })
        .max(15, { message: "Password less than 15 characters long" }),
    confirmPassword: z.string()
        .min(6, { message: 'Confirm password must be at least 6 characters long' })
        .max(15, { message: "Password less than 15 characters long" })
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
        .max(12, 'Username should not exceed 12 characters')
        .required('Username is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .max(14, "password should not exceed 14 character")
        .required('Password is required')
});

export const LoginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .max(14, "password should not exceed 14 characters")
        .required('Password is required'),
});

export const UserProfileValidation = Yup.object().shape({
    username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .max(15, 'Username should not exceed 15 characters')
        .matches(/^(?=.*[0-9]{3,6})[a-zA-Z0-9]*$/, 'Username must include at least 3 numbers and not exceed 6 numbers')
        .required('Username is required'),
    fullName: Yup.string()
        .min(3, 'Full name must be at least 3 characters')
        .max(20, 'Full name should not exceed 20 characters')
        .required('Full name is required'),
    bio: Yup.string()
        .min(5, 'Bio must be at least 5 characters')
        .max(100, 'Bio should not exceed 100 characters')
        .required('Bio is required'),
    Gender: Yup.string()
        .oneOf(['male', 'female', 'other'], 'Invalid gender')
        .required('Gender is required'),
    DOB: Yup.string()
        .matches(/^\d{4}-\d{2}-\d{2}$/, 'Invalid Date of Birth')
        .required('Date of Birth is required'),

})