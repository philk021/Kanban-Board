import { useContext, useEffect, useRef, useState } from "react";
import type { Task } from "../../types/Task";
import "./styles/taskcolumn.css";
import TaskCard from "./TaskCard";
import { FaPlus, FaEllipsisVertical, FaTrash } from "react-icons/fa6";
import AuthContext from "../../context/AuthContext";
import TaskContext from "../../context/TaskContext";

function TaskColumn({newColumn, boardId, title} 
    : {newColumn: boolean, boardId: string | undefined, title: string}) {
    
  const [categorisedTasks, setCategorizedTasks] = useState<Task[]>([]);
  const [isNewColumn, setIsNewColumn] = useState(newColumn);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("low");
  const [columnTitle, setColumnTitle] = useState(title);
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
    
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const {token} = useContext(AuthContext);
  const {tasks, setTasks} = useContext(TaskContext);

  useEffect(() => {
    setCategorizedTasks(tasks.filter((item: Task) => item.task_category == title));
  }, [tasks]);

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (!taskTitle || !taskDescription) {
      console.log("Invalid input");
      return;
    }

    const task = {
      title: taskTitle,
      description: taskDescription,
      category: columnTitle,
      priority: selectedPriority,
      date: "10/10/10"
    };
        
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL_BOARDS}/${boardId}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(task)
      });
      const data = await response.json();
           
      if (response.status == 201) {
        setTasks(data);
        setTaskTitle("");
        setTaskDescription("");
        setSelectedPriority("");
      } else {
        console.log(data.message);
      }
    } catch (err: any) {
      console.log(err);
    }
    dialogRef.current?.close();
  }

  return (
    <>
      <dialog ref={dialogRef} className="task-dialog">
        <form className="task-form" onSubmit={(e) => handleSubmit(e)}>
          <h3>Add Task</h3>
                    
          <input className="form-input" 
            type="text"
            placeholder="Name"
            onChange={(e) => setTaskTitle(e.target.value)}
          />
                    
          <textarea className="form-input"
            placeholder="Description"
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <label htmlFor="priority">Priority: </label>
                    
          <select name="priority" className="priority-dropdown" value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
                    
          <div className="task-btns">
            <button type="submit" className="create-task-btn">Create</button>
            <button type="button" className="close-btn" onClick={(e) => {
              e.preventDefault();
              dialogRef.current?.close();}
            }>
                            Close
            </button>
          </div>
                
        </form>
      </dialog>
            
      <div className="task-column">
        <div className="column-header">
          {isNewColumn ? 
            <div>
              <input className="column-title" type="text" placeholder={title} 
                onChange={(e) => setColumnTitle(e.target.value)}/>
              <button type="button" onClick={() => setIsNewColumn(false)}>Save</button>
            </div>
            : <h1>{columnTitle}</h1>}
                    
          <div className="column-header-btns">
            <button type="button" onClick={() => dialogRef.current?.showModal()}>
              <FaPlus />
            </button>
            {showDeleteBtn && <button><FaTrash/></button>}
            <button type="button" onClick={() => setShowDeleteBtn(prev => !prev)}>
              <FaEllipsisVertical />
            </button>
          </div>
        </div>
                
        {categorisedTasks && categorisedTasks.map((item) =>
          <TaskCard key={item.task_id} 
            boardId={boardId}
            taskId={item.task_id}
            title={item.task_title} 
            description={item.task_description}
            priority={item.task_priority}
          />
        )}
      </div>
    </>
  );
}

export default TaskColumn;