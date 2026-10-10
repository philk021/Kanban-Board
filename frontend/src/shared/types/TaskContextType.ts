import type { Dispatch, SetStateAction } from "react";
import type { Task } from "./Task";

export type TaskContextType = {
    tasks: Task[];
    setTasks: Dispatch<SetStateAction<Task[]>>;
    sendTaskCreate: (task: Task) => void;
}