export type Application = {
    _id: string
    companyName: string
    position: string
    location?: string
    workType?: "On-Site" | "Hybrid" | "Remote"
    employmentType?: "Full-Time" | "Part-Time" | "Internship" | "Contract"
    expectedSalary?: number
    status?: "Applied" | "Interview" | "Offer" | "Rejected"
    link?: string
}