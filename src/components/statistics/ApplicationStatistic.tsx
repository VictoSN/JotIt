import { useEffect, useState } from "react"
import type { Application } from "../../types"

function ApplicationStatistic({ applications }: { applications: Application[] }) {
    const [total, setTotal] = useState(0)
    const [respondPercentage, setRespondPercentage] = useState(0)

    useEffect(() => {
        const total = applications.length
        const responded = applications.filter(a => a.status !== "Applied").length
        const responseRate = total > 0 ? Math.round((responded / total) * 100) : 0
        setTotal(total)
        setRespondPercentage(responseRate)
    }, [applications])

    return(
        <div className="flex flex-col gap-4">
            <div className="flex bg-gray-200 px-4 py-2 rounded">
                {total}
            </div>
            <div className="flex bg-gray-200 px-4 py-2 rounded">
                {respondPercentage}%
            </div>
        </div>
    )
}

export default ApplicationStatistic