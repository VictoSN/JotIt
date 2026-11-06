import { useState } from "react"
import type { Application } from "../../types"
import AddApplication from "./AddApplication"

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
            {open ? 
                <button onClick={() => done()}>X</button>
                :
                <button onClick={() => setShow(true)}>+</button> 
            }
            {open && <AddApplication onAdd={a => { onAdd(a); done() }} editing={editing} onUpdate={a => { onUpdate(a); done() }} />}
        </div>
    )
}

export default AddModal