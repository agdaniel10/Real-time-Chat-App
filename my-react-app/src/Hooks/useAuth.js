import useApi from "./useAPI";
import useLocalStorage from "./useLocalStorage";
import { useNavigate } from "react-router-dom";

const AuthService = () => {
  const { isLoading, message, error, post, clearMessages } = useApi();
  const [authData, setAuthData, removeAuthData] = useLocalStorage("kela-app_auth", null);
  const navigate = useNavigate();

  // Register User
  const handleRegister = async (formData) => {
    try {
      await post("/api/auth/register", {
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
      });

      navigate("/");
    } catch (err) {
      console.error("Registration failed:", err.message);
    }
  };

  // Login User
  const handleLogin = async (formData) => {
    try {
      const result = await post("/api/auth/login", {
        userName: formData.userName,
        password: formData.password,
      });

      console.log("Login result:", result);

      const { data } = result;
      const { token, user } = data;

      if (token && user) {
        setAuthData({ token, user });
        console.log("Token saved successfully");
        navigate("/chatpage");
      } else {
        console.error("Invalid response structure:", result);
      }
    } catch (err) {
      console.error("Login failed:", err.message);
    }
  };

    const handleLogout = () => {
        removeAuthData();
        clearMessages();
        navigate("/login");
  };

  return {
    isLoading,
    message,
    error,
    authData,
    handleRegister,
    handleLogin,
    handleLogout,
    clearMessages,
    removeAuthData,
  };
};

export default AuthService;
