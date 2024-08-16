export interface SignupUser {
    username: string;
    email: string;
    password: string;

}

export interface LoginUser {
    email: string;
    password: string;
}

export interface User {
    _id?: string;
    username: String,
    email: String,
    fullName: String,
    password: String,
    isAdmin: boolean,
    image: String,
    bio: String,
    isBlocked: boolean,
    Gender: string,
    blockedUsers:string[],
    following:string[],
    followers:string[]
}



export interface googleUser {
    email: string,
    password: string,
    username: string,
    fullName: string,
    image: string
}

export interface forgotPassword {
    email: string,
    password: string,
    confirmPassword: string

}

export interface messages{
    _id?: string,
    to: String,
    from: String,
    message: String,
    seen:Boolean,
    createdAt: Date,
    time:Date,
    File:{
        fileType: String,
        link: String,
    }
}

export interface userReports{
    userId: String,
    reportedBy: String,
    reason: String,
    solve: Boolean,
}
