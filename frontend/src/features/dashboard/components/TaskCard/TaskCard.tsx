import { useContext, useRef } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { deleteTask } from "../../../../core/http";
import "./TaskCard.css";
import TaskContext from "../../../../shared/context/TaskContext";

export function TaskCard({ boardId, taskId, title, description, priority, date } : 
  {
    boardId: string | undefined, 
    taskId: number | undefined, 
    title: string, 
    description: string, 
    priority: string,
    date: string,
  }) {
  const { setTasks } = useContext(TaskContext);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  
  async function handleDelete(e: any) {
    e.preventDefault();
    try {
      const response = await deleteTask(boardId, taskId);
      const data = await response.data;      
      if (response.status == 200) {
        setTasks(data);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  async function handleSubmit(e: any) {

  }
    
  return (
    <>
      <dialog ref={dialogRef} className="dialog">
        <form className="task-form" onSubmit={(e) => handleSubmit(e)}>
          <h3>Edit task</h3>        
          <input 
            className="form-input" 
            type="text"
            placeholder="Name"
            value={title}
            onChange={() => true}
          />
          <textarea 
            className="form-input"
            placeholder="Description"
            value={description}
            onChange={() => true}
          />
          <label htmlFor="priority">Priority: </label>               
          <select 
            name="priority" 
            className="priority-dropdown"
            value={priority}
            onChange={() => true}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>        
          <div className="task-btns">
            <button 
              type="submit" 
              className="create-task-btn"
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
          <div className={priority}>{priority}</div>
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
          <h1 className="task-info-title">{title}</h1>
          <p className="task-info-date">{date}</p>
        </div>
      </div>  
    </>
  );
}