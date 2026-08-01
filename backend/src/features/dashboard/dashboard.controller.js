import mongoose from "mongoose"
import Expense from "../expenses/expenses.model.js"


export const getSummary=async(req,res)=>{

            try{

                        const userId=new mongoose.Types.ObjectId(req.user_.id)

                        const totalResult=await Expense.aggregate([
                                    {$match:{user:userId}},
                                    {$group:{_id:null,total:{$sum:"$amount"}}}
                        ])

                        const total=totalResult[0]?.total||0

                        const byCategory=await Expense.aggregate([

                                    {$match:{userId}},
                                    {$group:{_id:"$category",total:{$sum:"$amount"}}},
                                    {
                                                $lookup:{
                                                            from :"$category",
                                                            localField:"_id",
                                                            foreignField:"_id",
                                                            as:"categoryInfo"
                                                }
                                    },
                                    {$unwind:"$categoryInfo"},
                                    {
                                                $project:{
                                                            _id:0,
                                                            category:"$categoryInfo.name",
                                                            total:1
                                                }
                                    },
                                    {$sort:{total:-1}}
                        ])

                        const byMonth=await Expense.aggregate([
                                    {$match:{user:userId}},
                                    {$group:{
                                                _id:{year:{$year:"$date"},month:{$month:"$date"}},
                                                total:{$sum:"$amount"}

                                    
                                    }},
                                    {
                                                $sort:{"_id.year":1,"_id.month":1}
                                    }
                        ])

                        res.status(200).json({total,byCategory,byMonth})


            }catch(error){

                        res.status(500).json({message:"Server Error",error:error.mesaage})


            }
}

