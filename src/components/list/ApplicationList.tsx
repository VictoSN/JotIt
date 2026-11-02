import type { Application } from "../../types"
import ApplicationCard from "./ApplicationCard"

interface ApplicationListProps {
    applications: Application[]
    onEdit: (a: Application) => void
    onDelete: (id: string) => void
    onDuplicate: (id: string) => void
}

function ApplicationList({ applications, onEdit, onDelete, onDuplicate }: ApplicationListProps) {
    return (
        <div>
            {applications.map(a => <ApplicationCard key={a._id} application={a} onEdit={onEdit} onDelete={onDelete} onDuplicate={onDuplicate} />)}
        </div>
    )
}

export default ApplicationList