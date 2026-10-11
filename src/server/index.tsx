import express from "express"
import cors from "cors"
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import applicationsRouter from './routes/applications.ts'
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/applications', applicationsRouter)

const uri = process.env.MONGO_URI
if (!uri) throw new Error("MONGO_URI is not set")

mongoose.connect(uri)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => {
        console.log(err)
        process.exit(1)
    })

app.listen(3000, () => console.log("Listening on port 3000"))