import type { Application } from "../types"
import ApplicationCard from "./ApplicationCard"

type Props = {
    applications: Application[]
    onDelete: (id: string) => void
    onDuplicate: (id: string) => void
}

function ApplicationList({ applications, onDelete, onDuplicate }: Props) {
    return (
        <div>
            {applications.map(a => <ApplicationCard key={a._id} application={a} onDelete={onDelete} onDuplicate={onDuplicate} />)}
        </div>
    )
}

export default ApplicationList