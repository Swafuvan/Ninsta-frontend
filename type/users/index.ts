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
