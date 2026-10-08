import { useEffect, useState } from "react";
import type { TaskResponse } from "../../../shared/types/TaskResponse";
import { getTasks } from "../api/dashboardApi";

export function useTasks(boardId?: string) {
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await getTasks(boardId);
      const data = await response.data;     
      if (response.status == 200) {
        setTasks(data);
      }
    }
    fetchTasks();
  }, [boardId]);
  
  return { tasks, setTasks };
}