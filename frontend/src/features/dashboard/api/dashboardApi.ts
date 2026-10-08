import axiosClient from "../../../core/axiosClient";
import type { TaskResponse } from "../../../shared/types/TaskResponse";

export async function getTasks(boardId?: string) {
  const response = await axiosClient.get(`/boards/${boardId}`);
  return response;
};

export async function addTask(task: TaskResponse, boardId?: string) {
  const response = await axiosClient.post(`/boards/${boardId}`, task);
  return response;
};

export async function deleteTask(boardId?: string, taskId?: number) {
  const response = await axiosClient.delete(`/boards/${boardId}/tasks/${taskId}`);
  return response;
};

export async function getBoards() {
  const response = await axiosClient.get(`/boards`);
  return response;
};

export async function addBoard(title: string) {
  const response = await axiosClient.post(`/boards`, {
    title,
  });
  return response;
};

export async function deleteBoard(boardId: string | undefined) {
  const response = await axiosClient.delete(`/boards/${boardId}`);
  return response;
};

export async function updateBoard(boardId: string | undefined, title: string) {
  const response = await axiosClient.put(`/boards/${boardId}`, {
    title,
  });
  return response;
};

export async function addUserToBoard(boardId: string | undefined, email: string) {
  const response = await axiosClient.post(`/boards/${boardId}`, {
    email,
  });
  return response;
};