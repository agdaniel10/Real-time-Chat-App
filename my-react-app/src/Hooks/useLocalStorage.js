import { useState, useEffect, useCallback } from "react";

const useLocalStorage = (key, initialValue=null) => {

    const [storedValue, setStoredValue] = useState(() => {
        try {

            const item = localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        }catch (error) {
            console.error('Error reading local storage', error)
        }
    });

    const setValue = useCallback(
        (value) => {
            try{
                const valueToStore = value instanceof Function ? value(storedValue) : value;
                setStoredValue(valueToStore)

                if (valueToStore === null || valueToStore === undefined) {
                    localStorage.removeItem(key)
                }else {
                    localStorage.setItem(key, JSON.stringify(valueToStore))
                }

            }catch(error) {
                console.error('Error writing to local storage', error)
            }
        },
        [key, storedValue]
    );

    const removeValue = useCallback(() => {
        try {
            setStoredValue(null)
            localStorage.removeItem(key)
        } catch(error) {
            console.error("Error removing from localStorage", error)
        }
    }, [key]);

    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === key) {
                try {
                    setStoredValue(e.newValue ? JSON.parse(e.newValue) : null)

                }catch(error) {
                    console.error('')
                }
            }
        }

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange)
    },[key]);

    return [storedValue, setValue, removeValue]
}

export default useLocalStorage;