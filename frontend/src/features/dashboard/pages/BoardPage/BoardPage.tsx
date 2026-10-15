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
  const [categoryTitle, setCategoryTitle] = useState('');
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  
  const { tasks, setTasks } = useTasks(boardId);
  const { sendTaskCreate } = useBoardSocket({
    boardId: boardId,
    onTaskCreated: (task) => 
      setTasks((prev) => prev.map((c) =>
        c.category_id === task.category_id ? { ...c, tasks: [...c.tasks, task]} : c
      ))
  });

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const categoryId = crypto.randomUUID();
    const category = {
      category_id: categoryId,
      category_title: categoryTitle,
      board_id: boardId,
    };

    try {
      const response = await addCategory(category);
      const data = await response.data;
      
      if (response.status == 201) {
        setTasks(prev => [...prev, { 
          category_id: categoryId, 
          category_title: categoryTitle, 
          tasks: []
        }]);
        setCategoryTitle('');
        //sendCategoryCreate(task);
        console.log(data);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div className="board-page-wrap">
      <TaskContext value={{ tasks, setTasks, sendTaskCreate }}>
        <BoardNav/>
        <EditBar/>    
        <div className="board-page">
          <div className="board-page-columns">
            {tasks && tasks.map((item) =>
              <TaskColumn
                key={item.category_id} 
                boardId={boardId}
                category={item.category_title}
                categoryId={item.category_id}
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
          </div>
          <dialog ref={dialogRef} className="dialog">
            <form className="task-form" onSubmit={(e) => handleSubmit(e)}>
              <h3>Add column</h3>          
              <input 
                className="form-input" 
                type="text"
                value={categoryTitle}
                onChange={(e) => setCategoryTitle(e.target.value)}
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
    </div>
  );
}