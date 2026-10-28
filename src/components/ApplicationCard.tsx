import type { Application } from "../types"

function ApplicationCard({ application, onDelete }: {
    application: Application
    onDelete: (id: string) => void
}) {
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
                <button onClick={() => onDelete(_id)} className="cursor-pointer">Del</button>
                <button className="cursor-pointer">Dup</button>
            </div>
        </div>
    )
}

export default ApplicationCard