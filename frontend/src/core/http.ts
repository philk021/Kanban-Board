import type { TaskResponse } from "../types/TaskResponse";
import axiosClient from "./axiosClient";

export async function fetchTasks(boardId: string | undefined) {
  const response = await axiosClient.get(`/boards/${boardId}`);
  return response;
};

export async function addTask(boardId: string | undefined, task: TaskResponse) {
  const response = await axiosClient.post(`/boards/${boardId}`, task);
  return response;
};

export async function deleteTask(boardId: string | undefined, taskId: number | undefined) {
  const response = await axiosClient.delete(`/boards/${boardId}/tasks/${taskId}`);
  return response;
};

export async function fetchBoards() {
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