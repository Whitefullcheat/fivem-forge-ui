// NUI Event handlers for FiveM communication
declare global {
  interface Window {
    invokeNative?: (native: string, ...args: any[]) => void;
    GetParentResourceName?: () => string;
  }
}

// Send data to Lua client
export const sendNUIMessage = (action: string, data: any = {}) => {
  fetch(`https://${window.GetParentResourceName?.() || 'admin_menu'}/${action}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });
};

// Listen for messages from Lua
export const addNUIEventListener = (event: string, callback: (data: any) => void) => {
  const handler = (event: MessageEvent) => {
    if (event.data.type === event) {
      callback(event.data.data);
    }
  };
  
  window.addEventListener('message', handler);
  
  return () => window.removeEventListener('message', handler);
};

// Close the NUI
export const closeNUI = () => {
  sendNUIMessage('close');
};

// Request data from Lua
export const requestPlayerData = () => {
  sendNUIMessage('getPlayers');
};

export const requestPermissions = () => {
  sendNUIMessage('getPermissions');
};

export const requestItems = () => {
  sendNUIMessage('getItems');
};

// Player actions
export const executePlayerAction = (playerId: number, action: string, data?: any) => {
  sendNUIMessage('playerAction', {
    playerId,
    action,
    ...data,
  });
};

// Admin actions
export const kickPlayer = (playerId: number, reason: string) => {
  sendNUIMessage('kickPlayer', { playerId, reason });
};

export const banPlayer = (playerId: number, duration: number, reason: string) => {
  sendNUIMessage('banPlayer', { playerId, duration, reason });
};

export const giveItem = (playerId: number, itemId: string, amount: number = 1) => {
  sendNUIMessage('giveItem', { playerId, itemId, amount });
};

export const removeItem = (playerId: number, itemId: string, amount: number = 1) => {
  sendNUIMessage('removeItem', { playerId, itemId, amount });
};

// Trainer actions
export const toggleTrainerTool = (toolId: string, enabled: boolean) => {
  sendNUIMessage('toggleTrainer', { toolId, enabled });
};

export const selfRevive = () => {
  sendNUIMessage('selfRevive');
};

export const selfHeal = () => {
  sendNUIMessage('selfHeal');
};