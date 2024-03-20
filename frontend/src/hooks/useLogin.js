import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext(); 
    
    const login = async (email, password) => {
        setIsLoading(true);
        setError(null)

        const res = await fetch('/api/user/login', {
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
            localStorage.setItem('user', JSON.stringify(json))

            dispatch({ type: 'LOGIN', payload: json })
            setIsLoading(false)
        }
    }

    return { login };
}