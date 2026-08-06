import {Link , useNavigate} from "react-router-dom"
import { useAuth } from "../context/AuthContext.jsx"

const Navbar=()=>{
            const {user,logout}=useAuth()
            const navigate=useNavigate()

            const handleLogout=async()=>{
                        await logout();
                        navigate("/login")
            }
}

export default Navbar