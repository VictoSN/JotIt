import { useEffect, useState } from "react"
import type { Application } from "../../types"

function ApplicationStatistic({ applications }: { applications: Application[] }) {
    const [total, setTotal] = useState(0)
    const [respondPercentage, setRespondPercentage] = useState(0)

    useEffect(() => {
        let count = 0
        setTotal(applications.length)

        applications.map(a => {
            if (a.status !== "Applied") {
                count++
            }
        })

        let response = Math.round(count / total * 100)
        setRespondPercentage(response)
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