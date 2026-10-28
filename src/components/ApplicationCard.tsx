import type { Application } from "../types"

function ApplicationCard({ application }: {application: Application}) {
    const { companyName, position, location, workType, status, link } = application
    return (
        <div className="flex flex-row">
            <h1>{companyName}</h1>
            <p>{position}</p>
            <p>{location}</p>
            <p>{workType}</p>
            <p>{status}</p>
            <p>{link}</p>
        </div>
    )
}

export default ApplicationCard