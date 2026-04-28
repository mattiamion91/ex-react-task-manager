import { useState, useEffect } from "react"

export default function useTasks() {
    //var di stato per accogliere le tasks
    const [taskList, setTaskList] = useState([])
    //use effect per chiamare le tasts da API solo al montaggio del componente
    useEffect(() => {
        fetch("http://localhost:3001/tasks")
            .then(res => res.json())
            .then(data => setTaskList(data))
            .catch(err => console.log("errore caricamento", err))
    }, [])
    //funzione per aggiungere task
    async function addTask(newTask) {
        try {
            const res = await fetch("http://localhost:3001/tasks", {
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
    //funzione per modificare task
    function updateTask() { }
    //funziuone per rimuovere task
    function removeTask() { }

    return { taskList, addTask, updateTask, removeTask }
}