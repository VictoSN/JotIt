import { useState } from "react"

function AddApplication() {
    const WORK_TYPES = ["On-Site", "Hybrid", "Remote"] as const
    const EMPLOYMENT_TYPES = ["Full-Time", "Part-Time", "Internship", "Contract"] as const
    const STATUSES = ["Applied", "Interview", "Offer", "Rejected"] as const

    type WorkType = typeof WORK_TYPES[number]
    type EmploymentType = typeof EMPLOYMENT_TYPES[number]
    type Status = typeof STATUSES[number]

    const [companyName, setCompanyName] = useState("")
    const [position, setPosition] = useState("")
    const [location, setLocation] = useState("")
    const [workType, setWorkType] = useState<WorkType>("On-Site")
    const [employmentType, setEmploymentType] = useState<EmploymentType>("Full-Time")
    const [expectedSalary, setExpectedSalary] = useState("")
    const [status, setStatus] = useState<Status>("Applied")
    const [link, setLink] = useState("")

    return (
        <div className="flex flex-col">
            <div className="flex flex-col">
                <input placeholder="Company Name"></input>
                <input placeholder="Position"></input>
                <input placeholder="Location"></input>

                {/* Work Type */}
                <select>
                    <option></option>
                </select>

                {/* Employment Type */}
                <select>
                    <option></option>
                </select>

                <input type='number' placeholder="Expected Salary"></input>

                {/* Status */}
                <select>
                    <option></option>
                </select>

                <input placeholder="Link"></input>
            </div>

            <button className='cursor-pointer'>Submit</button>
        </div>
    )
}

export default AddApplication