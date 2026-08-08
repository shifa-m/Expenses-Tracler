import { generatePath } from "react-router-dom"
import User from "../users/users.model.js"


export const registerUser=async (req,res)=>{
            try{
                        const {name,email,password}=req.body

                        if(!name||!email||!password){
                                    return res.status(400).json({
                                                message:"All fields are required"
                                    })
                        }

            const existingUser=await User.findOne({email})

            if(existingUser){
                        return res.status(409).json({
                                    message:"User already exists"
                        })

            }

            const user=await User.create({name,email,password})

            const token=generateToken(user_.id)
            sendTokenCookies(res,token)

            res.status(201).json({
                        user:{id:user_.id,name:user.name,email:user.email}
            })

            }catch(error){
                        res.status(500).json({
                                    message:"Server Error",error:error.message
                        })

            }

}


export const loginUser=async(req,res)=>{

            try{

                        const {email,password}=req.body

                        if(!email||!password){
                                    return res.status(400).json({
                                                message:"All fields are required"
                                    })
                        }

                        const user=await User.findOne({email}).select("+password");

                        if(!user ||(await user.comparePassword("password"))){
                                    return res.status(401).json({
                                                message:"Invalid credentials"
                                    })
                        }

                        const token=generateToken(user_.id)
                        sendTokenCookies(res,token)

                        res.status(200).json({
                        user:{id:user_.id , name:user.name , email:user.email}
                        })


            }catch(error){

                        res.status(500).json({
                                    message:"Server Error",error:error.message
                        })

            }



}

export const logoutUser=async(req,res)=>{

            res.cookies("token",{

                        httpOnly:true,
                        expires:new Date(0)
            });

            res.status(200).json({
                        message:"Logged Out Successfully"
            })
}

export const getMe=async(req,res)=>{
            res.status(200).json({user:req.user})
}