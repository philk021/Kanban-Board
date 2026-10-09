import { createContext } from "react";
import type { TaskContextType } from "../../../shared/types/TaskContextType";
import type { TaskResponse } from "../../../shared/types/TaskResponse";

const TaskContext = createContext<TaskContextType>({
  tasks: [],
  setTasks: () => {},
  sendTaskCreate: (_task: TaskResponse) => {}
});
export default TaskContext;