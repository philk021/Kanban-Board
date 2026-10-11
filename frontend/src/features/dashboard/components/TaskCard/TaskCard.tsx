import { useContext, useRef } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";
import TaskContext from "../../context/TaskContext";
import { deleteTask } from "../../api/dashboardApi";
import type { TaskChanges } from "../TaskColumn/TaskColumn";
import type { Task } from "../../../../shared/types/Task";
import "./TaskCard.css";

export function TaskCard({task, onUpdate}: {
  task: Task,
  onUpdate: (changes: TaskChanges, id?: string) => void
}) {
  const { setTasks } = useContext(TaskContext);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  
  const handleDelete = async (e: any) => {
    e.preventDefault();
    const response = await deleteTask(task.board_id, task.task_id);
    const data = await response.data;      
    if (response.status == 200) {
      setTasks(data);
    }
  };

  async function handleSubmit(e: any) {
    e.preventDefault();
  };
    
  return (
    <>
      <dialog ref={dialogRef} className="dialog">
        <form className="task-form" onSubmit={(e) => handleSubmit(e)}>
          <h3>Edit task</h3>        
          <input 
            className="form-input" 
            type="text"
            placeholder="Name"
            value={task.task_title}
            onChange={(e) => onUpdate({ task_title: e.target.value }, task.task_id)}
          />
          <textarea 
            className="form-input"
            placeholder="Description"
            value={task.task_description}
            onChange={(e) => onUpdate({ task_description: e.target.value }, task.task_id)}
          />
          <label htmlFor="priority">Priority: </label>               
          <select 
            name="priority" 
            className="priority-dropdown"
            value={task.task_priority}
            onChange={(e) => onUpdate({ task_priority: e.target.value }, task.task_id)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>        
          <div className="task-btns">
            <button 
              type="submit" 
              className="create-task-btn"
              onClick={(e) => handleDelete(e)}
            >
              Delete
            </button>
            <button 
              type="submit" 
              className="create-task-btn"
            >
              Save
            </button>
            <button 
              type="button" 
              className="close-btn" 
              onClick={(e) => {
                e.preventDefault();
                dialogRef.current?.close();
              }}
            >
              Close
            </button>
          </div>          
        </form>
      </dialog> 
      <div className="task-card">
        <div className="task-card-header">
          <div className={task.task_priority}>{task.task_priority}</div>
          <div>
            <button 
              type="button" 
              onClick={() => dialogRef.current?.showModal()}
            >
              <FaEllipsisVertical/>
            </button>
          </div>
        </div>
        <div className="task-info">
          <h1 className="task-info-title">{task.task_title}</h1>
          <p className="task-info-date">{task.created_at}</p>
        </div>
      </div>  
    </>
  );
}