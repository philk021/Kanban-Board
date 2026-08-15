import { useContext, useRef, useState } from "react";
import type { Task } from "../../types/Task";
import "./styles/taskcolumn.css";
import TaskCard from "./TaskCard";
import { FaPlus, FaEllipsisVertical } from "react-icons/fa6";
import AuthContext from "../../context/AuthContext";
import BoardsNav from "./BoardsNav";
import EditBar from "./EditBar";

function TaskColumn({boardId, title, tasks} 
    : {boardId: string | undefined, title: string, tasks: Task[]}) {
    const [columnTasks, setColumnTasks] = useState<Task[]>(tasks);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [selectedPriority, setSelectedPriority] = useState("low");
    
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const {token} = useContext(AuthContext);

    async function handleSubmit(e: any) {
        e.preventDefault();

        if (!taskTitle || !taskDescription) {
            console.log("Invalid input");
            return
        }

        const task = {
            boardId: boardId,
            taskTitle: taskTitle,
            taskDescription: taskDescription,
            taskCategory: title,
            taskPriority: selectedPriority,
            taskDate: "10/10/10"
        }
        
        try {
            const response = await fetch(import.meta.env.VITE_API_URL_TASKS_NEW, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(task)
            });
            const data = await response.json();
           
            if (response.status == 201) {
                setColumnTasks(data);
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
                            dialogRef.current?.close()}
                            }>
                            Close
                        </button>
                    </div>
                </form>
            </dialog>
            <div className="task-column">
                <div className="column-header">
                    <h1>{title}</h1>
                    <div className="column-header-btns">
                        <button onClick={() => dialogRef.current?.showModal()} ><FaPlus /></button>
                        <button><FaEllipsisVertical /></button>
                    </div>
                </div>
                {columnTasks && columnTasks.map((item) => 
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
    )
}

export default TaskColumn;