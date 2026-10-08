import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import type { TaskResponse } from "../../../../shared/types/TaskResponse";
import type { CategorizedTasks } from "../../../../shared/types/CategorizedTasks";
import TaskColumn from "../TaskColumn/TaskColumn";
import { fetchTasks } from "../../../../core/http";
import { useBoardSocket } from "../../hooks/useBoardSocket";
import { BoardNav } from "../BoardNav/BoardNav";
import { EditBar } from "../EditBar/EditBar";
import TaskContext from "../../../../shared/context/TaskContext";
import "./Board.css";

export function Board() {
  const { boardId } = useParams();
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [showNewColumnCard, setShowNewColumnCard] = useState(false);

  const { sendTaskCreate } = useBoardSocket({
    boardId: boardId,
    onTaskCreated: (task) => setTasks((prev) => [...prev, task])
  });

  async function getTasks() {
    try {
      const response = await fetchTasks(boardId);
      const data = await response.data;     
      if (response.status == 200) {
        setTasks(data);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

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
      <TaskContext value={{ tasks, setTasks, sendTaskCreate }}>
        <BoardNav/>
        <EditBar/>    
        <div className="board">         
          {Object.entries(categorized).map(([category]) =>
            <TaskColumn 
              key={category} 
              newColumn={false} 
              boardId={boardId} 
              title={category}
            />
          )}
          {showNewColumnCard && (
            <TaskColumn 
              newColumn={true} 
              boardId={boardId} 
              title="Untitled"
            />
          )}         
          <button 
            className="new-column-btn"
            onClick={() => setShowNewColumnCard(prev => !prev)}>
            <FaPlus/>
          </button>
        </div>
      </TaskContext>
    </>
  );
}