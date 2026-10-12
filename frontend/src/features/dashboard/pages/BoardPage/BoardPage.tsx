import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import TaskColumn from "../../components/TaskColumn/TaskColumn";
import { useBoardSocket } from "../../hooks/useBoardSocket";
import { BoardNav } from "../../components/BoardNav/BoardNav";
import { EditBar } from "../../components/EditBar/EditBar";
import TaskContext from "../../context/TaskContext";
import { useTasks } from "../../hooks/useTasks";
import "./BoardPage.css";
import { FaPlus } from "react-icons/fa6";
import { addCategory } from "../../api/dashboardApi";

export function BoardPage() {
  const { boardId } = useParams();
  const [newCategory, setNewCategory] = useState('');
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  
  const { tasks, setTasks } = useTasks(boardId);
  const { sendTaskCreate } = useBoardSocket({
    boardId: boardId,
    onTaskCreated: (task) => setTasks((prev) => prev.map((item) => {
        if (item.category === task.task_category) item.tasks.push(task);
        return item;
      }
    ))
  });

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const category = {
      category_id: crypto.randomUUID(),
      category_title: newCategory,
      board_id: boardId,
    };

    try {
      const response = await addCategory(category);
      const data = await response.data;
      
      if (response.status == 201) {
        setTasks(prev => [...prev, { category: newCategory, tasks: []}]);
        setNewCategory('');
        //sendCategoryCreate(task);
        console.log(data);
      }
      } catch (err: any) {
        console.log(err);
      }
  };

  return (
    <>
      <TaskContext value={{ tasks, setTasks, sendTaskCreate }}>
        <BoardNav/>
        <EditBar/>    
        <div className="board-page">        
          {tasks && tasks.map((item) =>
            <TaskColumn
              key={item.category} 
              boardId={boardId}
              category={item.category}
              tasks={item.tasks}
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
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
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