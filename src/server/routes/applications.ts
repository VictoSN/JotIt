import express, { type Request, type Response } from "express"
import Application, { type IApplication } from "../models/Application.ts"

const router = express.Router()

type ErrorBody = { error: string }
type CreateBody = Pick<IApplication, "companyName" | "position" | "location" | "workType" | "employmentType" | "expectedSalary" | "status" | "link">

router.get('/', async(_req, res: Response<IApplication[] | ErrorBody>) => {
    try {
        res.json(await Application.find())
    } catch (e) {
        res.status(500).json({ error: "Failed to fetch applications" })
    }
})

export default router