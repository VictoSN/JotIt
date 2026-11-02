import { useState } from "react"
import type { Application } from "../../types"
import AddApplication from "./AddApplication"

interface AddModalProps {
    onAdd: (a: Application) => void
}

function AddModal({ onAdd }: AddModalProps) {
    const [show, setShow] = useState(false)

    function handleAdd(a: Application) {
        onAdd(a)
        setShow(false)
    }

    return(
        <div>
            <button onClick={() => setShow(!show)}>+</button>
            {show && <AddApplication onAdd={handleAdd} />}
        </div>
    )
}

export default AddModal