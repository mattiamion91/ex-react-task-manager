import { useParams, useNavigate } from "react-router-dom"
//importo useGlobal
import { useGlobal } from "../context/GlobalContext"
//importo modale
import Modal from "../components/Modal";
import { useState } from "react";
//importo modale per edit
import EditTaskModal from "../components/EditTaskModal";

export default function TaskDetail() {
    //var di stato show modale di edit
    const [showEdit, setShowEdit] = useState(false)
    //var di stato apertuta chiusura modale
    const [show, setShow] = useState(false)
    //hook navigate
    const navigate = useNavigate();
    //recupero id dinamivo
    const { id } = useParams()
    //recupero la lista delle task dal contesto
    const { taskList, removeTask, updateTask } = useGlobal()
    //recupero la task usando metodo find e facendo coincidere gli id
    const task = taskList.find(t => t.id === parseInt(id))
    //funzione per riumozione task
    async function handleDelete() {
        try {
            await removeTask(task.id);
            alert("task eliminata")
            //per toranre alla homepage
            navigate("/")

        } catch (err) {
            console.error("errore durante eliminazione" + err.message);
            throw err
        }
    }
    //funzione gestione modifica task
    const handleUpdate = async (updatedTask) => {
        try {
            await updateTask(updatedTask)
            console.log(updatedTask);
            
            setShowEdit(false)
        } catch (err) {
            console.error("errore durante eliminazione" + err.message);
            throw err
        }
    }


    //loader
    if (!task) {
        return <h2>Caricamento task o task non trovato...</h2>;
    }
    return (
        <div>
            <h1>Dettaglio Task</h1>
            <p>{task.title}</p>
            <p>{task.description}</p>
            <p>{task.status}</p>
            <p>{new Date(task.createdAt).toLocaleDateString()}</p>
            <button onClick={handleDelete}>elimina task</button>
            <button onClick={() => { setShow(true) }}>elimina task con modale</button>
            <button onClick={() => { setShowEdit(true) }}>modifica task con modale</button>
            { /*modale di eliminazione*/}
            <Modal
                title="elimina"
                content={<p>sei sicuro di voler eliminare la task?</p>}
                show={show}
                onClose={() => { setShow(false) }}
                onConfirm={handleDelete}
                confirmText="conferma eliminazione"
            />
            {/*modale di modifica*/}
            <EditTaskModal
                task={task}
                show={showEdit}
                onClose={() => setShowEdit(false)}
                onSave={handleUpdate}
            />
        </div>
    )
}