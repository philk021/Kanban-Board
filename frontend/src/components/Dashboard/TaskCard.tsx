import { useContext, useState } from "react";
import "./styles/taskcard.css";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";
import TaskContext from "../../context/TaskContext";
import { deleteTask } from "../../core/http";

function TaskCard({boardId, taskId, title, description, priority} : 
    {boardId: string | undefined, taskId: number | undefined, title: string, description: string, priority: string}) {
    
  const [showDelete, setShowDelete] = useState(false);
  const {setTasks} = useContext(TaskContext);
  
  async function handleDelete(e: any) {
    e.preventDefault();
    try {
      const response = await deleteTask(boardId, taskId);
      const data = await response.data;
            
      if (response.status == 200) {
        setTasks(data);
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
          {showDelete && <button type="button" onClick={(e) => handleDelete(e)}><FaTrash/></button>}
          <button type="button" onClick={() => setShowDelete(prev => !prev)}><FaPenToSquare/></button>
        </div>
      </div>
      <div className="task-info">
        <h1 className="task-info-title">{title}</h1>
        <p className="task-info-description">{description}</p>
      </div>
    </div>
  );
}

export default TaskCard;