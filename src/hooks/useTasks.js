import { useState, useEffect } from "react"
const { VITE_API_URL } = import.meta.env //`${VITE_API_URL}`

export default function useTasks() {
    //var di stato per accogliere le tasks
    const [taskList, setTaskList] = useState([])
    //use effect per chiamare le tasts da API solo al montaggio del componente
    useEffect(() => {
        fetch(`${VITE_API_URL}/tasks`)
            .then(res => res.json())
            .then(data => setTaskList(data))
            .catch(err => console.log("errore caricamento", err))
    }, [])
    //funzione per aggiungere task
    async function addTask(newTask) {
        try {
            const res = await fetch(`${VITE_API_URL}/tasks`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTask)
            })

            const data = await res.json()

            if (data.success) {
                setTaskList((prev) => [...prev, data.task])
            } else {
                throw new Error(data.message)
            }
        } catch (err) {
            console.error("errore durante invio", err.message);
            throw err
        }

    }
    //funzione per rimuovere task
    async function removeTask(taskId) {
        try {
            const res = await fetch(`${VITE_API_URL}/tasks/${taskId}`, {
                method: "DELETE",
            })

            const data = await res.json()

            if (data.success) {
                //aggiorno la var di stato filtrando la task rimossa trammite l'id target
                setTaskList((prev) => prev.filter(t => t.id !== taskId))
            }
        } catch (err) {
            console.error("errore eliminazione", err.message);
            throw err
        }
    }
    //funziuone per aggiornare task
    async function updateTask(updatedTask) {

        const res = await fetch(`${VITE_API_URL}/tasks/${updatedTask.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTask)
        })
        //detrutturo il mio data
        const { task : newT, success, message } = await res.json()

        if (!success) {
            console.error("errore durante modifica task" + message);
            throw new Error(message)
        }
        //uso map per creare un nuovo array 
        //se id coincide allora sostitusico oldT con newT, altrimenti tengo la stessa oldT
        setTaskList((prev) => prev.map(oldT => oldT.id === newT.id ? newT : oldT))
    }

    //funzione per rimuovere task multiple
    function removeMultipleTasks([taskids]) {}
    return { taskList, addTask, updateTask, removeTask }
}