import type { Player, Permission, PlayerAction, BanDuration, TrainerTool } from '../types/admin';

export const mockPlayers: Player[] = [
  {
    id: 1,
    steamName: 'SteamUser123',
    rpName: 'John Davis',
    group: 'citizen',
    steamId: 'steam:110000103fa6789',
    license: 'license:4b3c2a1e9f8d7c6b5a4e3d2c1b0a9f8e',
    ping: 45,
    isOnline: true,
  },
  {
    id: 2,
    steamName: 'GamerTag456',
    rpName: 'Sarah Johnson',
    group: 'police',
    steamId: 'steam:110000104fa6789',
    license: 'license:5c4d3b2f0e9d8c7b6a5f4e3d2c1b0a9f',
    ping: 32,
    isOnline: true,
  },
  {
    id: 3,
    steamName: 'PlayerName789',
    rpName: 'Mike Wilson',
    group: 'admin',
    steamId: 'steam:110000105fa6789',
    license: 'license:6d5e4c3g1f0e9d8c7b6a5f4e3d2c1b0a',
    ping: 28,
    isOnline: false,
  },
];

export const mockPermissions: Permission = {
  rank: 'admin',
  permissions: {
    player: true,
    itemMenu: true,
    ban: true,
    trainer: true,
  },
};

export const playerActions: PlayerAction[] = [
  { id: 'revive', label: 'Revive', icon: 'Heart', variant: 'success' },
  { id: 'heal', label: 'Heal', icon: 'Plus', variant: 'success' },
  { id: 'bring', label: 'Bring', icon: 'ArrowUp', variant: 'default' },
  { id: 'goto', label: 'Go To', icon: 'ArrowDown', variant: 'default' },
  { id: 'spectate', label: 'Spectate', icon: 'Eye', variant: 'default' },
  { id: 'freeze', label: 'Freeze', icon: 'Snowflake', variant: 'warning' },
  { id: 'kick', label: 'Kick', icon: 'UserX', variant: 'destructive' },
  { id: 'ban', label: 'Ban', icon: 'Ban', variant: 'destructive' },
];

export const banDurations: BanDuration[] = [
  { label: '1 Hour', value: 60 },
  { label: '6 Hours', value: 360 },
  { label: '1 Day', value: 1440 },
  { label: '3 Days', value: 4320 },
  { label: '1 Week', value: 10080 },
  { label: '1 Month', value: 43200 },
  { label: 'Permanent', value: -1 },
];

export const trainerTools: TrainerTool[] = [
  {
    id: 'noclip',
    label: 'Noclip',
    description: 'Fly through objects',
    enabled: false,
  },
  {
    id: 'invisibility',
    label: 'Invisibility',
    description: 'Become invisible to players',
    enabled: false,
  },
  {
    id: 'godmode',
    label: 'God Mode',
    description: 'Take no damage',
    enabled: false,
  },
  {
    id: 'showNames',
    label: 'Show Names',
    description: 'Display player names above heads',
    enabled: true,
  },
  {
    id: 'playerBlips',
    label: 'Player Blips',
    description: 'Show all players on map',
    enabled: false,
  },
  {
    id: 'staffTag',
    label: 'Staff Tag',
    description: 'Display staff tag above head',
    enabled: true,
  },
];