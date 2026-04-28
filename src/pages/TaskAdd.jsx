import { useState, useRef, useMemo } from "react"

//simboli non ammessi
const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

export default function TaskAdd() {

    //var di stato tiutolo
    const [title, setTitle] = useState("")
    //elementi non controllati
    const refStatus = useRef()
    const resDescription = useRef()
    //funnzione gestione del submit
    const handleSubmit = (e) => {
        e.preventDefault()
        if(isTitleValid) {
            alert('hai usato caratteri non validi')
            return;
        } else(title === ""); {
            alert("il titolo non puo essere vuoto")
            return;
        }
        console.log(`
            titolo: ${title}
            descrizione: ${resDescription.current.value}
            status: ${refStatus.current.value}
            `);

    }
    //validazione
    const isTitleValid = useMemo(() => {
        return (
            [...title].some(c=>symbols.includes(c))
        )
    }, [title])

    return (<>
        <h1>sono taskadd.jsx</h1>
        <form onSubmit={handleSubmit}>
            <label
                htmlFor="titolo">
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
            </label>
            <label
                htmlFor="descrizione">
                <textarea
                    type="text"
                    ref={resDescription}
                />
            </label>
            <label
                htmlFor="staus">
                <select name="status"
                    ref={refStatus}>
                    <option value="To do">To do</option>
                    <option value="Doing">Doing</option>
                    <option value="Done">Done</option>
                </select>
            </label>
            <button>invia</button>
        </form>
    </>)
}