import {createContext, ReactNode, useEffect, useMemo, useState} from "react"
import {useRouter} from "next/router";
import {onAuthStateChanged, User} from "firebase/auth";


import useAuth from "@/hooks/useAuth";
import {auth} from "@/firebase";


interface AuthContextState {
    user: User | null;
    error: string;
    isLoading: boolean;
    signUp: (email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextState>({
    user: null,
    error: '',
    isLoading: false,
    signUp: async () => {},
    signIn: async () => {},
    logout: async () => {},
})



const AuthContextProvider = ({children}: {children: ReactNode}) => {
    const [initialLoader, setInitialLoader] = useState<boolean>(true)

    const {user, error, isLoading, setUser, setError, setIsLoading, signUp, signIn, logout} = useAuth()

    const value =
        useMemo(() => ({
        user, error, isLoading, setUser, setError, setIsLoading, signUp, signIn, logout

    // eslint-disable-next-line
    }), [user, isLoading, error])


    useEffect(
        () =>
            onAuthStateChanged(auth, user => {
                if (user) {
                    setUser(user)
                }else {
                    setUser(null)
                }

                setIsLoading(false)
                setInitialLoader(false)

    // eslint-disable-next-line
    }), [])

    return <AuthContext.Provider value={value}>{!initialLoader ? children : null}</AuthContext.Provider>
}

export default AuthContextProvider

