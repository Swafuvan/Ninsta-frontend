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
    username: string,
    email: string,
    fullName: string,
    password: string,
    isAdmin: boolean,
    image: string,
    bio: string,
    DOB:string,
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
    to: string,
    from: string,
    message: string,
    seen:Boolean,
    createdAt: Date,
    time:Date,
    File:{
        fileType: string,
        link: string,
    }
}

export interface userReports{
    userId: string,
    reportedBy: string,
    reason: string,
    solve: Boolean,
}
