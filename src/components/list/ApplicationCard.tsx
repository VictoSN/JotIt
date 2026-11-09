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
        <div className="flex w-[max] justify-between border-solid border-1 py-2 px-4 rounded-lg">
            <div className="flex flex-col">
                <div className="flex flex-row gap-2">
                    <h1>{companyName}</h1>
                    <p>{status}</p>
                </div>
                <p>{position}</p>
                <div className="flex flex-row gap-2">
                    <p>{location}</p>
                    <p>{workType}</p>
                    <p>{employmentType}</p>
                    <p>${expectedSalary}</p>
                    {link && <a href={link} target="_blank" rel="noopener noreferrer">Link</a>}
                </div>
            </div>
            <div className="flex flex-row gap-2">
                <button onClick={() => onEdit(application)} className="bg-gray-200 p-1 rounded-sm">Edit</button>
                <button onClick={() => onDuplicate(_id)} className="bg-gray-200 p-1 rounded-sm">Dup</button>
                <button onClick={() => onDelete(_id)} className="bg-gray-200 p-1 rounded-sm">Del</button>
            </div>
        </div>
    )
}

export default ApplicationCard