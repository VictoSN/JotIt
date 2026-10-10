import mongoose from "mongoose"

const applicationSchema = new mongoose.Schema({
    companyName: String,
    position: String,
    location: String,
    workType: String,
    employmentType: String,
    expectedSalary: Number,
    status: String,
    link: String
})

export default mongoose.model("Application", applicationSchema)