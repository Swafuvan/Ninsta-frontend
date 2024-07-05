import NextAuth,{Session} from "next-auth"
import { JWT } from 'next-auth/jwt';

type User = {
    id: string;
    name: string;
    email: string;
    access_token?: string; 
};

export const authOptions = {
    
    callbacks: {
        async jwt(jwtSession: JWT, user: User | null | false) {
            
            if (user) {
                JWT.accessToken = user.access_token!

            }
            return jwtSession
        },
        async session(session: Session, jwtSession: JWT) {
            session.accessToken = jwtSession.accessToken
            return session
        }
    }
}

export default NextAuth(authOptions)