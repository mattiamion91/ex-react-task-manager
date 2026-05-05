//importo memo da react
import { memo, useState } from "react";
//importo linlk
import { Link } from "react-router-dom";

export default memo(function TaskRow({ task, checked, onToggle }) {

    //destrutturo cio di cui ho bisogno
    const { title, status, createdAt, id } = task;

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
            <td>
                <Link to={`/task/${id}`}>{title}</Link>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggle(id)} />
            </td>
            <td style={handleColor(status)}>{status}</td>
            <td>{new Date(createdAt).toLocaleDateString()}</td>
        </tr>
    )
})