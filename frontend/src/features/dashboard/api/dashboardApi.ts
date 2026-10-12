import axiosClient from "../../../core/axiosClient";
import type { Board } from "../../../shared/types/Board";
import type { Category } from "../../../shared/types/Category";
import type { Task } from "../../../shared/types/Task";

export async function getTasks(boardId?: string) {
  const response = await axiosClient.get(`/boards/${boardId}/tasks`);
  return response;
};

export async function addTask(task: Task, boardId?: string) {
  const response = await axiosClient.post(`/boards/${boardId}/tasks`, task);
  return response;
};

export async function deleteTask(boardId?: string, taskId?: string) {
  const response = await axiosClient.delete(`/boards/${boardId}/tasks/${taskId}`);
  return response;
};

export async function getBoards() {
  const response = await axiosClient.get(`/boards`);
  return response;
};

export async function addBoard(board: Board) {
  const response = await axiosClient.post(`/boards`, board);
  return response;
};

export async function deleteBoard(boardId?: string) {
  const response = await axiosClient.delete(`/boards/${boardId}`);
  return response;
};

export async function updateBoard(title: string, boardId?: string) {
  const response = await axiosClient.put(`/boards/${boardId}`, {
    title,
  });
  return response;
};

export async function addUserToBoard(email: string, boardId?: string) {
  const response = await axiosClient.post(`/boards/${boardId}`, {
    email,
  });
  return response;
};

export async function addCategory(category: Category) {
  const response = await axiosClient.post(`boards/${category.board_id}/categories`, category);
  return response;
}