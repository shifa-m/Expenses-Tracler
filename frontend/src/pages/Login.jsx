import { useState } from "react";
import {Link,useNavigate} from "react-router-dom"
import {useAuth} from "../context/AuthContext.jsx"

const Login=()=>{
            const [email, setEmail] = useState("")
            const [password, setPassword] = useState("")
            const [error, setError] = useState("")
            const {login}=useAuth()
            const navigate=useNavigate();


            const handleSubmit=async(e)=>{
                        e.preventDefault();
                        setError("")
                        try{
                                    await login(email,password)
                                    navigate("/")

                        }catch(error){
                                    setError(error.response?.data?.message||"Login failed")

                        }
            }


return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl mb-1 text-ink">Welcome back</h1>
        <p className="text-ink/60 text-sm mb-8">Log in to see where your money went.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-ink/70">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 border border-mist rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-moss/40"
            />
          </div>
          <div>
            <label className="text-sm text-ink/70">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 border border-mist rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-moss/40"
            />
          </div>

          {error && <p className="text-clay text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-moss text-white py-2 rounded-md hover:bg-moss/90 transition-colors"
          >
            Log in
          </button>
        </form>

        <p className="text-sm text-ink/60 mt-6">
          No account yet?{" "}
          <Link to="/register" className="text-moss underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
