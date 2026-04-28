//importo memo da react
import { memo } from "react";

export default memo(function TaskRow({ task }) {
       
    //destrutturo cio di cui ho bisogno
    const { title, status, createdAt } = task;

    //funzione gestione colore bg
    function handleColor(status) {
        switch (status) {
            case "To do":
                return { backgroundColor: "red" };
            case "Doing":
                return { backgroundColor: "yellow" };
            case "Done":
                return { backgroundColor: "green" }
            default:
                return {}

        }
    }

    return (
        <tr>
            <td>{title}</td>
            <td style={handleColor(status)}>{status}</td>
            <td>{createdAt}</td>
        </tr>
    )
})