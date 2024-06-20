import { User } from "@/type/users";
import { LoginUser, SignupUser,googleUser } from "@/type/users";
import axios from "axios";

const backendURL = 'http://localhost:5000';

export const userHome = async () => {
    try {
        const userDetail = await axios.get(`${backendURL}/`)
    } catch (error) {
        console.log(error)
    }
}

export const createUserAccount = async (user: SignupUser): Promise<User | null> => {
  try {
    console.log(backendURL+'/signup',user);
    
    const response = await axios.post<any>(`${backendURL}/signup`, user);
    if (response.data) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const userLogin = async (user : LoginUser): Promise<any> => {
    try {
        
        const usersdata = await axios.post<any>(`${backendURL}/login`, user);
        console.log(usersdata);
        return usersdata
    } catch (err) {
        console.log(err);
    }
}

export const logout = async () => {
    try {
        await axios.get(backendURL + '/logout', { withCredentials: true })
    } catch (error) {
        console.log(error);
    }
}

export const verifyOtp = async (email:string,otp:number) =>{
    try {
        const OTP = await axios.post(backendURL + '/verifyOtp', {email ,otp})
        return OTP
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return { success: false, error: error }
    }
}

export const ResendOtp = async (email:string) =>{
    try {
        const OTP = await axios.get(backendURL + '/resendOtp?email=' + email)
        return OTP
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return { success: false, error: error }
    }
}

export const googleSignup = async (UserSession:googleUser) => {
    try {
        const UserResult = await axios.post(backendURL + '/googleSignup'+UserSession)
        return UserResult
    } catch (error) {
        console.error('Error', error);
        return { success: false, error: error }
    }
}