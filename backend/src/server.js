import express from "express"
import connectDB from "./config/db.js"
import dotenv from  "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"

import authRoutes from "./features/auth/auth.routes.js"
import categoryRoutes from "./features/categories/category.routes.js"
import dashboardRoutes from "./features/dashboard/dashboard.routes.js"
import expensesRoutes from "./features/expenses/expenses.routes.js"

dotenv.config()
connectDB()
const app=express()


app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/categories",categoryRoutes)
app.use("/api/expenses",expensesRoutes)
app.use("/api/dashboard",dashboardRoutes)

app.use((err,res,req,next)=>{
            console.log(err.stack)
            res.status(500).json({
                        message:"Something went wong"
            })
})


const PORT=3000
app.listen(PORT,()=>{
            console.log(`Server is running on port ${PORT}`)
})


