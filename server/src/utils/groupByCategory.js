export const groupByCategory = (categories, tasks) => {
  const tasksByCategory = new Map();
  for (const t of tasks) {
    if (!tasksByCategory.has(t.category_id)) tasksByCategory.set(t.category_id, []);
    tasksByCategory.get(t.category_id).push({ task_id: t.task_id, task_title: t.task_title });
  }
  const groupedTasks = categories.map(c => ({
    category_id: c.category_id,
    category_title: c.category_title,
    tasks: tasksByCategory.get(c.id) ?? [],
  }));
  return groupedTasks;
};