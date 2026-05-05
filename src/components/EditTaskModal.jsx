import { useState, useRef, useEffect } from "react";
//importo modale
import Modal from "./Modal"

export default function EditTaskModal({
    show,
    onClose,
    task,
    onSave
}) {
    //ref per il submit del form
    const editFromRef = useRef()
    //var di stato per modifica task
    const [editedTask, setEditedTask] = useState(task)
    //funzione gestione modifica task
    const handleEditedTask = (key, event) => {
        setEditedTask(prev => ({ ...prev, [key]: event.target.value }))
    }
    //detrutturo le propita di editedTask
    const { title, description, status } = editedTask;
    //array degli status
    const statusArr = ["To do", "Doing", "Done"];
    //funzione gestione submit del fomr
    const handleSubmit = e => {
        e.preventDefault();
        onSave(editedTask);
    }

    return (
        <Modal
            title="Modifica form"
            content={
                <form
                    ref={editFromRef}
                    onSubmit={handleSubmit}>
                    <label>
                        Modifica titolo:
                        <input
                            type="text"
                            value={title}
                            onChange={e => handleEditedTask("title", e)}
                        />
                    </label>
                    <label>
                        Descrizione
                        <textarea
                            value={description}
                            onChange={e => handleEditedTask("description", e)}
                        />
                    </label>
                    <label>
                        Status:
                        <select
                            value={status}
                            onChange={e => handleEditedTask("status", e)}
                        >
                            {statusArr.map((value, index) => (<option
                                key={index} value={value}>{value}</option>))}
                        </select>
                    </label>
                </form>
            }
            confirmText="Salva"
            show={show}
            onClose={onClose}
            onConfirm={() => editFromRef.current?.requestSubmit()}
        />
    )
}