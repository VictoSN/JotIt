import type { Application } from "../../types"

function ApplicationStatistic({ applications }: { applications: Application[] }) {
    const total = applications.length
    const responded = applications.filter(a => a.status !== "Applied").length
    const interview = applications.filter(a => a.status === "Interview").length
    const offer = applications.filter(a => a.status === "Offer").length
    const responseRate = total > 0 ? Math.round((responded / total) * 100) : 0

    return(
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-div statistics-div">
                <p>Total Tracked</p>
                {total}
            </div>
            <div className="bg-div statistics-div">
                <p>Interviews</p>
                {interview}
            </div>
            <div className="bg-div statistics-div">
                <p>Response Rate</p>
                {responseRate}%
            </div>
            <div className=" bg-div statistics-div">
                <p>Offers</p>
                {offer}
            </div>
        </div>
    )
}

export default ApplicationStatistic