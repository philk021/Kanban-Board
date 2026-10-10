import { useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import type { CategorizedTasks } from "../../../../shared/types/CategorizedTasks";
import TaskColumn from "../../components/TaskColumn/TaskColumn";
import { useBoardSocket } from "../../hooks/useBoardSocket";
import { BoardNav } from "../../components/BoardNav/BoardNav";
import { EditBar } from "../../components/EditBar/EditBar";
import TaskContext from "../../context/TaskContext";
import { useTasks } from "../../hooks/useTasks";
import "./BoardPage.css";
import { FaPlus } from "react-icons/fa6";

export function BoardPage() {
  const { boardId } = useParams();
  const { tasks, setTasks } = useTasks(boardId);
  const [newColumn, setNewColumn] = useState('');
  const dialogRef = useRef<HTMLDialogElement | null>(null)
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

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    
  }

  return (
    <>
      <TaskContext value={{ tasks, setTasks, sendTaskCreate }}>
        <BoardNav/>
        <EditBar/>    
        <div className="board-page">        
          {Object.entries(categorized).map(([category]) =>
            <TaskColumn
              key={category} 
              boardId={boardId}
              title={category}
            />
          )}
          <button
            className="plus-btn"
            type="button" 
            onClick={() => dialogRef.current?.showModal()}
          >
            <FaPlus />
          </button>
          <dialog ref={dialogRef} className="dialog">
            <form className="task-form" onSubmit={(e) => handleSubmit(e)}>
              <h3>Add column</h3>          
              <input 
                className="form-input" 
                type="text"
                value={newColumn}
                onChange={(e) => setNewColumn(e.target.value)}
              />      
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
        </div>
      </TaskContext>
    </>
  );
}