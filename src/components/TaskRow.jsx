//importo memo da react
import { memo } from "react";
//importo linlk
import { Link } from "react-router-dom";

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
            <td><Link to={`/task/${task.id}`}>{title}</Link></td>
            <td style={handleColor(status)}>{status}</td>
            <td>{createdAt}</td>
        </tr>
    )
})