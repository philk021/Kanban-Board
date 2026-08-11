import "./styles/taskcard.css";
import { FaPenToSquare } from "react-icons/fa6";

function TaskCard({title, description, priority} : {title: string, description: string, priority: string}) {
    return (
        <div className="task-card">
            <div className="task-card-header">
                <div className={priority}>{priority}</div>
                <button><FaPenToSquare/></button>
            </div>
            <div className="task-info">
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default TaskCard;