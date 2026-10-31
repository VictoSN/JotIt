import type { Application } from "../../types"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js"

ChartJs.register(ArcElement, Tooltip, Legend)

const STATUSES = ["Applied", "Interview", "Offer", "Rejected"] as const

function ApplicationChart({ applications }: { applications: Application[] }) {
    const counts = STATUSES.map(s => applications.filter(a => a.status === s).length )
    const data = {
        labels: [...STATUSES],
        datasets: [{
            data: counts,
        }],
    }

    return(
        <div>
            <Doughnut data={data} options={{ cutout: "65%" }} />
        </div>
    )
}

export default ApplicationChart