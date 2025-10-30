import { useCallback, useState } from "react";
import axios from "axios";
import useLocalStorage from "./useLocalStorage";

const VITE_API_BACKEND =
    import.meta.env.VITE_API_URL ||
    process.env.REACT_APP_API_URL ||
    "http://localhost:3000";

const useApi = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [authData, _setAuthData, removeAuthData] = useLocalStorage('kela-app_auth', null)

    const post = useCallback(
        async (endpoint, data, config={}) => {
            setIsLoading(true)
            setMessage('')
            setError('')

            try{

                const headers = {
                    'Content-Type':'application/json',
                    ...config.headers
                };

                if (authData?.token) {
                    headers['Authorization'] = `Bearer ${authData.token}`
                }

                const response = await axios.post(`${VITE_API_BACKEND}${endpoint}`, data, {
                    headers, 
                    withCredentials: true,
                    ...config
                })

                setMessage(response.data?.message || 'Request successful')
                return response?.data

            }catch(error) {
                const errorMessage = 
                    error.response?.data?.message || 
                    error.response?.data?.error ||
                    'Request failed'
                setMessage(errorMessage)

                if (error.response?.status === 401) {
                    removeAuthData()
                }

                throw error
            }finally {
                setIsLoading(false)
            }
        },
        [authData, removeAuthData]
    );

    const clearMessage = useCallback(() => {
        setMessage('')
        setError('')
    }, [])

    return { isLoading, message, error, post, clearMessage }
}

export default useApi;

