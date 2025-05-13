import { User } from "@supabase/supabase-js";
import { createContext, useState } from "react";

interface AuthContext{
    user: User | null;
    signInWithGitHub:() => void;
    singOut: () => void;
}
const AuthContext = createContext<AuthContext | undefined>(undefined)

export const AuthProvider = ({children}:{children:React.ReactNode }) =>{
    const [user, setUser] = useState<User | null>()
    const signInWithGitHub = () => {

    }
    const singOut = () =>{

    }

    return<AuthContext.Provider value={{}}> {children} </AuthContext.Provider>

};