import express from "express"

const router=express.Router()


router.use(protect)

router.post("/")
router.get("/")
router.delete("/:id")


export default router