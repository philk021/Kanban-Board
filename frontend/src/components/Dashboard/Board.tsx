import { useContext, useEffect, useMemo, useState } from "react";
import EditBar from "./EditBar";
import type { Task } from "../../types/Task";
import type { CategorizedTasks } from "../../types/CategorizedTasks";
import AuthContext from "../../context/AuthContext";
import "./styles/board.css";
import TaskColumn from "./TaskColumn";
import { useParams } from "react-router-dom";
import BoardsNav from "./BoardsNav";
import DashboardContext from "../../context/DashboardContext";
import { FaPlus } from "react-icons/fa6";

function Board() {
    const {boardId} = useParams();
    const [boardTitle, setBoardTitle] = useState("");
    const [tasks, setTasks] = useState<Task[]>([]);
    const {token} = useContext(AuthContext);
    const {boards} = useContext(DashboardContext);
    const [showNewColumnCard, setShowNewColumnCard] = useState(false);

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

    function getBoardTitle() {
        const title = boards.find((item) => item.board_id == boardId)?.board_title;
        if (title) {
            setBoardTitle(title);
        } else {
            setBoardTitle("Untitled");
        }
    }

    useEffect(() => {
        getBoardTitle();
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
        <div className="board-container">
            <BoardsNav title={boardTitle}/>
            <EditBar /> 
            <div className="board">
                {Object.entries(categorized).map(([category, group]) => 
                    <TaskColumn key={category} newColumn={false} boardId={boardId} title={category} tasks={group}/>
                )}
                {showNewColumnCard && <TaskColumn newColumn={true} boardId={boardId} title="Untitled" tasks={[]}/>}
                <button className="new-column-card" type="button" 
                        onClick={() => setShowNewColumnCard(prev => !prev)}>
                    <div className="new-column-btn">
                        <FaPlus/>
                        <h1>New Category</h1>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default Board;