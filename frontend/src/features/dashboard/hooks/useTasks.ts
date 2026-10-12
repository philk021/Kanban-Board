import { useEffect, useState } from "react";
import { getTasks } from "../api/dashboardApi";
import type { CategorizedTasks } from "../../../shared/types/CategorizedTasks";

export function useTasks(boardId?: string) {
  const [tasks, setTasks] = useState<CategorizedTasks[]>([]);
  
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
};