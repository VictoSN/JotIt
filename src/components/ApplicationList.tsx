import type { Application } from "../types"
import ApplicationCard from "./ApplicationCard"
import { deleteApplication, getApplications } from "../api/application"
import { useEffect, useState } from "react"

function ApplicationList() {
    const [applications, setApplications] = useState<Application[]>([])

    useEffect(() => {
        getApplications().then(setApplications).catch(console.error)
    }, [])

    async function handleDelete(id: string) {
        try {
            await deleteApplication(id)
            setApplications(prev => prev.filter(a => a._id !== id))
        } catch (e) {
            console.error(e)
        }
    }

    

    return (
        <div>
            {applications.map(a => <ApplicationCard key={a._id} application={a} onDelete={handleDelete} />)}
        </div>
    )
}

export default ApplicationList