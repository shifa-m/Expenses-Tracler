import express from "express"

const router=express.Router()


router.use(protect)

router.post("/register")
router.post("/login")
router.post("/logout")

router.get("/me")


export default router