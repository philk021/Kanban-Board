import type { Dispatch, SetStateAction } from "react";
import type { Task } from "./Task";
import type { CategorizedTasks } from "./CategorizedTasks";

export type TaskContextType = {
    tasks: CategorizedTasks[];
    setTasks: Dispatch<SetStateAction<CategorizedTasks[]>>;
    sendTaskCreate: (task: Task) => void;
};