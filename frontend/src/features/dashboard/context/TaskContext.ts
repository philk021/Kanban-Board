import { createContext } from "react";
import type { TaskContextType } from "../../../shared/types/TaskContextType";
import type { Task } from "../../../shared/types/Task";

const TaskContext = createContext<TaskContextType>({
  tasks: [],
  setTasks: () => {},
  sendTaskCreate: (_task: Task) => {}
});
export default TaskContext;