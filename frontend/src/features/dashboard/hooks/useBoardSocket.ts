import { useEffect, useRef, useCallback, useContext } from 'react';
import { io, type Socket } from 'socket.io-client';
import AuthContext from '../../../shared/context/AuthContext';
import type { Task } from '../../../shared/types/Task';

interface UseBoardSocketOptions {
  boardId: string | undefined;
  serverUrl?: string;
  onTaskCreated?: (task: Task) => void;
}

interface UseBoardSocketResult {
  sendTaskCreate: (task: Task) => void;
}

export function useBoardSocket({
  boardId,
  serverUrl = 'http://localhost:3000',
  onTaskCreated,
}: UseBoardSocketOptions): UseBoardSocketResult {
  const socketRef = useRef<Socket | null>(null);
  const {token} = useContext(AuthContext);
  const onTaskCreatedRef = useRef(onTaskCreated);

  useEffect(() => {
    onTaskCreatedRef.current = onTaskCreated;
  }, [onTaskCreated]);

  useEffect(() => {
    if (!boardId) return;

    const socket = io(serverUrl, {
      auth: {
        token: token,
      }
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      socket.emit('board:join', boardId);
    });

    socket.on('task:created', (task: Task) => onTaskCreatedRef.current?.(task));

    return () => {
      socket.emit('board:leave', boardId);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [boardId, serverUrl]);

  const sendTaskCreate = useCallback(
    (task: Task) => {
      socketRef.current?.emit('task:create', { boardId, task });
    },
    [boardId]
  );

  return { sendTaskCreate };
}