import { useContext, useEffect, useMemo, useState } from "react";
import EditBar from "./EditBar";
import type { Task } from "../../types/Task";
import type { CategorizedTasks } from "../../types/CategorizedTasks";
import AuthContext from "../../context/AuthContext";
import "./styles/board.css";
import TaskColumn from "./TaskColumn";
import { useParams } from "react-router-dom";

function Board() {
    const {boardId} = useParams();
    const [tasks, setTasks] = useState<Task[]>([]);
    const {token} = useContext(AuthContext);

    async function getTasks() {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL_TASKS}/${boardId}`, {
                "headers": {
                    "Authorization": `Bearer ${token}`
                },
            });
            const data = await response.json();
            
            if (response.status == 200) {
                setTasks(data);
            } else {
                console.log(data);
            }
        } catch (err: any) {
            console.log(err);
        }
    }

    useEffect(() => {
        getTasks();
    }, []);

    const categorized = useMemo(() => {
        return tasks.reduce<CategorizedTasks>((groups, item) => {
            const category = item.task_category || "No Category";
            if (!groups[category]) groups[category] = [];
            groups[category].push(item);
            return groups;
        }, {});
    }, [tasks]);

    return (
        <>  
            <EditBar />
            <div className="board">
                {Object.entries(categorized).map(([category, group]) => 
                    <TaskColumn key={category} boardId={boardId} title={category} tasks={group}/>)}
            </div>
        </>
    )
}

export default Board;