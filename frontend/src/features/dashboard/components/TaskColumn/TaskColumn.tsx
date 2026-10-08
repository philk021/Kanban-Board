import { useContext, useEffect, useRef, useState } from "react";
import type { TaskResponse } from "../../../../shared/types/TaskResponse";
import { FaPlus, FaEllipsisVertical, FaTrash } from "react-icons/fa6";
import { addTask } from "../../../../core/http";
import { TaskCard } from "../TaskCard/TaskCard";
import "./TaskColumn.css";
import TaskContext from "../../../../shared/context/TaskContext";

function TaskColumn({ newColumn, boardId, title } : 
  { newColumn: boolean, boardId: string | undefined, title: string }) { 
  const [categorisedTasks, setCategorizedTasks] = useState<TaskResponse[]>([]);
  const [isNewColumn, setIsNewColumn] = useState(newColumn);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("low");
  const [columnTitle, setColumnTitle] = useState(title);
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
    
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const {tasks, setTasks, sendTaskCreate} = useContext(TaskContext);

  useEffect(() => {
    setCategorizedTasks(tasks.filter((item: TaskResponse) => item.task_category == title));
  }, [tasks]);

  const updateTask = () => {

  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!taskTitle || !taskDescription) {
      console.log("Invalid input");
      return;
    }
    const task = {
      task_title: taskTitle,
      task_description: taskDescription,
      task_category: columnTitle,
      task_priority: selectedPriority,
      task_date: new Date().toLocaleString(),
      board_id: Number(boardId)
    };    
    try {
      const response = await addTask(boardId, task);
      const data = await response.data;    
      if (response.status == 201) {
        setTasks(data);
        setTaskTitle("");
        setTaskDescription("");
        setSelectedPriority("");
        sendTaskCreate(task);
      }
    } catch (err: any) {
      console.log(err);
    }
    dialogRef.current?.close();
  }

  return (
    <>
      <dialog ref={dialogRef} className="dialog">
        <form className="task-form" onSubmit={(e) => handleSubmit(e)}>
          <h3>Add task</h3>            
          <input 
            className="form-input" 
            type="text"
            placeholder="Name"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <textarea 
            className="form-input"
            placeholder="Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <label htmlFor="priority">Priority: </label>               
          <select 
            name="priority" 
            className="priority-dropdown" 
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
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
              Create
            </button>
            <button 
              type="button" 
              className="close-btn" 
              onClick={(e) => {
                e.preventDefault();
                dialogRef.current?.close();}
              }
            >
              Close
            </button>
          </div>          
        </form>
      </dialog>    
      <div className="task-column-wrap">
        <div className="task-column-header">
          {isNewColumn ? (
            <div>
              <input 
                className="task-column-title"
                type="text" 
                placeholder={title} 
                onChange={(e) => setColumnTitle(e.target.value)}
              />
              <button 
                type="button" 
                onClick={() => setIsNewColumn(false)}
              >
                Save
              </button>
            </div>
          ) : (
            <h1 className="task-column-title">{columnTitle}</h1>
          )}           
          <div className="task-column-header-btns">
            <button 
              type="button" 
              onClick={() => dialogRef.current?.showModal()}
            >
              <FaPlus />
            </button>
            {showDeleteBtn && (<button><FaTrash/></button>)}
            <button 
              type="button" 
              onClick={() => setShowDeleteBtn(prev => !prev)}
            >
              <FaEllipsisVertical />
            </button>
          </div>
        </div>
        <div className="task-column-tasks">
          {categorisedTasks && (
            categorisedTasks.map((item) =>
              <TaskCard 
                key={item.task_id} 
                boardId={boardId}
                taskId={item.task_id}
                title={item.task_title} 
                description={item.task_description}
                priority={item.task_priority}
                date={item.task_date}
              />
            )
          )}
        </div>
      </div>
    </>
  );
}

export default TaskColumn;