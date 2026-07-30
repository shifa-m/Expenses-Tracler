import mongoose from "mongoose";

const categorySchema=new mongoose.Schema({
            name:{
                        type:String,
                        required:[true,"Category name is required"],
                        trim:true,
            },
            user:{
                        type:mongoose.Schema.Types.ObjectId,
                        ref:"User",
                        required:[true,"User name is required"]
            }
},
{timestamps:true}
)

expensesSchema.index({name:1,user:1},{unique:true})

const Category=mongoose.model("Category",categorySchema)

export default Category