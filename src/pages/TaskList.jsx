//importo useGlobal
import { useGlobal } from "../context/GlobalContext"
//importo componente taskrow
import TaskRow from "../components/TaskRow"
import { useMemo, useState, useCallback, useRef} from "react"

//funzione generica di debounce
function debounce(callback, wait) {
    let timer;
    return (value) => {
        clearTimeout(timer);
        timer = setTimeout(()=>{
            callback(value)
        }, wait)
    }
}

export default function TaskList() {
    //stato per ricerecare task
    const [searchQuery, setSearchQuery] = useState("")
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
        //var lista listrata
        const filteredList = [...taskList].filter(t=>t.title.toLowerCase().includes(searchQuery.toLowerCase()))
        if (sortBy === "title") {
            return filteredList.sort((a, b) => a.title.localeCompare(b.title) * sortOrder)
        } if (sortBy === "status") {
            const statusArr = ["To do", "Doing", "Done"]
            return filteredList.sort((a, b) => (statusArr.indexOf(a.status) - statusArr.indexOf(b.status)) * sortOrder)
        } if (sortBy === "createdAt") {
            return filteredList.sort((a, b) => (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * sortOrder)
        } else {
            return filteredList
        }
    }, [taskList, sortBy, sortOrder, searchQuery])

    //funzione debouncata ricerca
    const debouncedFn = useCallback(debounce(setSearchQuery, 500), [])

    return (<>
        <h1>sono tasklist.jsx</h1>
        <label>Cerca...
            <input
                type="text"
                onChange={e => debouncedFn(e.target.value)} />
        </label>
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

