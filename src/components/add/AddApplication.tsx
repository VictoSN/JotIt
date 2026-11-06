import { useState } from "react"
import { createApplication, editApplication } from "../../api/application"
import type { Application } from "../../types"

const WORK_TYPES = ["On-Site", "Hybrid", "Remote"] as const
const EMPLOYMENT_TYPES = ["Full-Time", "Part-Time", "Internship", "Contract"] as const
const STATUSES = ["Applied", "Interview", "Offer", "Rejected"] as const

type WorkType = typeof WORK_TYPES[number]
type EmploymentType = typeof EMPLOYMENT_TYPES[number]
type Status = typeof STATUSES[number]

interface SelectProps<T extends string> {
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

interface AddApplicationProps {
    editing: Application | null
    onAdd: (a: Application) => void
    onUpdate: (a: Application) => void
    onDone: () => void
}

function AddApplication({ editing, onAdd, onUpdate, onDone }: AddApplicationProps ) {
    const [companyName, setCompanyName] = useState(editing?.companyName ?? "")
    const [position, setPosition] = useState(editing?.position ?? "")
    const [location, setLocation] = useState(editing?.location ?? "")
    const [workType, setWorkType] = useState<WorkType>(editing?.workType ?? "On-Site")
    const [employmentType, setEmploymentType] = useState<EmploymentType>(editing?.employmentType ?? "Full-Time")
    const [expectedSalary, setExpectedSalary] = useState(String(editing?.expectedSalary ?? ""))
    const [status, setStatus] = useState<Status>(editing?.status ?? "Applied")
    const [link, setLink] = useState(editing?.link ?? "")

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
        const data = {
            companyName, position, location, workType, employmentType, expectedSalary: expectedSalary ? Number(expectedSalary) : undefined, status, link,
        }

        try {
            if (editing) onUpdate(await editApplication(editing._id, data))
            else onAdd(await createApplication(data))
            clearInputs()
            console.log("Form sent")
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center" onClick={onDone}>
            <div className="flex flex-col bg-gray-200" onClick={e => e.stopPropagation()}>
                <button onClick={() => onDone()}>X</button>
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

                <button onClick={handleSubmit} className='cursor-pointer'>{ editing ? "Save" : "Submit" }</button>
            </div>
        </div>
    )
}

export default AddApplication