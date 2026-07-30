import express from "express"


const router=express.Router()

router.use(protect)

router.get("/summary")

export default router