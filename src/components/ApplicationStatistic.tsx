import { useEffect, useState } from "react"
import type { Application } from "../types"

function ApplicationStatistic({ applications }: { applications: Application[] }) {
    const [total, setTotal] = useState(0)
    const [respondPercentage, setRespondPercentage] = useState(0)

    useEffect(() => {
        let count = 0
        let response = 0
        setTotal(applications.length)

        applications.map(a => {
            if (a.status !== "Applied") {
                count++
            }
        })

        response = Math.round(count / total * 100)
        setRespondPercentage(response)
    }, [applications])

    return(
        <div>
            {total}
            {respondPercentage}%
        </div>
    )
}

export default ApplicationStatistic