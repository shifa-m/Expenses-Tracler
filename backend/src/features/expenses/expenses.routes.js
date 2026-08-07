import express from "express"
import{createExpense ,getExpense , updateExpenses ,deleteExpense} from "./expenses.controller.js"
import protect from "../../middleware/auth.middleware.js"


const router=express.Router();

router.use(protect)

router.post("/",createExpense)
router.get("/" , getExpense)
router.put("/:id" , updateExpenses)
router.delete("/:id" , deleteExpense)

export default router