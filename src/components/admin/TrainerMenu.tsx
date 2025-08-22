import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import { trainerTools } from '../../data/mockData';
import type { TrainerTool } from '../../types/admin';

export function TrainerMenu() {
  const [tools, setTools] = useState<TrainerTool[]>(trainerTools);

  const handleToggleTool = (toolId: string) => {
    setTools(prev => 
      prev.map(tool => 
        tool.id === toolId ? { ...tool, enabled: !tool.enabled } : tool
      )
    );
    console.log(`Toggle trainer tool: ${toolId}`);
    // NUI callback to FiveM
  };

  const handleSelfRevive = () => {
    console.log('Self revive');
    // NUI callback to FiveM
  };

  const handleSelfHeal = () => {
    console.log('Self heal');
    // NUI callback to FiveM
  };

  const enabledCount = tools.filter(tool => tool.enabled).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Trainer Tools</h2>
        <p className="text-muted-foreground">
          Personal administrative tools and utilities
        </p>
        <Badge variant="secondary" className="mt-2">
          {enabledCount} / {tools.length} tools active
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Tools</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button variant="success" onClick={handleSelfRevive}>
                Self Revive
              </Button>
              <Button variant="success" onClick={handleSelfHeal}>
                Self Heal
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Toggle Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tools.map((tool) => (
                <div
                  key={tool.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/50"
                >
                  <div className="flex-1">
                    <div className="font-medium flex items-center gap-2">
                      {tool.label}
                      {tool.enabled && (
                        <Badge variant="default" className="text-xs">
                          ON
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {tool.description}
                    </div>
                  </div>
                  <Switch
                    checked={tool.enabled}
                    onCheckedChange={() => handleToggleTool(tool.id)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}