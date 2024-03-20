import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null); 
    const { dispatch } = useAuthContext();

    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const res = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await res.json()

        if (!res.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (res.ok) {
            // save user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update auth context
            dispatch({ type: 'LOGIN', payload: json })
            setIsLoading(false)
        }
    }

    return { signup, isLoading, error };
} 