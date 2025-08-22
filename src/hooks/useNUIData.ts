import { useEffect, useState } from 'react';
import { addNUIEventListener, requestPlayerData, requestPermissions, requestItems } from '../utils/nui';
import type { Player, Permission } from '../types/admin';

export function useNUIData() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [permissions, setPermissions] = useState<Permission | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Request initial data
    requestPlayerData();
    requestPermissions();
    requestItems();

    // Set up event listeners
    const cleanupPlayers = addNUIEventListener('updatePlayers', (data: Player[]) => {
      setPlayers(data);
      setLoading(false);
    });

    const cleanupPermissions = addNUIEventListener('updatePermissions', (data: Permission) => {
      setPermissions(data);
    });

    const cleanupItems = addNUIEventListener('updateItems', (data: any[]) => {
      setItems(data);
    });

    // Handle ESC key to close
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        // Close NUI handled in parent component
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cleanupPlayers();
      cleanupPermissions();
      cleanupItems();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return { players, permissions, items, loading };
}