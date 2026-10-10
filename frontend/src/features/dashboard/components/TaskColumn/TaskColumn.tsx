import { useContext, useEffect, useRef, useState } from "react";
import type { Task } from "../../../../shared/types/Task";
import { FaPlus, FaEllipsisVertical } from "react-icons/fa6";
import { TaskCard } from "../TaskCard/TaskCard";
import TaskContext from "../../context/TaskContext";
import { addTask } from "../../api/dashboardApi";
import "./TaskColumn.css";

export interface TaskChanges {
  task_title?: string,
  task_description?: string,
  task_priority?: string,
}

function TaskColumn({ boardId, title }: { boardId?: string, title: string }) {
  const [categorisedTasks, setCategorizedTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("low");
  const { tasks, setTasks, sendTaskCreate } = useContext(TaskContext);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    setCategorizedTasks(tasks.filter((item: Task) => item.task_category == title));
  }, [tasks]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!taskTitle || !taskDescription) {
      return;
    }
    const task = {
      task_id: crypto.randomUUID(),
      task_title: taskTitle,
      task_description: taskDescription,
      task_category: title,
      task_priority: selectedPriority,
      task_date: new Date().toLocaleString(),
    };
    try {
      const response = await addTask(task, boardId);
      const data = await response.data;    
      if (response.status == 201) {
        setTasks(data);
        setTaskTitle('');
        setTaskDescription('');
        setSelectedPriority('');
        sendTaskCreate(task);
      }
    } catch (err: any) {
      console.log(err);
    }
    dialogRef.current?.close();
  };

  const onUpdate = (changes: TaskChanges, id?: string) => {
    setTasks(prev => prev.filter((item) => 
      item.task_id === id ? { ...item, ...changes} : item));
  };

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
          <h1 className="task-column-title">{title}</h1>        
          <div className="task-column-header-btns">
            <button 
              type="button" 
              onClick={() => dialogRef.current?.showModal()}
            >
              <FaPlus />
            </button>
            <button 
              type="button" 
              onClick={() => true}
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
                task={item}
                onUpdate={onUpdate}
              />
            )
          )}
        </div>
      </div>
    </>
  );
}

export default TaskColumn;