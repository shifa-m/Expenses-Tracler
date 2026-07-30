import { User } from "lucide-react";
import mongoose from "mongoose";

const expensesSchema=new mongoose.Schema(
            {
                        user:{
                                    type:mongoose.Schema.Types.ObjectId,
                                    required:true,
                                    ref:"User",
                                    index:true,

                        },
                        category:{
                                    type:mongoose.Schema.Types.ObjectId,
                                    ref:"Category",
                                    required:true,
                        },
                        amount:{
                                    type:Number,
                                    required:[true,"Enter the amount"],
                                    min:[0.01,"Amount must be greater then 0"]
                        },
                        description:{
                                    type:String,
                                    trim:true,
                                    default:""

                        },
                        date:{
                                    type:Date,
                                    required:true,
                                    default:Date.now,

                        }
            },
            {timestamps:true}
)

expensesSchema.index({user:1,date:-1})

const Expenses=mongoose.model("Expenses",expensesSchema)

export default Expenses