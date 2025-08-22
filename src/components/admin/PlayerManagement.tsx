import { useState } from 'react';
import { Search, MoreHorizontal } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { mockPlayers, playerActions } from '../../data/mockData';
import type { Permission, Player } from '../../types/admin';

interface PlayerManagementProps {
  permissions: Permission;
}

export function PlayerManagement({ permissions }: PlayerManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [players] = useState<Player[]>(mockPlayers);

  const filteredPlayers = players.filter(
    (player) =>
      player.rpName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.steamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.id.toString().includes(searchTerm)
  );

  const handlePlayerAction = (playerId: number, actionId: string) => {
    console.log(`Admin action: ${actionId} on player ${playerId}`);
    // Here you would send NUI callback to FiveM
  };

  const getGroupBadgeVariant = (group: string) => {
    switch (group) {
      case 'admin':
        return 'default';
      case 'police':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Player Management</h2>
        <p className="text-muted-foreground">
          Manage online players and perform administrative actions
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Online Players ({filteredPlayers.length})
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredPlayers.map((player) => (
              <Card key={player.id} className="bg-secondary/30 border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            player.isOnline ? 'bg-success' : 'bg-destructive'
                          }`}
                        />
                        <span className="font-medium">#{player.id}</span>
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">
                          {player.rpName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {player.steamName}
                        </div>
                      </div>
                      <Badge variant={getGroupBadgeVariant(player.group)}>
                        {player.group}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        Ping: {player.ping}ms
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        {playerActions.map((action) => (
                          <DropdownMenuItem
                            key={action.id}
                            onClick={() => handlePlayerAction(player.id, action.id)}
                            className={`cursor-pointer ${
                              action.variant === 'destructive' 
                                ? 'text-destructive focus:text-destructive' 
                                : action.variant === 'success'
                                ? 'text-success focus:text-success'
                                : action.variant === 'warning'
                                ? 'text-warning focus:text-warning'
                                : ''
                            }`}
                          >
                            {action.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="mt-3 text-xs text-muted-foreground space-y-1">
                    <div>Steam ID: {player.steamId}</div>
                    <div>License: {player.license}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}