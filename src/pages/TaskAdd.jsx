import { useState, useRef, useMemo } from "react"
//importo il conteto
import { useGlobal } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

//simboli non ammessi
const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

export default function TaskAdd() {
    const navigate = useNavigate()
    //prendo la funzione dal contesto
    const { addTask } = useGlobal();
    //var di stato tiutolo
    const [title, setTitle] = useState("")
    //elementi non controllati
    const refStatus = useRef()
    const refDescription = useRef()
    //funnzione gestione del submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title.trim() === "") {
            alert("il titolo non puo essere vuoto")
            return
        }
        if (isTitleValid) {
            alert('hai usato caratteri non validi')
            return
        }

        //creao la nuova task
        const newTask = {
            title: title,
            description: refDescription.current.value,
            status: refStatus.current.value
        }

        try {
            //eseguo la funzione addTask per aggiungere la task
            console.log("Dati inviati:", newTask);
            await addTask(newTask)
            //in caso di sucesso mostro un alert
            alert("task aggiunta con successo")
            //pulisco il campo controllato
            setTitle("")
            //pulisco i campi non controllati
            e.target.reset
        } catch (err) {
            alert("errore: " + err.message)
        }
        console.log(`
            titolo: ${title}
            descrizione: ${refDescription.current.value}
            status: ${refStatus.current.value}
            `);
        navigate("/")

    }
    //validazione
    const isTitleValid = useMemo(() => {
        return (
            [...title].some(c => symbols.includes(c))
        )
    }, [title])

    return (<>
        <h1>sono taskadd.jsx</h1>
        <form onSubmit={handleSubmit}>
            <label
                htmlFor="titolo">
                <input
                    required
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
            </label>
            <label
                htmlFor="descrizione">
                <textarea
                    type="text"
                    ref={refDescription}
                />
            </label>
            <label
                htmlFor="staus">
                <select name="status"
                    ref={refStatus}
                    defaultValue={"To Do"}>
                    <option value="To do">To do</option>
                    <option value="Doing">Doing</option>
                    <option value="Done">Done</option>
                </select>
            </label>
            <button>invia</button>
        </form>
    </>)
}