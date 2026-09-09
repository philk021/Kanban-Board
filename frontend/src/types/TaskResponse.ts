export type TaskResponse = {
    task_id?: number | undefined,
    task_title: string,
    task_description: string,
    task_date: string,
    task_category: string,
    task_priority: string,
    board_id: number
}