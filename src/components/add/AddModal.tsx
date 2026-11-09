import { useState } from "react"
import type { Application } from "../../types"
import AddApplication from "./AddApplication"
import plusIcon from "../../assets/plus.svg";

interface AddModalProps {
    editing: Application | null
    onAdd: (a: Application) => void
    onUpdate: (a: Application) => void
    onClose: () => void
}

function AddModal({ editing, onAdd, onUpdate, onClose }: AddModalProps) {
    const [show, setShow] = useState(false)
    const open = show || editing !== null

    function done() {
        setShow(false)
        onClose()
    }

    return(
        <div>
            {open ? '' : 
                <button onClick={() => setShow(true)} className="fixed bottom-10 right-10 bg-yellow-400 p-4 rounded-3xl flex flex-row items-center gap-1">
                    <img src={plusIcon} className="w-4 h-4"/>
                    New Application
                </button>}
            {open && <AddApplication onAdd={a => { onAdd(a); done() }} editing={editing} onUpdate={a => { onUpdate(a); done() }} onDone={done} />}
        </div>
    )
}

export default AddModal