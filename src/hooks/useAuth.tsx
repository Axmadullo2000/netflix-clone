import React, {useState} from 'react'
import {useRouter} from "next/router";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    User
} from 'firebase/auth'

import {auth} from 'src/firebase'

import Cookies from "js-cookie";


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

                fetch('/api/customers', {
                    method: "POST",
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify({email: res.user.email, token: res.user.uid})
                })

                Cookies.set("token", res.user.uid)
                router.push('/')
                setIsLoading(true)
            })
            .catch(error => setError(error.message))
            .finally(() => setIsLoading(false))
    }

    const signIn = async (email: string, password: string) => {
        setIsLoading(true)

        await signInWithEmailAndPassword(auth, email, password)
            .then(res => {
                setUser(res.user)
                Cookies.set("token", res.user.uid)
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
                setUser(null)
                Cookies.remove("token")
                router.push('/auth')
                setIsLoading(true)
            })
            .catch(error => setError(error.message))
            .finally(() => setIsLoading(false))
    }


    return {error, isLoading, user, signUp, signIn, logout, setIsLoading, setUser
    , setError}
}

export default UseAuth


