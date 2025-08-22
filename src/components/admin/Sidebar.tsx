import { Users, Package, Ban, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import type { Permission } from '../../types/admin';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: 'players' | 'items' | 'bans' | 'trainer') => void;
  permissions: Permission;
}

export function Sidebar({ activeTab, onTabChange, permissions }: SidebarProps) {
  const tabs = [
    {
      id: 'players' as const,
      label: 'Players',
      icon: Users,
      enabled: permissions.permissions.player,
    },
    {
      id: 'items' as const,
      label: 'Items',
      icon: Package,
      enabled: permissions.permissions.itemMenu,
    },
    {
      id: 'bans' as const,
      label: 'Bans',
      icon: Ban,
      enabled: permissions.permissions.ban,
    },
    {
      id: 'trainer' as const,
      label: 'Trainer',
      icon: Settings,
      enabled: permissions.permissions.trainer,
    },
  ];

  return (
    <div className="w-64 bg-card border-r border-border h-full flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          FiveM Admin
        </h1>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="secondary" className="text-xs">
            {permissions.rank.toUpperCase()}
          </Badge>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <Button
              key={tab.id}
              variant={isActive ? 'gaming' : 'ghost'}
              className={`w-full justify-start gap-3 h-12 ${
                !tab.enabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={() => tab.enabled && onTabChange(tab.id)}
              disabled={!tab.enabled}
            >
              <Icon className="h-5 w-5" />
              {tab.label}
            </Button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="text-xs text-muted-foreground text-center">
          Press F2 to close menu
        </div>
      </div>
    </div>
  );
}