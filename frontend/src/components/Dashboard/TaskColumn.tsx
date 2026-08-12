import type { Task } from "../../types/Task";
import "./styles/taskcolumn.css";
import TaskCard from "./TaskCard";
import { FaPlus, FaEllipsisVertical } from "react-icons/fa6";

function TaskColumn({title, tasks} : {title: string, tasks: Task[]}) {
    return (

        <div className="task-column">
            <div className="column-header">
                <h1>{title}</h1>
                <div className="column-header-btns">
                    <button><FaPlus /></button>
                    <button><FaEllipsisVertical /></button>
                </div>
            </div>
            {tasks && tasks.map((item) => 
                <TaskCard key={item.task_id} 
                    title={item.task_title} 
                    description={item.task_description}
                    priority={item.task_priority}
                />
            )}
        </div>
    )
}

export default TaskColumn;