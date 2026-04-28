//importo useGlobal
import { useGlobal } from "../context/GlobalContext"
//importo componente taskrow
import TaskRow from "../components/TaskRow"

export default function TaskList() {
    //uso tasks da contesto globale
    const { taskList } = useGlobal()
    return (<>
        <h1>sono tasklist.jsx</h1>
        <table>
            <thead>
                <tr>
                    <th>titolo</th>
                    <th>status</th>
                    <th>data di creazine</th>
                </tr>
            </thead>
            <tbody>
                {taskList.map((t) => (
                    <TaskRow key={t.id} task={t} />
                ))}
            </tbody>
        </table>        
    </>)
}