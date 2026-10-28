import { useState } from "react"
import { createApplication } from "../api/application"
import type { Application } from "../types"

const WORK_TYPES = ["On-Site", "Hybrid", "Remote"] as const
const EMPLOYMENT_TYPES = ["Full-Time", "Part-Time", "Internship", "Contract"] as const
const STATUSES = ["Applied", "Interview", "Offer", "Rejected"] as const

type WorkType = typeof WORK_TYPES[number]
type EmploymentType = typeof EMPLOYMENT_TYPES[number]
type Status = typeof STATUSES[number]

type SelectProps<T extends string> = {
    value: T
    options: readonly T[]
    onChange: (value: T) => void
}

function Select<T extends string>({ value, options, onChange }: SelectProps<T>) {
    return (
        <select value={value} onChange={e => onChange(e.target.value as T)}>
            {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
    )
}

function AddApplication({ onAdd }: { onAdd: (a: Application) => void }) {
    const [companyName, setCompanyName] = useState("")
    const [position, setPosition] = useState("")
    const [location, setLocation] = useState("")
    const [workType, setWorkType] = useState<WorkType>("On-Site")
    const [employmentType, setEmploymentType] = useState<EmploymentType>("Full-Time")
    const [expectedSalary, setExpectedSalary] = useState("")
    const [status, setStatus] = useState<Status>("Applied")
    const [link, setLink] = useState("")

    function clearInputs() {
        setCompanyName("")
        setPosition("")
        setLocation("")
        setWorkType("On-Site")
        setEmploymentType("Full-Time")
        setExpectedSalary("")
        setStatus("Applied")
        setLink("")
    }

    async function handleSubmit() {
        try {
            const created = await createApplication({
                companyName, position, location, workType, employmentType, expectedSalary: Number(expectedSalary), status, link,
            })
            onAdd(created)
            clearInputs()
            console.log("Form sent")
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-col">
                <input value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder="Company Name"></input>
                <input value={position} onChange={e => setPosition(e.target.value)} placeholder="Position"></input>
                <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location"></input>

                {/* Work Type */}
                <Select value={workType} options={WORK_TYPES} onChange={setWorkType} />

                {/* Employment Type */}
                <Select value={employmentType} options={EMPLOYMENT_TYPES} onChange={setEmploymentType} />

                <input type='number' value={expectedSalary} onChange={e =>  setExpectedSalary(e.target.value)} placeholder="Expected Salary"></input>

                {/* Status */}
                <Select value={status} options={STATUSES} onChange={setStatus} />

                <input value={link} onChange={e => setLink(e.target.value)} placeholder="Link"></input>
            </div>

            <button onClick={handleSubmit} className='cursor-pointer'>Submit</button>
        </div>
    )
}

export default AddApplication