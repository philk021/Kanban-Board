import { useEffect, useState } from "react";
import { getTasks } from "../api/dashboardApi";
import type { Task } from "../../../shared/types/Task";

export function useTasks(boardId?: string) {
  const [tasks, setTasks] = useState<Task[]>([]);
  
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