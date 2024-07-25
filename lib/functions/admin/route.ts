import { LoginUser, User } from "@/type/users";
import axiosInstance from "./adminAxiosInterceptor";

const adminUrl = 'http://localhost:5000/admin';

export const AdminLogin = async (user : LoginUser): Promise<any> => {
    try {
        const Admindata = await axiosInstance.post(`/login`, user);
        return Admindata
    } catch (err) {
        console.log(err);
    }
}

export const getUsers = async () =>{
    try {
        const userMangement = await axiosInstance.get(`/userManagement`)
        if(userMangement){
            return userMangement
        }
        return null
    } catch (error) {
        console.log(error);
        
    }
}

export const UserFindbyId = async (userId:string) => {
    try {
        const UserDetail = await axiosInstance.get('/userfindById?userId='+userId)
        if(UserDetail){
            return UserDetail.data
        }
    } catch (error) {
        console.log(error)
    }
}

export const SingleUserDetails = async (userData:any) =>{
    try {
        // console.log(userData)
        const UserDetails = await axiosInstance.post('/UserData',userData)
        if(UserDetails){
            return UserDetails
        }
        return null
    } catch (error) {
        console.log(error)
    }
}

export const adminDetails = async () =>{
    try {
        const Admin = await axiosInstance.get('/adminData')
        console.log(Admin)
        if(Admin){
            return Admin.data
        }
    } catch (error) {
        console.log(error)
        
    }
}

export const UserPostReport = async () => {
    try {
        const userReports = await axiosInstance.get('/userReports')
        if(userReports){
            return userReports.data
        }
    } catch (error) {
        console.log(error)
    }
}

export const ReportPosts = async (postData:any) => {
    try {
        const PostReportData = await axiosInstance.post('/postReport',postData)
        if(PostReportData){
            return PostReportData
        }
    } catch (error) {
        console.log(error)
    }
} 

export const UserBlocked = async (email:any,isBlock:any) => {
    try {
        
        const UserBlock = await axiosInstance.get('/UserBlock?User=',{params:{email,isBlock}})
        if(UserBlock){
            return UserBlock 
        }
        return null
    } catch (error) {
        console.log(error);
    }
}


