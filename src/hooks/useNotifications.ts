// Hook for Notifications System
import type { Notification } from '@/types/socket-types';
import { useCallback, useEffect, useState } from 'react';
import io, { type Socket } from 'socket.io-client';
import { toast } from 'sonner';

const API_URL =
  import.meta.env.VITE_API_URL || 'https://api.floridayachttrader.com/';

export function useNotifications(token: string | null) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const showToast = useCallback((notification: Notification) => {
    const icon =
      notification.type === 'boat:approved'
        ? '✅'
        : notification.type === 'boat:rejected'
          ? '❌'
          : notification.type === 'boat:new'
            ? '🚤'
            : '🔔';

    toast(`${icon} ${notification.title}`, {
      description: notification.message,
      duration: 5000,
    });
  }, []);

  useEffect(() => {
    if (!token) {
      setError('No authentication token provided');
      return;
    }

    // Connect to notification socket with JWT
    const newSocket = io(`${API_URL}/api/queue`, {
      auth: {
        token: token,
      },
      transports: ['websocket', 'polling'],
    });

    // Connection successful
    newSocket.on('success', (data) => {
      console.log('✅ Notification socket connected:', data.data);
      setIsConnected(true);
      setError(null);
    });

    // Connection error
    newSocket.on('error', (err) => {
      console.error('❌ Notification socket error:', err);
      setError(err.message || 'Connection failed');
      setIsConnected(false);
    });

    // Disconnection
    newSocket.on('disconnect', (reason) => {
      console.log('❌ Notification socket disconnected:', reason);
      setIsConnected(false);
    });

    // Listen for boat approval notifications
    newSocket.on('boat:approved', (notification: Notification) => {
      setNotifications((prev) => [notification, ...prev]);
      showToast(notification);
    });

    // Listen for boat rejection notifications
    newSocket.on('boat:rejected', (notification: Notification) => {
      setNotifications((prev) => [notification, ...prev]);
      showToast(notification);
    });

    // Listen for new boat notifications
    newSocket.on('boat:new', (notification: Notification) => {
      setNotifications((prev) => [notification, ...prev]);
      showToast(notification);
    });

    // Listen for any custom notification
    newSocket.on('notification', (notification: Notification) => {
      setNotifications((prev) => [notification, ...prev]);
      showToast(notification);
    });

    setSocket(newSocket);

    return () => {
      newSocket.off('success');
      newSocket.off('error');
      newSocket.off('disconnect');
      newSocket.off('boat:approved');
      newSocket.off('boat:rejected');
      newSocket.off('boat:new');
      newSocket.off('notification');
      newSocket.disconnect();
    };
  }, [token, showToast]);

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.notificationId === notificationId
          ? { ...notif, read: true }
          : notif,
      ),
    );
  }, []);

  const clearNotification = useCallback((notificationId: string) => {
    setNotifications((prev) =>
      prev.filter((notif) => notif.notificationId !== notificationId),
    );
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    socket,
    notifications,
    isConnected,
    error,
    markAsRead,
    clearNotification,
    clearAllNotifications,
  };
}
