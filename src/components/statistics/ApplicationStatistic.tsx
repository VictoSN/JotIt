import type { Application } from "../../types"

function ApplicationStatistic({ applications }: { applications: Application[] }) {
    const total = applications.length
    const responded = applications.filter(a => a.status !== "Applied").length
    const interview = applications.filter(a => a.status === "Interview").length
    const offer = applications.filter(a => a.status === "Offer").length
    const responseRate = total > 0 ? Math.round((responded / total) * 100) : 0

    return(
        <div className="grid grid-cols-2 gap-4 w-full">
            {[
                ["Total tracked", total],
                ["Interviews", interview],
                ["Response rate", `${responseRate}%`],
                ["Offers", offer],
            ].map(([label, value]) => (
                <div key={label} className="statistics-div">
                    <p className="text-xs text-[#9a9a9a]">{label}</p>
                    <span className="font-serif-display text-3xl">{value}</span>
                </div>
            ))}
        </div>
    )
}

export default ApplicationStatistic