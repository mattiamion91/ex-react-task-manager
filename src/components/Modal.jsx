import ReactDOM from "react-dom";

export default function Modal({
    title = "titolo",
    content = "constenuto",
    show = false,
    onClose,
    onConfirm,
    confirmText = "conferma"
}) {
    //se show é falso non renderizzo nulla
    if (!show) return null

    return ReactDOM.createPortal(
        <div className="modal-container">
            <div className="modal">
                <h1>{title}</h1>
                {content}
                <button onClick={onClose}>annulla</button>
                <button onClick={onConfirm}>{confirmText}</button>
            </div>
        </div>,
        document.getElementById("modal-root") //destinazione nel mio html
    )
}