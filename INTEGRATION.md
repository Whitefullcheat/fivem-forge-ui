# FiveM Admin Menu - Yarn Integration Guide

This admin menu is designed to be integrated into your existing FiveM UI script using yarn.

## Installation

1. Copy this entire React project into your UI resource folder
2. Install dependencies with yarn:
```bash
yarn install
```

3. Build the project:
```bash
yarn build
```

## Integration Steps

### 1. Add to your existing UI resource

If you have an existing UI resource, you can import the AdminMenu component:

```jsx
import { AdminMenu } from './admin-menu/src/components/AdminMenu';

// In your main UI component
function MainUI() {
  const [showAdminMenu, setShowAdminMenu] = useState(false);

  return (
    <div>
      {/* Your existing UI */}
      {showAdminMenu && <AdminMenu />}
    </div>
  );
}
```

### 2. Lua Integration

Copy the example Lua files (`lua_example/client.lua` and `lua_example/server.lua`) to your resource and modify them according to your framework.

### 3. Required Lua Functions

You need to implement these functions in your Lua code:

#### Client-side:
- `GetPlayerRPName(player)` - Get player's RP name
- `GetPlayerGroup(player)` - Get player's admin group
- `GetPlayerPermissions()` - Get current player's permissions
- `GetAvailableItems()` - Get list of available items
- `HasAdminPermission()` - Check if player has admin access
- `ToggleNoclip(enabled)` - Toggle noclip
- `ToggleInvisibility(enabled)` - Toggle invisibility
- `ToggleGodmode(enabled)` - Toggle god mode

#### Server-side:
- `HasAdminPermission(playerId, permission)` - Check permissions
- `AddPlayerBan(playerId, duration, reason, adminName)` - Add ban to database
- `GivePlayerItem(playerId, itemId, amount)` - Give item to player
- `RemovePlayerItem(playerId, itemId, amount)` - Remove item from player

### 4. NUI Events

The menu communicates with Lua through these NUI events:

#### From React to Lua:
- `close` - Close the menu
- `getPlayers` - Request player list
- `getPermissions` - Request user permissions
- `getItems` - Request available items
- `playerAction` - Execute player action
- `kickPlayer` - Kick a player
- `banPlayer` - Ban a player
- `giveItem` - Give item to player
- `removeItem` - Remove item from player
- `toggleTrainer` - Toggle trainer tool
- `selfRevive` - Self revive
- `selfHeal` - Self heal

#### From Lua to React:
- `updatePlayers` - Send updated player list
- `updatePermissions` - Send user permissions
- `updateItems` - Send available items
- `openMenu` - Open the admin menu
- `closeMenu` - Close the admin menu

### 5. Package.json Scripts

Available yarn scripts:
- `yarn dev` - Development server
- `yarn build` - Build for production
- `yarn preview` - Preview built app
- `yarn lint` - Run ESLint

## Framework Compatibility

This admin menu is designed to work with any FiveM framework. You just need to adapt the Lua functions to your specific framework's syntax:

- **ESX**: Adapt player management functions to ESX.GetPlayers(), etc.
- **QBCore**: Adapt to QBCore.Functions.GetPlayers(), etc.
- **Custom**: Implement according to your framework's API

## Security Notes

- Always validate permissions server-side
- Never trust data from the NUI - validate everything
- Implement proper logging for admin actions
- Use secure ban/kick systems with database storage

## File Structure

```
your-ui-resource/
├── admin-menu/          # This React project
│   ├── src/
│   ├── package.json
│   └── yarn.lock
├── lua_example/         # Example Lua integration
│   ├── client.lua
│   └── server.lua
├── fxmanifest.lua      # Your resource manifest
└── ...                 # Your other UI components
```