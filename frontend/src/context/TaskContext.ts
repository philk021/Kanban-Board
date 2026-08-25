import { createContext } from "react";
import type { TaskContextType } from "../types/TaskContextType";

const TaskContext = createContext<TaskContextType>({
  tasks: [],
  setTasks: () => {}
});
export default TaskContext;