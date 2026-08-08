import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const connectDB=async()=>{

            try{
                        await mongoose.connect(process.env.MONGO_DB);

            console.log("Database has been connected successfully")
            }catch(error){

                        console.log("Database error",error)
            }
            
}

export default connectDB