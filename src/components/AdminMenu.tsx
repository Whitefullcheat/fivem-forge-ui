import { useState } from 'react';
import { PlayerManagement } from './admin/PlayerManagement';
import { ItemMenu } from './admin/ItemMenu';
import { BanMenu } from './admin/BanMenu';
import { TrainerMenu } from './admin/TrainerMenu';
import { Sidebar } from './admin/Sidebar';
import { mockPermissions } from '../data/mockData';
import type { Permission } from '../types/admin';

type ActiveTab = 'players' | 'items' | 'bans' | 'trainer';

export function AdminMenu() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('players');
  const [permissions] = useState<Permission>(mockPermissions);

  const renderContent = () => {
    switch (activeTab) {
      case 'players':
        return <PlayerManagement permissions={permissions} />;
      case 'items':
        return permissions.permissions.itemMenu ? 
          <ItemMenu /> : 
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
        return <PlayerManagement permissions={permissions} />;
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