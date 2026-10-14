export const groupByCategory = (categories, tasks) => {
  const tasksByCategory = new Map();
  for (const t of tasks) {
    if (!tasksByCategory.has(t.category_id)) tasksByCategory.set(t.category_id, []);
    tasksByCategory.get(t.category_id).push({ 
      task_id: t.task_id, 
      task_title: t.task_title,
      task_description: t.task_description,
      task_priority: t.task_priority,
      task_category: t.task_category,
      category_id: t.category_id,
      created_at: t.created_at,
    });
  }
  const groupedTasks = categories.map(c => ({
    category_id: c.category_id,
    category_title: c.category_title,
    tasks: tasksByCategory.get(c.category_id) ?? [],
  }));
  return groupedTasks;
};