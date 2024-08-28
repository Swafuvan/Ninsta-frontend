import axiosInstance, { getUserToken } from "../axiosInterceptor"

export const postUpload = async (file: any, text: string) => {
    try {
        const data = { PostFiles: file, text }
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

export const VideoUpload = async (data:string,text:string) => {
    try {
        const UploadedRes = await axiosInstance.post('/uploadVideos',{data,text});
        if (UploadedRes) {
            return UploadedRes
        }
    } catch (error) {
        console.log(error);
    }
}

export const ExplorePosts = async () => {
    try {
        const AllPosts = await axiosInstance.get('/explore');
        if (AllPosts) {
            return AllPosts.data
        }
    } catch (error) {
        console.log(error);
    }
}

export const likePost = async (post: any, userId:string) => {
    try {
        const response = await axiosInstance.post('/likePost', { post, userId })
        if (response) {
            return response.data
        }
    } catch (error) {
        console.log(error)
    }
}

export const CommentLike = async (comment:any,userId:string) =>{
    try {
        const CommentLikeResponse = await axiosInstance.post('/commentLike',{comment,userId});
        if (CommentLikeResponse) {
            return CommentLikeResponse.data
        }
    } catch (error) {
        console.log(error)
    }
}

export const SavePosts = async (postData: any, userId: string) => {
    try {
        const SavedData = await axiosInstance.post('/savePosts', { postDetails: postData, User: userId })
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

export const CommentReplies = async (data:any,userId:string,reply:string) =>{
    try {
        const CommentResponse = await axiosInstance.post('/commentReply',{data,userId,reply});
        if (CommentResponse) {
            return CommentResponse.data
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