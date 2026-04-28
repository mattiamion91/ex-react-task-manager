import { useParams } from "react-router-dom"
//importo useGlobal
import { useGlobal } from "../context/GlobalContext"

export default function TaskDetail() {
    //recupero id dinamivo
    const { id } = useParams()
    //recupero la lista delle task dal contesto
    const { taskList } = useGlobal()
    //recupero la task usando metodo find e facendo coincidere gli id
    const task = taskList.find(t => t.id == id)

    //loader
    if (!task) {
        return <h2>Caricamento task o task non trovato...</h2>;
    }
    console.log(task);
    return (
        <div>
            <h1>Dettaglio Task</h1>
            <p>{task.title}</p>
            <p>{task.description}</p>
            <p>{task.status}</p>
            <p>{task.createdAt}</p>
            <button>elimina task</button>
        </div>
    )
}