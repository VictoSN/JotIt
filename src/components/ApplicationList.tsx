import type { Application } from "../types"
import ApplicationCard from "./ApplicationCard"
import { deleteApplication, duplicateApplication, getApplications } from "../api/application"
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

    async function handleDuplicate(id: string) {
        try {
            const copy = await duplicateApplication(id)
            setApplications(prev => [...prev, copy])
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div>
            {applications.map(a => <ApplicationCard key={a._id} application={a} onDelete={handleDelete} onDuplicate={handleDuplicate} />)}
        </div>
    )
}

export default ApplicationList