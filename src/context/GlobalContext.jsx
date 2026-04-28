//salviamo su una variabile il createContext
const GlobalContext = createContext();
//importo useState
import { useState, useEffect, useContext, createContext } from "react";
//import hook useTasks creato
import useTasks from "../hooks/useTasks";

function GlobalProvider({ children }) {
    /*memorizzo la lista delle task
    const [taskList, setTaskList] = useState([])
    //chiamata per recueprare le task da api dentro un useEffect per farlo solo al motanggio del componente
    useEffect(() => {
        fetch("http://localhost:3001/tasks")
            .then(res => res.json())
            .then(data => setTaskList(data))
            .catch(err => console.error('errore nel caricamento', err))
    }, [])*/

    //uso hook useTask
    const getTasks = useTasks()
    
    return (<GlobalContext.Provider
        value={
            getTasks
        }>
        {children}
    </GlobalContext.Provider>)
}

//definiamo un hook per consumare il contesto
function useGlobal() {
    const context = useContext(GlobalContext);
    if(!context) {
        throw Error ("useGlobal deve essere usato all'interno di un GlobalProvider")
    }
    return context;
}

export { GlobalProvider, useGlobal }