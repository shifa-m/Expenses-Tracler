import Category from "../categories/categories.model.js"

export const createCategory=async (req,res)=>{

            try{

                        const {name}=req.body;

                        if(!name){

                                    return res.status(401).json({
                                                message:"Category Name is required"
                                    }) }


                                    const category= await Category.create({name,user : req.user_.id})
                                    res.status(201).json({category})
                       
            }catch(error){

                        if( error.code===11000){
                                    return res.status(409).json({message:"Category already Exists"})
                        }
                        res.status(500).json({
                                    message:"Server Error",error:error.message
                        })

            }
}

export const getCategory=async(req,res)=>{

            try{

                        const categories=(await Category.find({user:req.user_.id})).sort({name:1})
                        res.status(200).json({categories})

            }catch(error){

                        res.status(401).json({
                                    message:"Server Error",error:error.message
                        })


            }
}

export const deleteCategory=async(req,res)=>{

            try{

                        const category=await Category.findOne({_id:req.params.id,user:req.user._id})
                        if(!category){

                                    return res.status(404).json({
                                                message:"Category not found"
                                    })
                        }

                        await category.deleteOne()
                        res.status(200).json({
                                    message:"Category Deleted successfully"
                        })

            }catch(error){

                        res.status(500).json({
                                  message:  "Server error",error:error.message
                        })

            }
}