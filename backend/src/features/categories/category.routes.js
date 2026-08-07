import express from "express"
import {createCategory,getCategories,deleteCategory}  from "./category.controller.js"
import protect from "../../middleware/auth.middleware.js"

const router=express.Router()


router.use(protect)

router.post("/",createCategory)
router.get("/", getCategories)
router.delete("/:id" , deleteCategory)


export default router