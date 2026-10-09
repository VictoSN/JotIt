function AddApplication() {
    const workType = ["On-Site", "Hybrid", "Remote"]
    const employmentType = ["Full-Time", "Part-Time", "Internship", "Contract"]
    const status = ["Applied", "Interview", "Offer", "Rejected"]

    return (
        <div className="flex flex-col">
            <div className="flex flex-col">
                <input placeholder="Company Name"></input>
                <input placeholder="Position"></input>
                <input placeholder="Location"></input>

                {/* Work Type */}
                <select>
                    <option></option>
                </select>

                {/* Employment Type */}
                <select>
                    <option></option>
                </select>

                <input type='number' placeholder="Expected Salary"></input>

                {/* Status */}
                <select>
                    <option></option>
                </select>

                <input placeholder="Link"></input>
            </div>

            <button className='cursor-pointer'>Submit</button>
        </div>
    )
}

export default AddApplication