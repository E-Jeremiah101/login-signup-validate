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
    message: null,
    fetchingUser: true,

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


    //creating login

    login: async(email, password) => {
      set({isLoading: true, message: null, error: null});

      try {
        const response  = await axios.post(`${API_URL}/login`, {
          email,
          password
        });

        const {user, message} = response.data;

        set({user, message, isLoading:false});

        return {user, message}

      } catch (error) {
        set({error: error.response.data.message, isLoading: false});

        throw error;
      }
    },

    fetchUser: async () => {
      set({fetchingUser:true, error: null});

      try {
        const response = await axios.get(`${API_URL}/fetch-user`);

        set({
          user: response.data.user,
          fetchingUser: false
        })
      } catch (error) {
        set({
          error: null, fetchingUser: false, user: null 
        })
      }

    },
//logout function
    logout: async() => {
      set({
        isLoading: true, 
        error: null,
        message: null
      });

      try {
        const response = await axios.post(`${API_URL}/logout`);
        const {message} = response.data;
        set({message, isLoading: false, user: null, error: null})
        return {message}
      } catch (error) {
        set({ error: error.response.data.message, isLoading: false });
        throw error;
        
      }
    }
})) ;