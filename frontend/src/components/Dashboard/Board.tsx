import { useContext, useEffect, useMemo, useState } from "react";
import EditBar from "./EditBar";
import type { Task } from "../../types/Task";
import type { CategorizedTasks } from "../../types/CategorizedTasks";
import AuthContext from "../../context/AuthContext";
import "./styles/board.css";
import TaskColumn from "./TaskColumn";
import { useParams } from "react-router-dom";
import BoardsNav from "./BoardsNav";
import { FaPlus } from "react-icons/fa6";
import TaskContext from "../../context/TaskContext";

function Board() {
    const {boardId} = useParams();
    const [tasks, setTasks] = useState<Task[]>([]);
    const {token} = useContext(AuthContext);
    const [showNewColumnCard, setShowNewColumnCard] = useState(false);

    async function getTasks() {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL_BOARDS}/${boardId}`, {
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
            <TaskContext value={{tasks, setTasks}}>
                <BoardsNav/>
                <EditBar/>    
                <div className="board">         
                    {Object.entries(categorized).map(([category]) =>
                        <TaskColumn key={category} newColumn={false} boardId={boardId} title={category}/>
                    )}

                    {showNewColumnCard && <TaskColumn newColumn={true} boardId={boardId} title="Untitled"/>}         

                    <button className="new-column-card" type="button" 
                            onClick={() => setShowNewColumnCard(prev => !prev)}>
                        <div className="new-column-btn">
                            <FaPlus/>
                            <h1>New Category</h1>
                        </div>
                    </button>
                </div>
            </TaskContext>
        </>
    )
}

export default Board;