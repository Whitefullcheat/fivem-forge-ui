export interface Player {
  id: number;
  steamName: string;
  rpName: string;
  group: string;
  steamId: string;
  license: string;
  ping: number;
  isOnline: boolean;
}

export interface Permission {
  rank: 'helper' | 'mod' | 'admin' | 'superadmin';
  permissions: {
    player: boolean;
    itemMenu: boolean;
    ban: boolean;
    trainer: boolean;
  };
}

export interface PlayerAction {
  id: string;
  label: string;
  icon: string;
  variant: 'default' | 'success' | 'warning' | 'destructive';
  permission?: string;
}

export interface BanDuration {
  label: string;
  value: number; // minutes, -1 for permanent
}

export interface TrainerTool {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}