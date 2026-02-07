// Hook for Visitor Tracking
import type { VisitorStats } from '@/types/socket-types';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import io, { type Socket } from 'socket.io-client';

const API_URL =
  import.meta.env.VITE_API_URL || 'https://api.floridayachttrader.com/';

export function useVisitorTracking() {
  const [stats, setStats] = useState<VisitorStats>({
    active: 0,
    todayVisitors: 0,
    totalVisitors: 0,
  });
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Connect to visitor tracking socket
    const newSocket = io(API_URL, {
      path: '/ws',
      transports: ['websocket', 'polling'],
    });

    // Connection successful
    newSocket.on('connect', () => {
      console.log('✅ Visitor tracking connected:', newSocket.id);
      setIsConnected(true);
    });

    // Connection error
    newSocket.on('connect_error', (err) => {
      console.error('❌ Visitor tracking connection error:', err);
      setIsConnected(false);
    });

    // Disconnection
    newSocket.on('disconnect', (reason) => {
      console.log('❌ Visitor tracking disconnected:', reason);
      setIsConnected(false);
    });

    setSocket(newSocket);

    // Start tracking this page visit
    newSocket.emit('visit:start', { page: location.pathname });

    // Listen for visitor count updates
    newSocket.on('visitors:count', (data: { active: number }) => {
      setStats((prev) => ({ ...prev, active: data.active }));
    });

    // Listen for detailed stats
    newSocket.on('visitors:stats', (data: VisitorStats) => {
      setStats(data);
    });

    // Cleanup: End session when component unmounts
    return () => {
      newSocket.emit('visit:end');
      newSocket.off('connect');
      newSocket.off('disconnect');
      newSocket.off('connect_error');
      newSocket.off('visitors:count');
      newSocket.off('visitors:stats');
      newSocket.disconnect();
    };
  }, [location.pathname]);

  return { stats, socket, isConnected };
}
