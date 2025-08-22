import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { banDurations } from '../../data/mockData';

export function BanMenu() {
  const [playerId, setPlayerId] = useState('');
  const [duration, setDuration] = useState<string>('');
  const [reason, setReason] = useState('');

  const handleKick = () => {
    if (!playerId || !reason) return;
    console.log(`Kick player ${playerId} for: ${reason}`);
    // NUI callback to FiveM
  };

  const handleBan = () => {
    if (!playerId || !duration || !reason) return;
    console.log(`Ban player ${playerId} for ${duration} minutes. Reason: ${reason}`);
    // NUI callback to FiveM
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Ban & Kick Management</h2>
        <p className="text-muted-foreground">
          Kick or ban players from the server
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Kick Player</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Player ID</label>
              <Input
                type="number"
                placeholder="Enter Player ID"
                value={playerId}
                onChange={(e) => setPlayerId(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Reason</label>
              <Textarea
                placeholder="Enter kick reason..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
              />
            </div>
            <Button 
              variant="warning" 
              className="w-full"
              onClick={handleKick}
              disabled={!playerId || !reason}
            >
              Kick Player
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ban Player</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Player ID</label>
              <Input
                type="number"
                placeholder="Enter Player ID"
                value={playerId}
                onChange={(e) => setPlayerId(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Duration</label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Select ban duration" />
                </SelectTrigger>
                <SelectContent>
                  {banDurations.map((dur) => (
                    <SelectItem key={dur.value} value={dur.value.toString()}>
                      {dur.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Reason</label>
              <Textarea
                placeholder="Enter ban reason..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
              />
            </div>
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={handleBan}
              disabled={!playerId || !duration || !reason}
            >
              Ban Player
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}