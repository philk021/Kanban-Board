import axiosClient from "../../../core/axiosClient";
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

export async function addBoard(title: string) {
  const response = await axiosClient.post(`/boards`, {
    title,
  });
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