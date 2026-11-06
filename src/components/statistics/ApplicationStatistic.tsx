import type { Application } from "../../types"

function ApplicationStatistic({ applications }: { applications: Application[] }) {
    const total = applications.length
    const responded = applications.filter(a => a.status !== "Applied").length
    const interview = applications.filter(a => a.status === "Interview").length
    const offer = applications.filter(a => a.status === "Offer").length
    const responseRate = total > 0 ? Math.round((responded / total) * 100) : 0

    return(
        <div className="grid grid-cols-2 gap-4">
            <div className="flex bg-gray-200 px-4 py-2 rounded">
                {total}
            </div>
            <div className="flex bg-gray-200 px-4 py-2 rounded">
                {interview}
            </div>
            <div className="flex bg-gray-200 px-4 py-2 rounded">
                {responseRate}%
            </div>
            <div className="flex bg-gray-200 px-4 py-2 rounded">
                {offer}
            </div>
        </div>
    )
}

export default ApplicationStatistic