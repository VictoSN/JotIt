import type { Application } from "../../types"

interface ApplicationCardProps {
    application: Application
    onEdit: (a: Application) => void
    onDelete: (id: string) => void
    onDuplicate: (id: string) => void
}

function ApplicationCard({ application, onEdit, onDelete, onDuplicate }: ApplicationCardProps) {
    const { _id, companyName, position, location, workType, employmentType, expectedSalary, status, link } = application
    return (
        <div className="flex w-[max] justify-between">
            <div className="flex">
                <h1>{companyName}</h1>
                <p>{position}</p>
                <p>{location}</p>
                <p>{workType}</p>
                <p>{employmentType}</p>
                <p>{expectedSalary}</p>
                <p>{status}</p>
                <p>{link}</p>
            </div>
            <div>
                <button onClick={() => onEdit(application)}>Edit</button>
                <button onClick={() => onDelete(_id)}>Del</button>
                <button onClick={() => onDuplicate(_id)}>Dup</button>
            </div>
        </div>
    )
}

export default ApplicationCard