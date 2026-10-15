import { useContext, useRef, useState } from "react";
import { FaPlus, FaEllipsisVertical } from "react-icons/fa6";
import { TaskCard } from "../TaskCard/TaskCard";
import TaskContext from "../../context/TaskContext";
import { addTask } from "../../api/dashboardApi";
import "./TaskColumn.css";
import type { Task } from "../../../../shared/types/Task";

export interface TaskChanges {
  task_title?: string,
  task_description?: string,
  task_priority?: string,
  task_category?: string,
};

function TaskColumn({ boardId, category, tasks, categoryId }: 
  { boardId?: string, category: string, tasks: Task[], categoryId: string }) {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('low');
  const { setTasks, sendTaskCreate } = useContext(TaskContext);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!taskTitle || !taskDescription || !selectedPriority) return;
    
    const task = {
      task_id: crypto.randomUUID(),
      task_title: taskTitle,
      task_description: taskDescription,
      task_category: category,
      category_id: categoryId,
      task_priority: selectedPriority,
      created_at: new Date().toLocaleString(),
    };
    
    try {
      const response = await addTask(task, boardId);
      const data = await response.data;
      console.log(data);    
      
      if (response.status == 201) {
        setTasks((prev) => prev.map((c) =>
          c.category_id === categoryId ? { ...c, tasks: [...c.tasks, task]} : c
        ));
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

  const handleUpdate = (changes: TaskChanges, id?: string) => {
    setTasks(prev =>  
     prev.map(c =>
      c.category_id === categoryId
        ? { ...c, tasks: c.tasks.map(t => (t.task_id === id ? { ...t, ...changes } : t)) }
        : c
    ))};

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
        <div className="task-column">
          <div className="task-column-header">
            <h1 className="task-column-title">{category}</h1>        
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
            {tasks && (
              tasks.map((item) =>
                <TaskCard
                  key={item.task_id}
                  boardId={boardId} 
                  task={item}
                  onUpdate={handleUpdate}
                />
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskColumn;