import { useState, useEffect } from 'react';
import { PlayerManagement } from './admin/PlayerManagement';
import { ItemMenu } from './admin/ItemMenu';
import { BanMenu } from './admin/BanMenu';
import { TrainerMenu } from './admin/TrainerMenu';
import { Sidebar } from './admin/Sidebar';
import { useNUIData } from '../hooks/useNUIData';
import { closeNUI } from '../utils/nui';
import type { Permission } from '../types/admin';

type ActiveTab = 'players' | 'items' | 'bans' | 'trainer';

export function AdminMenu() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('players');
  const { players, permissions, items, loading } = useNUIData();

  // Handle ESC key to close menu
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeNUI();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (loading || !permissions) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'players':
        return <PlayerManagement permissions={permissions} players={players} />;
      case 'items':
        return permissions.permissions.itemMenu ? 
          <ItemMenu items={items} /> : 
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Access Denied - Insufficient Permissions
          </div>;
      case 'bans':
        return permissions.permissions.ban ? 
          <BanMenu /> : 
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Access Denied - Insufficient Permissions
          </div>;
      case 'trainer':
        return permissions.permissions.trainer ? 
          <TrainerMenu /> : 
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Access Denied - Insufficient Permissions
          </div>;
      default:
        return <PlayerManagement permissions={permissions} players={players} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        <Sidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          permissions={permissions}
        />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}