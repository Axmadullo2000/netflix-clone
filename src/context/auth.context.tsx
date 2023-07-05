import {createContext, ReactNode, useMemo} from "react"

import {User} from "firebase/auth";

import useAuth from "@/hooks/useAuth";

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
    const {user, error, isLoading, setUser, setError, setIsLoading, signUp, signIn, logout} = useAuth()
    const value =
        useMemo(() => ({
        user, error, isLoading, setUser, setError, setIsLoading, signUp, signIn, logout

    // eslint-disable-next-line
    }), [user, isLoading, error])

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider

