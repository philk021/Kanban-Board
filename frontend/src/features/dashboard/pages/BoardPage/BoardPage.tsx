import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import type { CategorizedTasks } from "../../../../shared/types/CategorizedTasks";
import TaskColumn from "../../components/TaskColumn/TaskColumn";
import { useBoardSocket } from "../../hooks/useBoardSocket";
import { BoardNav } from "../../components/BoardNav/BoardNav";
import { EditBar } from "../../components/EditBar/EditBar";
import TaskContext from "../../context/TaskContext";
import { useTasks } from "../../hooks/useTasks";
import "./BoardPage.css";

export function BoardPage() {
  const { boardId } = useParams();
  const [showNewColumnCard, setShowNewColumnCard] = useState(false);
  const { tasks, setTasks } = useTasks(boardId);
  const { sendTaskCreate } = useBoardSocket({
    boardId: boardId,
    onTaskCreated: (task) => setTasks((prev) => [...prev, task])
  });

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