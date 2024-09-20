// userRoutes.js
import { User, forgotPassword } from "@/type/users";
import { LoginUser, SignupUser, googleUser } from "@/type/users";
import axiosInstance, { getUserToken } from "../axiosInterceptor";
import Cookies from 'js-cookie';
import toast from "react-hot-toast";

// const backendURL = 'http://localhost:5000';

export const userHome = async (user: any) => {
    try {
        const userDetail = await axiosInstance.get('/?email=' + user);
        // console.log(userDetail)
        return userDetail.data;
    } catch (error) {
        console.log(error);
    }
}

export const UserState = async () => {
    try {
        const userDetails = await axiosInstance.get('/userData')
        if (userDetails) {
            console.log(userDetails)
            if (userDetails.status === 217) {
                toast.error('Sorry You are Blocked some Reason')
                Cookies.remove('userToken')
                return { data: null }
            }
            return userDetails.data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const AllUserMessage = async (userId:string) => {
    try {
        const allMessage = await axiosInstance.get('allUserMessage?userId='+userId)
        if(allMessage){
            return allMessage.data
        }
    } catch (error) {
        console.log(error)
    }
}

export const BlockUsers = async (userId:string,BlockUserId:string) => {
    try {
        const userBlocking = await axiosInstance.put('/blockUser',{userId,BlockUserId})
        if (userBlocking) {
            return userBlocking.data
        }
    } catch (error) {
        console.log(error);
    }
}

export const SearchDetails = async () => {
    try {
        const searchRes = await axiosInstance.get('/search');
        if (searchRes) {
            return searchRes.data
        }
    } catch (error) {
        console.log(error);
    }
}

export const UserSearch = async (search: any,userId:string): Promise<any> => {
    try {
        const searchRes = await axiosInstance.get(`/userSearch?search=${search}&userId=${userId}`);
        if (searchRes) {
            return searchRes.data
        }
    } catch (error) {
        console.log(error)
    }
}

export const userChats = async (userIdTo: string, userIdFrom: string) => {
    try {
        const chatResult = await axiosInstance.get('/chat?userIdTo=' + userIdTo + '&userIdFrom=' + userIdFrom);
        if (chatResult) {
            return chatResult.data
        }
    } catch (error) {
        console.log(error);
    }
}

export const savedPosts = async (UserId:string) => {
    try {
        const savedData = await axiosInstance.get('/savedPosts?userId='+UserId);
        if (savedData) {
            return savedData.data
        }
    } catch (error) {
        console.log(error);
    }
}

export const AllUsersStory = async (userId:string) => {
    try {
        const Users = await axiosInstance.get('/stories?userId='+userId);
        if (Users) {
            return Users.data
        }
    } catch (error) {
        console.log(error);
    }
}

export const OwnStory = async (userId:string) => {
    try {
        const Story = await axiosInstance.get('/ownStory?userId='+userId);
        if (Story) {
            return Story.data
        }
    } catch (error) {
        console.log(error);
    }
}

export const UserNotification = async (userId:string) => {
    try {
        const notifiRes = await axiosInstance.get('/notification?userId='+userId);
        if (notifiRes) {
            return notifiRes.data
        } 
    } catch (error) {
        console.log(error);
    }
}

export const userReels = async () => {
    try {
        const Reels = await axiosInstance.get('/userReels');
        if(Reels){
            return Reels.data
        }
    } catch (error) {
        console.log(error);
    }
}

export const fetchLastMessages = async (userId:string) => {
    try {
        const messageData = await axiosInstance.get('/allMessage?userId='+userId);
        if (messageData) {
            return messageData.data
        }
    } catch (error) {
        console.log(error);
    }
}

export const messageNotification = async (notification:any) => {
    try {
        const userNotify = await axiosInstance.post('/messageNotifi',{notification});
        if (userNotify) {
            return userNotify.data
        }
    } catch (error) {
        console.log(error);
    }
}

export const UserProfileEdit = async (userDetails:any,image:any,userId:string) => {
    try {
        const formData = new FormData();
        formData.append('userDetails', JSON.stringify(userDetails));
        formData.append('userData', image); 
        formData.append('userId', userId);
        const ProfileEdited = await axiosInstance.post('/editProfile',formData,{
            headers:{
                "Content-Type": "multipart/form-data",
                "Authorization": getUserToken()
            }
        })
        if (ProfileEdited) {
            return ProfileEdited.data
        }
    } catch (error) {
        console.log(error);
    }
}

export const UserStoryAdding = async (userId:string,story:any,caption:string) => {
    try {
        // const storyData = {file:story,text:caption,userId:userId} 
        const AddedStory = await axiosInstance.post('/userStory',{StoryData:story,text:caption,userId:userId},{
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": getUserToken()
            }}
        );
        if (AddedStory) {
            return AddedStory
        }
    } catch (error) {
        console.log(error);
    }
}

export const StoryVideoUpload = async (story:string,userId:string,content:string) => {
    try {
        const addedVideoStory = await axiosInstance.post('/videoStory',{story,userId,content});
        if (addedVideoStory) {
            return addedVideoStory
        }
    } catch (error) {
        console.log(error);
    }
}

export const AllUserData = async (userId: any) => {
    try {
        const UsersData = await axiosInstance.get('/AllUsers?userId=' + userId);
        if (UsersData) {
            return UsersData.data
        }
    } catch (error) {
        console.log(error);
    }
}

export const createUserAccount = async (user: SignupUser): Promise<User | null> => {
    try {
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

export const MessageSeen = async () => {
    try {
        const MessageData = await axiosInstance.put('/messageSeen')
    } catch (error) {
        console.log(error);
    }
}

export const userLogin = async (user: LoginUser): Promise<any> => {
    try {
        const usersData = await axiosInstance.post('/login', user);
        if (usersData) {
            return usersData.data
        }
        return null;
    } catch (err) {
        console.log(err);
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
        const OTP = await axiosInstance.get('/resendOtp?email='+email);
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

export const FollowUsers = async (user:string,follower:any) => {
    try {
        const FollowedData = await axiosInstance.post('/follow',{user,follower});
        if(FollowedData){
            return FollowedData.data
        }
    } catch (error) {
        console.log(error);
    }
}

export const UserReports = async (reason:string,userId:string,reportedId:string) => {
    try {
        const reportRes = await axiosInstance.post('/reportUser',{reason,userId,reportedId});
        if(reportRes){
            return reportRes
        }
    } catch (error) {
        console.log(error);
    }
}

export const FriendSuggession = async (userId:string) => {
    try {
        const suggession = await axiosInstance.get('/suggession?userId='+userId);
        if(suggession){
            return suggession.data
        }
    } catch (error) {
        console.log(error);
    }
}

export const UserfindById = async (userid: any) => {
    try {
        console.log(userid)
        const allUserData = await axiosInstance.get('/user?id=' + userid);
        if (allUserData) {
            console.log(allUserData.data)
            return allUserData.data;
        }
    } catch (error) {
        console.log(error); 
    }
}

export const ForgotPassword = async (Userdata: forgotPassword) => {
    try {
        const Changed = await axiosInstance.post('/forgotPassword', Userdata);
        if (Changed) {
            return Changed
        }
        return null
    } catch (error) {
        console.log(error);
    }
}

