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

router.get('/:id', async (req: Request<{ id: string}>, res: Response<IApplication | ErrorBody>) => {
    const app = await Application.findById(req.params.id)
    if (!app) return res.status(404).json({ error: "Not found" })
    res.json(app)
})

router.post('/', async (req: Request<{}, IApplication | ErrorBody, CreateBody>, res) => {
    const created = await Application.create(req.body)
    res.status(201).json(created)
})



export default router