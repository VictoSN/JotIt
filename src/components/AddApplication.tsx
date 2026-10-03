function AddApplication() {
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