import type { Application } from "../../types"

function ApplicationStatistic({ applications }: { applications: Application[] }) {
    const total = applications.length
    // Anything other than 'Applied' status is considered responded
    const responded = applications.filter(a => a.status !== "Applied").length
    const inprogress = applications.filter(a => a.status === "Interview" || a.status === "Offer").length
    const offer = applications.filter(a => a.status === "Offer").length
    const responseRate = total > 0 ? Math.round((responded / total) * 100) : 0
    const offerRate = total > 0 ? Math.round((offer / total) * 100) : 0

    return(
        <div className="grid grid-cols-2 gap-4 w-full">
            {[
                ["Total tracked", total, "Applications"],
                ["In progress", inprogress, "Interviews/Offers"],
                ["Response rate", `${responseRate}%`, "Acknowledged"],
                ["Offer Rate", `${offerRate}%`, "Interested"],
            ].map(([label, value, description]) => (
                <div key={label} className="statistics-div">
                    <p className="text-sm text-[#9a9a9a] font-bold">{label}</p>
                    <span className="font-serif-display text-3xl mb-1">{value}</span>
                    <p className="text-xs text-[#9a9a9a]">{description}</p>
                </div>
            ))}
        </div>
    )
}

export default ApplicationStatistic