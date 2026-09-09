import { useEffect, useRef, useCallback } from 'react';
import { io, type Socket } from 'socket.io-client';
import type { TaskResponse } from '../types/TaskResponse';

interface UseBoardSocketOptions {
  boardId: string | undefined;
  serverUrl?: string;
  onTaskCreated?: (task: TaskResponse) => void;
}

interface UseBoardSocketResult {
  sendTaskCreate: (task: TaskResponse) => void;
}

export function useBoardSocket({
  boardId,
  serverUrl = 'http://localhost:3000',
  onTaskCreated,
}: UseBoardSocketOptions): UseBoardSocketResult {
  const socketRef = useRef<Socket | null>(null);
  
  const onTaskCreatedRef = useRef(onTaskCreated);

  useEffect(() => {
    onTaskCreatedRef.current = onTaskCreated;
  }, [onTaskCreated]);

  useEffect(() => {
    if (!boardId) return;

    const socket = io(serverUrl, { 
      transports: ['websocket']
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      socket.emit('board:join', boardId);
    });

    socket.on('task:created', (task: TaskResponse) => onTaskCreatedRef.current?.(task));

    return () => {
      socket.emit('board:leave', boardId);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [boardId, serverUrl]);

  const sendTaskCreate = useCallback(
    (task: TaskResponse) => {
      socketRef.current?.emit('task:create', { boardId, task });
    },
    [boardId]
  );

  return { sendTaskCreate };
}