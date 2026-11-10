import { useState } from "react"
import { createApplication, editApplication } from "../../api/application"
import type { Application } from "../../types"
import closeIcon from "../../assets/close.svg";

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
        <select className="bg-div modal-input" value={value} onChange={e => onChange(e.target.value as T)}>
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
            companyName, position, location, workType, employmentType, expectedSalary: expectedSalary.trim() === "" ? (editing ? null : undefined) : Number(expectedSalary), status, link,
        }

        try {
            if (editing) onUpdate(await editApplication(editing._id, data))
            else onAdd(await createApplication(data))
            clearInputs()
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center" onClick={onDone}>
            <div className="relative flex flex-col bg-[#303030] w-full h-[80dvh] overflow-y-auto p-4 gap-2 rounded-t-lg sm:w-fit sm:h-fit sm:max-h-[90vh] sm:rounded-lg" onClick={e => e.stopPropagation()}>
                {!editing ? (
                    <div>
                        <h1 className="font-semibold">New Application</h1>
                    </div>
                    ) : (
                    <div>
                        <h1 className="font-semibold">Edit Application</h1>
                    </div>
                )}

                <button onClick={() => onDone()} className="absolute top-4 right-4" title="Close">
                    <img src={closeIcon} alt="Close" className="icon-size"/>
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-4">
                        <div className="modal-input-div">
                            <div className="flex items-center gap-1">
                                <h2 className="modal-input-header">Company Name</h2>
                                <p className="text-red-500">*</p>
                            </div>
                            <input className="bg-div modal-input" value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder="e.g. Google"></input>
                        </div>

                        <div className="modal-input-div">
                            <h2 className="modal-input-header">Location</h2>
                            <input className="bg-div modal-input" value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Singapore"></input>
                        </div>

                        <div className="modal-input-div">
                            <h2 className="modal-input-header">Work Type</h2>
                            <Select value={workType} options={WORK_TYPES} onChange={setWorkType} />
                        </div>

                        <div className="modal-input-div">
                            <h2 className="modal-input-header">Status</h2>
                            <Select value={status} options={STATUSES} onChange={setStatus} />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="modal-input-div">
                            <div className="flex items-center gap-1">
                                <h2 className="modal-input-header">Position</h2>
                                <p className="text-red-500">*</p>
                            </div>
                            <input className="bg-div modal-input" value={position} onChange={e => setPosition(e.target.value)} placeholder="e.g. Software Developer"></input>
                        </div>

                        <div className="modal-input-div">
                            <h2 className="modal-input-header">Expected Salary</h2>
                            <div className="flex flex-row bg-div modal-input gap-1">
                                <p>$</p>
                                <input className="outline-none" type='number' min="0" step="1" value={expectedSalary} onChange={e =>  setExpectedSalary(e.target.value)} placeholder="90000"></input>
                            </div>
                        </div>

                        <div className="modal-input-div">
                            <h2 className="modal-input-header">Employment Type</h2>
                            <Select value={employmentType} options={EMPLOYMENT_TYPES} onChange={setEmploymentType} />
                        </div>

                        <div className="modal-input-div">
                            <h2 className="modal-input-header">Job Posting Link</h2>
                            <input className="bg-div modal-input" value={link} onChange={e => setLink(e.target.value)} placeholder="https://google.com/jobs/software-developer"></input>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row gap-4 justify-end border-t border-solid border-[#6e6e6e] pt-2">                    
                    <button onClick={onDone} title="Cancel">Cancel</button>
                    <button onClick={handleSubmit} className='cursor-pointer bg-[#efefef] text-[#303030] py-1 px-2 rounded-md' title={editing ? "Save" : "Add"}>{ editing ? "Save" : "Add" }</button>
                </div>
            </div>
        </div>
    )
}

export default AddApplication