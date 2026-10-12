export const groupByCategory = (items) => {
  Object.entries(Object.groupBy(items, (item) => item.task_category)).map(
    ([category, items]) => ({ category, items })
  );
};