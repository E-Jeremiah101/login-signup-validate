import {create} from "zustand";
import axios from "axios"

const API_URL = "http://localhost:5000/api";
axios.defaults.withCredentials = true;
export const useAuthStore =  create((set) =>({
    //initial state
    user: null,
    isLoading : false,
    error: null,
    success: null,

    signup: async (fullName, userName, email, password) => {
      set({isLoading: true, error: null, success: null})
      
      try {
        const response = await axios.post(`${API_URL}/signup`, {
            fullName,
            userName,
            email,
            password
        });

        console.log("signup success:", response.data)

        set({
            user:response.data.user, isLoading: false,
            success: "Registration successful!"
        })
        
      } catch (error) {
        console.error("signup error:", error.response?.data);

        set({isLoading: false, error: error.response.data.message || "Error signing up!",});

        throw error;
      }
    },
})) ;