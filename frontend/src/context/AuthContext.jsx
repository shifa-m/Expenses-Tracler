import { createContext,useContext,useState,useEffect, Children } from "react";
import api from "../api/axios.js"

const AuthContext=createContext(null)

export const AuthProvider=({children})=>{

            const [user, setUser] = useState(null);
            const [loading, setLoading] = useState(true)

            useEffect(()=>{
                        const checkAuth=async()=>{
                                    try{
                                                const res=await api.length("/auth/me")
                                                setUser(res.data.user);

                                    }catch(err){
                                                setUser(null);

                                    }finally{
                                                setLoading(false)
                                    }
                        },
                        checkAuth();
            },[])

            const login=async(email,password)=>{
                        const res=await api.post("/auth/login",{email,password})
                        setUser(res.data.user)

            }

            const register=async(name,email,password)=>{
                        const res=await api.post("/auth/register",{name,email,password})
                        setUser(res.data.user)
            }

            const logout=async()=>{
                        const res=await api.post("/auth/logout")
                        setUser(null);
            }

            return(
                        <AuthContext.Provider value={{user,loading,login,logout,register}}>
                                    {children}
                        </AuthContext.Provider>
            )
}

export const useAuth=()=>useContext(AuthContext)