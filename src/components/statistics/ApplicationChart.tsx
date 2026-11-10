import type { Application } from "../../types"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js"

ChartJs.register(ArcElement, Tooltip, Legend)

const STATUSES = ["Applied", "Interview", "Offer", "Rejected"] as const
const COLORS = ["#8a8a85", "#d97757", "#7a9e7e", "#a85a5a"]

function ApplicationChart({ applications }: { applications: Application[] }) {
    const counts = STATUSES.map(s => applications.filter(a => a.status === s).length )
    const data = {
        labels: [...STATUSES],
        datasets: [{
            data: counts,
            backgroundColor: COLORS,
            borderWidth: 0,
        }],
    }

    return(
        <Doughnut data={data} options={{ cutout: "75%", plugins: { legend: { display: false } } }} />
    )
}

export default ApplicationChart