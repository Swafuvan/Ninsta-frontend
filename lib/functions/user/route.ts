// userRoutes.js
import {  User, forgotPassword } from "@/type/users";
import { LoginUser, SignupUser, googleUser } from "@/type/users";
import axiosInstance from "../axiosInterceptor";
import Cookies from 'js-cookie';

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

export const UserState = async () =>{
    try {
        const userDetails = await axiosInstance.get('/userData')
        if(userDetails){
            console.log(userDetails)
            if(userDetails.status === 217) {
                Cookies.remove('userToken')
                return {data:null}
            }
            return userDetails.data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const SearchDetails = async () => {
    try {
        const searchRes = await axiosInstance.get('/search');
        if(searchRes){
            return searchRes.data
        }
    } catch (error) {
        console.log(error);
    }
}

export const UserSearch = async (search:any): Promise<any> => {
    try {
        const searchRes = await axiosInstance.get('/userSearch?search='+search);
        if(searchRes){
            return searchRes.data
        }
    } catch (error) {
        console.log(error)
    }
}

export const AllUserData = async (userId:any) => {
    try {
        const UsersData = await axiosInstance.get('/AllUsers?userId='+userId);
        if(UsersData){
            return UsersData.data
        }
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
        console.log(usersData);
        if(usersData){
            return usersData
        }
        return null;
    } catch (err) {
        console.log(err);
    }
}

export const logout = () => {
    try {
        Cookies.remove('userToken');
    } catch (error) {
        console.log(error);
    }
}

export const verifyOtp = async (email: string, otp: number) => {
    try {
        const OTP = await axiosInstance.post('/verifyOtp', { email, otp });
        return OTP;
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

export const UserfindById = async (userid:any) => {
    try {
        console.log(userid)
        const allUserData = await axiosInstance.get('/user?id='+userid);
        if(allUserData){
            return allUserData.data;
        }
    } catch (error) {
        console.log(error)
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

