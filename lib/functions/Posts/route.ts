import axiosInstance, { getUserToken } from "../axiosInterceptor"

export const postUpload = async (file: File[], text: string) => {
    try {
        const data = { image: file, text }
        const UploadedData = await axiosInstance.post('/Posts', data, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": getUserToken()
            }
        })
        if (UploadedData) {
            console.log(UploadedData)
            return UploadedData
        }
    } catch (error) {
        console.log(error);
    }

}

export const likePost = async (user: any) => {
    try {
        const response = await axiosInstance.post('/likePost', user)
        if (response) {
            return response.data
        }
    } catch (error) {
        console.log(error)
    }
}

export const SavePosts = async (postData:any,userId:string) => {
    try {
        const SavedData = await axiosInstance.post('/savePosts',{postDetails:postData,userData:userId})
        if (SavedData) {
            console.log(SavedData)
            return SavedData
        } 
    } catch (error) {
        
    }
}

export const CommentPost = async (PostDetails: any, comment: any, userId: any) => {
    try {
        const postData = await axiosInstance.post('/comment', { PostDetails, comment, userId })
        if (postData) {
            console.log(postData)
            return postData
        }
    } catch (error) {
        console.log(error)
    }
}



export const getPosts = async () => {
    try {
        const PostDetails = await axiosInstance.get('/allPosts')
        if (PostDetails) { return PostDetails.data }
        return { allPost: [] }
    } catch (error) {
        console.log(error)
    }
}

export const UserPosts = async (userId: any) => {
    try {
        const AllPostdetails = await axiosInstance.get('/userAllPost?userId=' + userId)
        console.log(AllPostdetails.data)
        if (AllPostdetails) {
            return AllPostdetails.data
        }
    } catch (error) {
        console.log(error);
    }
}

export const comments = async (postId: any) => {
    try {
        console.log(postId)
        const commentData = await axiosInstance.get('/allComment?postId=' + postId)
        if (commentData) {
            console.log(commentData)
            return commentData.data
        }
    } catch (error) {
        console.log(error)
    }
}

export const AllPostReports = async () => {
    try {
        const response = await axiosInstance.get('/AllPostReports')
        if (response) {
            return response
        }
    } catch (error) {
        console.log(error)
    }
}

export const PostReports = async (report: string, postData: any) => {
    try {
        console.log(report, postData)
        const reportData = await axiosInstance.post('/postReports', { report, postData })
        if (reportData) {
            return reportData
        }
    } catch (error) {
        console.log(error)
    }
}