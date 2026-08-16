import { useContext, useState } from "react";
import "./styles/taskcard.css";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";
import AuthContext from "../../context/AuthContext";

function TaskCard({boardId, taskId, title, description, priority} : 
    {boardId: string | undefined, taskId: number, title: string, description: string, priority: string}) {
    
    const [showDelete, setShowDelete] = useState(false);
    const {token} = useContext(AuthContext);

    async function deleteTask(e: any) {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL_TASKS_DELETE}/${boardId}/${taskId}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
           
            if (response.status == 200) {
                console.log("deleted");
            } else {
                console.log(data.message);
            }
        } catch (err: any) {
            console.log(err);
        }
    }
    
    return (
        <div className="task-card">
            <div className="task-card-header">
                <div className={priority}>{priority}</div>
                <div>
                    <button type="button" onClick={() => setShowDelete(prev => !prev)}><FaPenToSquare/></button>
                    {showDelete && <button type="button" onClick={(e) => deleteTask(e)}><FaTrash/></button>}
                </div>
            </div>
            <div className="task-info">
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default TaskCard;