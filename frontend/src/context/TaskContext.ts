import { createContext } from "react";
import type { TaskContextType } from "../types/TaskContextType";
import type { TaskResponse } from "../types/TaskResponse";

const TaskContext = createContext<TaskContextType>({
  tasks: [],
  setTasks: () => {},
  sendTaskCreate: (_task: TaskResponse) => {}
});
export default TaskContext;