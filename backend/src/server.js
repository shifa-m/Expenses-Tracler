import express from "express"
import connectDB from "./config/db.js"


connectDB()
const app=express()


app.use(express.json())



const PORT=3000
app.listen(PORT,()=>{
            console.log(`Server is running on port ${PORT}`)
})


