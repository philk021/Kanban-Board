export type Task = {
    task_id?: string,
    task_title: string,
    task_description: string,
    created_at: string,
    task_category: string,
    task_priority: string,
    board_id?: string,
}