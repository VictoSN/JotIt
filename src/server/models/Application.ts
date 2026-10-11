import mongoose, { type InferSchemaType } from "mongoose"

const applicationSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    position: { type: String, required: true },
    location: String,
    workType: { type: String, enum: ["On-Site", "Hybrid", "Remote"] as const },
    employmentType: { type: String, enum: ["Full-Time", "Part-Time", "Internship", "Contract"] as const },
    expectedSalary: Number,
    status: { type: String, enum: ["Applied", "Interview", "Offer", "Rejected"] as const, default: "Applied" },
    link: String
}, {timestamps: true })

export type IApplication = InferSchemaType<typeof applicationSchema>
export default mongoose.model("Application", applicationSchema)