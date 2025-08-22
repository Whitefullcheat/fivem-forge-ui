import { useState } from 'react';
import { Search, Plus, Minus } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { giveItem, removeItem } from '../../utils/nui';

interface ItemMenuProps {
  items: any[];
}

export function ItemMenu({ items }: ItemMenuProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGiveItem = (itemId: string) => {
    if (!selectedPlayer) return;
    giveItem(selectedPlayer, itemId, 1);
  };

  const handleRemoveItem = (itemId: string) => {
    if (!selectedPlayer) return;
    removeItem(selectedPlayer, itemId, 1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Item Management</h2>
        <p className="text-muted-foreground">
          Give or remove items from players
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Player Selection</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="number"
              placeholder="Enter Player ID"
              value={selectedPlayer || ''}
              onChange={(e) => setSelectedPlayer(e.target.value ? parseInt(e.target.value) : null)}
            />
            {selectedPlayer && (
              <Badge variant="secondary" className="mt-2">
                Selected Player: #{selectedPlayer}
              </Badge>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Items
              <div className="relative w-48">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/50"
                >
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.category}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="success"
                      onClick={() => handleGiveItem(item.id)}
                      disabled={!selectedPlayer}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={!selectedPlayer}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}