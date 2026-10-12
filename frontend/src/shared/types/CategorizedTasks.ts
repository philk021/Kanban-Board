import type { Task } from "./Task";

export type CategorizedTasks = {
  category_id: string,
  category_title: string,
  tasks: Task[],
};