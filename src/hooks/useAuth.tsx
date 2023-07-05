import React, {useState} from 'react'
import {useRouter} from "next/router";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    User
} from 'firebase/auth'

import {auth} from 'src/firebase'


function UseAuth() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [user, setUser] = useState<User | null>(null)

    const router = useRouter()

    const signUp = async (email: string, password: string) => {
        setIsLoading(true)

        await createUserWithEmailAndPassword(auth, email, password)
            .then(res => {
                setUser(res.user)
                router.push('/')
                setIsLoading(true)
            }).catch(error => setError(error.message))
            .finally(() => setIsLoading(false))
    }

    const signIn = async (email: string, password: string) => {
        setIsLoading(true)

        await signInWithEmailAndPassword(auth, email, password)
            .then(res => {
                setUser(res.user)
                router.push('/')
                setIsLoading(true)
            })
            .catch(error => setError(error.message))
            .finally(() => setIsLoading(false))
    }

    const logout = async () => {
        setIsLoading(true)

        signOut(auth)
            .then(() => {
                router.push('/auth')
                setUser(null)
                setIsLoading(true)
            })
            .catch(error => setError(error.message))
            .finally(() => setIsLoading(false))
    }


    return {error, isLoading, user, signUp, signIn, logout, setIsLoading, setUser
    , setError}
}

export default UseAuth
