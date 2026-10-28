import type { Application } from "../types"
import ApplicationCard from "./ApplicationCard"
import { getApplications } from "../api/application"
import { useEffect, useState } from "react"

function ApplicationList() {
    const [applications, setApplications] = useState<Application[]>([])

    useEffect(() => {
        getApplications().then(setApplications).catch(console.error)
    }, [])

    return (
        <div>
            {applications.map(a => <ApplicationCard key={a._id} application={a} />)}
        </div>
    )
}

export default ApplicationList