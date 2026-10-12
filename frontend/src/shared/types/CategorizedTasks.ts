import type { Task } from "./Task";

export type CategorizedTasks = {
  category: string,
  tasks: Task[],
};