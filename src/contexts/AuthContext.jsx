/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { axiosClient } from "../api/axios";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const[loading,setLoading]=useState(true)
  
 

  // Fetch the authenticated user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axiosClient.get("/api/user");
        console.log("Fetched user:", data);
        setUser(data);
      } catch (err) {
        console.log("Fetch user error:", err.response?.data || err.message);
        setUser(null);
      } finally {
        setLoading(false)

        
      }
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      // Fetch CSRF token
      // await axiosClient.get("/sanctum/csrf-cookie");
      // console.log("CSRF token fetched for login");

      // login
      await axiosClient.post("/login", { email, password });
      console.log("Login successful");

      // Fetch user data
      const { data } = await axiosClient.get("/api/user");
      console.log("User after login:", data);
      setUser(data);
      
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await axiosClient.post("/logout");
      console.log("Logout successful");
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err.response?.data || err.message);
      throw err;
    }
  };

  


  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);