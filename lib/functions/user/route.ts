// userRoutes.js
import { User, forgotPassword } from "@/type/users";
import { LoginUser, SignupUser, googleUser } from "@/type/users";
import axiosInstance from "../axiosInterceptor";
import Cookies from 'js-cookie'

const backendURL = 'http://localhost:5000';

export const userHome = async (user:any) => {
    try {
        const userDetail = await axiosInstance.get('/?email='+user);
        // console.log(userDetail)
        return userDetail.data;
    } catch (error) {
        console.log(error);
    }
}



export const createUserAccount = async (user: SignupUser): Promise<User | null> => {
    try {
        console.log(backendURL+'/signup', user);
        const response = await axiosInstance.post('/signup', user);
        if (response.data) {
            return response.data;
        }
        return null;
    } catch (err) {
        console.log(err);
        return null;
    }
};

export const userLogin = async (user: LoginUser): Promise<any> => {
    try {
        const usersData = await axiosInstance.post('/login', user);
        return usersData;
    } catch (err) {
        console.log(err);
    }
}

export const logout = async () => {
    try {
        Cookies.remove('userToken');
        setImmediate(()=>window.location.href='/login')
    } catch (error) {
        console.log(error);
    }
}

export const verifyOtp = async (email: string, otp: number) => {
    try {
        const OTP = await axiosInstance.post('/verifyOtp', { email, otp });
        return OTP.data;
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return null;
    }
}

export const ResendOtp = async (email: string) => {
    try {
        const OTP = await axiosInstance.get('/resendOtp', { params: { email } });
        return OTP.data;
    } catch (error) {
        console.error('Error resending OTP:', error);
        return { success: false, error: error };
    }
}

export const googleSignup = async (UserSession: googleUser) => {
    try {
        const UserResult = await axiosInstance.post('/googleSignup', UserSession, {
            withCredentials: true
        });
        console.log(UserResult);
        return UserResult.data;
    } catch (error) {
        console.error('Error', error);
        return { success: false, error: error };
    }
}

export const ForgotPassword = async (Userdata:forgotPassword) =>{
    try {
        const Changed = await axiosInstance.post('/forgotPassword',Userdata);
        if(Changed){
            return Changed
        }
        return null
    } catch (error) {
        console.log(error);
    }
}

