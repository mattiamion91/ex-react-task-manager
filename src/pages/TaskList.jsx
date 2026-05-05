//importo useGlobal
import { useGlobal } from "../context/GlobalContext"
//importo componente taskrow
import TaskRow from "../components/TaskRow"
import { useMemo, useState } from "react"

export default function TaskList() {
    //stati per gestione ordinamento
    const [sortBy, setSortBy] = useState("createdAt")
    const [sortOrder, setSortOrder] = useState(1)
    //uso tasks da contesto globale
    const { taskList } = useGlobal()
    //funzione gestione sort
    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder * -1)
        } else {
            setSortOrder(1)
            setSortBy(column)
        }
    }
    //funzione che gestisce ordinamento tasks
    const sortedList = useMemo(() => {
        if (sortBy === "title") {
            return [...tasks].sort((a, b) => a.title.localeCompare(b.title) * sortOrder)
        } if (sortBy === "status") {
            const statusArr = ["To do", "Doing", "Done"]
            return [...tasks].sort((a, b) => (statusArr.indexOf(a.status) - statusArr.indexOf(b.status)) * sortOrder)
        } if (sortBy === "createdAt") {
            return [...tasks].sort((a, b) => (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * sortOrder)
        } else {
            return tasks
        }
    }, [tasks, sortBy, sortOrder])

    return (<>
        <h1>sono tasklist.jsx</h1>
        <table>
            <thead>
                <tr>
                    <th onClick={() => handleSort("title")}>titolo</th>
                    <th onClick={() => handleSort("status")}>status</th>
                    <th onClick={() => handleSort("createdAt")}>data di creazine</th>
                </tr>
            </thead>
            <tbody>
                {sortedList.map((t) => (
                    <TaskRow key={t.id} task={t} />
                ))}
            </tbody>
        </table>
    </>)
}