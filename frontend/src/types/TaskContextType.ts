import type { Dispatch, SetStateAction } from "react";
import type { TaskResponse } from "./TaskResponse";

export type TaskContextType = {
    tasks: TaskResponse[];
    setTasks: Dispatch<SetStateAction<TaskResponse[]>>;
    sendTaskCreate: (task: TaskResponse) => void;
}