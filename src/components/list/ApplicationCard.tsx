import type { Application } from "../../types"
import locationIcon from "../../assets/location.svg";
import editIcon from "../../assets/edit.svg";
import duplicateIcon from "../../assets/duplicate.svg";
import deleteIcon from "../../assets/delete.svg";
import linkOutIcon from "../../assets/linkOut.svg";

interface ApplicationCardProps {
    application: Application
    onEdit: (a: Application) => void
    onDelete: (id: string) => void
    onDuplicate: (id: string) => void
}

function ApplicationCard({ application, onEdit, onDelete, onDuplicate }: ApplicationCardProps) {
    const { _id, companyName, position, location, workType, employmentType, expectedSalary, status, link } = application
    return (
        <div className="bg-div flex w-full justify-between py-2 px-4 rounded-lg bg-[#1c1c1c]">
            <div className="flex flex-col">
                <div className="flex flex-row gap-2">
                    <h1>{companyName}</h1>
                    <p>{status}</p>
                </div>
                <p>{position}</p>
                <div className="flex flex-row gap-2">
                    {location && 
                        <div className="flex flex-row items-center">
                            <img src={locationIcon} alt="Location" className="w-[24px] h-[24px]"/>
                            {location}
                        </div>
                    }
                    <p>{workType}</p>
                    <p>{employmentType}</p>
                    {expectedSalary && 
                        <p>${expectedSalary}</p>
                    }
                    {link && 
                        <div className="flex flex-row items-center gap-1">
                            <a href={link} target="_blank" rel="noopener noreferrer">Link</a>
                            <img src={linkOutIcon} alt="Link" className="w-4 h-4"/>
                        </div>
                    }
                </div>
            </div>

            <div className="flex flex-row gap-2">
                <button onClick={() => onEdit(application)} className="bg-gray-200 p-1 rounded-sm" title="Edit">
                    <img src={editIcon} alt="Edit" className="w-4 h-4"/>
                </button>
                <button onClick={() => onDuplicate(_id)} className="bg-gray-200 p-1 rounded-sm" title="Duplicate">
                    <img src={duplicateIcon} alt="Duplicate" className="w-4 h-4"/>
                </button>
                <button onClick={() => onDelete(_id)} className="bg-gray-200 p-1 rounded-sm" title="Delete">
                    <img src={deleteIcon} alt="Delete" className="w-4 h-4"/>
                </button>
            </div>
        </div>
    )
}

export default ApplicationCard