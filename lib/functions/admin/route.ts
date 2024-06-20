import { LoginUser } from "@/type/users";
import axios from "axios";

const adminUrl = 'http://localhost:5000/admin';

export const AdminLogin = async (user : LoginUser): Promise<any> => {
    try {
        const Admindata = await axios.post<any>(`${adminUrl}/login`, user);
        console.log(Admindata);
        return Admindata
    } catch (err) {
        console.log(err);
    }
}

export const getUsers = async () =>{
    try {
        const userMangement = await axios.get<any>(`${adminUrl}/userManagement`)
    } catch (error) {
        console.log(error);
        
    }
}

