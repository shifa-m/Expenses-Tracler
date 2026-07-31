import Expense from "./expenses.model.js"

export const createExpense=async(req,res)=>{


            try{
                        const {amount,description,category,date}=req.body

                        if(!amount || !category){
                                    return res.status(401).json({
                                                message:"All fields are required"
                                    })
                        }

                        const expense=await Expense.create({
                                    user:req.user_.id,
                                    amount,
                                    description,
                                    category,
                                    date
                        })

                        res.status(201).json({expense})


            }catch(error){

                        res.status(500).json({
                                    message:"Server Error",error:error.message
                        })


            }

}


export const getExpense=async(req,res)=>{

            try{

                        const page=parseInt(req.query.page)||1
                        const limit=parseInt(req.query.limit)||20
                        const skip=(page-1)*limit

                        const filter={user:req.user_.id}

                        if(req.query.category){
                                    filter.category=req.query.category
                        }

                        if(req.query.from || req.query.to){

                                    filter.date={};

                                    if(req.query.from)filter.date.$gte=new Date(req.query.from)
                                                if(req.query.to)filter.date.$lte=new Date(req.query.to)


                        }

                        const [expenses,total]=Promise.all([
                                    Expense.find(filter)
                                    .populate("category","name")
                                    .sort({date:- 1})
                                    .skip(skip)
                                    .limit(limit),
                                    Expense.countDocument(filter)

                        ])

                        res.status(200).json({
                                    expenses,
                                    pagination:{
                                                page,
                                                limit,
                                                total,
                                                totalPages:Math.ceil(total/limit)
                                    }
                        })



            }catch(error){

                        res.status(500).json({
                                    message:"Server Error",error:error.message
                        })
            }
}


export const updateExpenses=async(req,res)=>{



            try{

                        const expense=await Expense.findOneAndUpdate(
                                    {id:req.params.id,user:req.user_.id},
                                    req.body,
                                    {
                                                new:true,runValidators:true
                                    }
                        )

                        if(!expense){
                                    return res.status(404).json({
                                                message:"Expenses not found"
                                    })
                        }

                        res.status(200).json({expense})


            }catch(error){
                        res.status(500).json({
                                    message:"Server Error",error:error.message
                        })
            }
}

export const deleteExpense=async(req,res)=>{

            try{

                        const expense=Expense.findOneAndDelete(
                                    {_id:req.params.id,user:req.user_.id},
                                    
                        );

                        if(!expense){
                                    return res.status(404).json({
                                                message:"Expense not Found"
                                    })
                        }

                        res.status(200).json({message:"Expense Deleted Successfully"})


            }catch(error){
                        res.status(500).json({
                                    message:"Server Error",error:error.message
                        })
            }
}