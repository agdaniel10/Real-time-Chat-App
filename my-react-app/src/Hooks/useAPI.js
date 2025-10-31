import { useCallback, useState } from "react";
import axios from "axios";
import useLocalStorage from "./useLocalStorage";

const VITE_API_BACKEND = "http://localhost:3000"; // adjust if needed

const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [authData, _setAuthData, removeAuthData] = useLocalStorage("kela-app_auth", null);

  const post = useCallback(
    async (endpoint, data, config = {}) => {
      setIsLoading(true);
      setMessage("");
      setError("");

      try {
        const headers = {
          "Content-Type": "application/json",
          ...config.headers,
        };

        // Attach token if available
        if (authData?.token) {
          headers["Authorization"] = `Bearer ${authData.token}`;
        }

        const response = await axios.post(
          `${VITE_API_BACKEND}${endpoint}`,
          data,
          {
            headers,
            withCredentials: true,
            ...config,
          }
        );

        setMessage(response.data?.message || "Request successful");
        return response.data;

      } catch (err) {
        const errorMessage =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Request failed";

        setError(errorMessage);

        // If token expired or unauthorized, clear stored auth data
        if (err.response?.status === 401) {
          removeAuthData();
        }

        throw err;

      } finally {
        setIsLoading(false);
      }
    },
    [authData, removeAuthData]
  );

  const clearMessages = useCallback(() => {
    setMessage("");
    setError("");
  }, []);

  return { isLoading, message, error, post, clearMessages };
};

export default useApi;
