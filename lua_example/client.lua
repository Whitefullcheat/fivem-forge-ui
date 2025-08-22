-- Example FiveM Lua client-side integration
-- Save this as client.lua in your resource

local isMenuOpen = false

-- Register NUI callbacks
RegisterNUICallback('close', function(data, cb)
    isMenuOpen = false
    SetNuiFocus(false, false)
    cb('ok')
end)

RegisterNUICallback('getPlayers', function(data, cb)
    local players = {}
    for _, player in ipairs(GetActivePlayers()) do
        local playerId = GetPlayerServerId(player)
        local playerName = GetPlayerName(player)
        local steamId = GetPlayerIdentifier(player, 0) -- Steam ID
        local license = GetPlayerIdentifier(player, 1) -- License
        
        table.insert(players, {
            id = playerId,
            steamName = playerName,
            rpName = GetPlayerRPName(player) or playerName, -- You'll need to implement this
            group = GetPlayerGroup(player) or 'citizen', -- You'll need to implement this
            steamId = steamId,
            license = license,
            ping = GetPlayerPing(player),
            isOnline = true
        })
    end
    
    SendNUIMessage({
        type = 'updatePlayers',
        data = players
    })
    cb('ok')
end)

RegisterNUICallback('getPermissions', function(data, cb)
    -- Get player's admin rank and permissions
    local permissions = GetPlayerPermissions() -- You'll need to implement this
    
    SendNUIMessage({
        type = 'updatePermissions',
        data = permissions
    })
    cb('ok')
end)

RegisterNUICallback('getItems', function(data, cb)
    -- Get available items from your inventory system
    local items = GetAvailableItems() -- You'll need to implement this
    
    SendNUIMessage({
        type = 'updateItems',
        data = items
    })
    cb('ok')
end)

RegisterNUICallback('playerAction', function(data, cb)
    local playerId = data.playerId
    local action = data.action
    
    if action == 'revive' then
        TriggerServerEvent('admin:revivePlayer', playerId)
    elseif action == 'heal' then
        TriggerServerEvent('admin:healPlayer', playerId)
    elseif action == 'bring' then
        TriggerServerEvent('admin:bringPlayer', playerId)
    elseif action == 'goto' then
        TriggerServerEvent('admin:gotoPlayer', playerId)
    elseif action == 'spectate' then
        TriggerServerEvent('admin:spectatePlayer', playerId)
    elseif action == 'freeze' then
        TriggerServerEvent('admin:freezePlayer', playerId)
    elseif action == 'kick' then
        TriggerServerEvent('admin:kickPlayer', playerId)
    elseif action == 'ban' then
        TriggerServerEvent('admin:banPlayer', playerId)
    end
    
    cb('ok')
end)

RegisterNUICallback('kickPlayer', function(data, cb)
    TriggerServerEvent('admin:kickPlayer', data.playerId, data.reason)
    cb('ok')
end)

RegisterNUICallback('banPlayer', function(data, cb)
    TriggerServerEvent('admin:banPlayer', data.playerId, data.duration, data.reason)
    cb('ok')
end)

RegisterNUICallback('giveItem', function(data, cb)
    TriggerServerEvent('admin:giveItem', data.playerId, data.itemId, data.amount)
    cb('ok')
end)

RegisterNUICallback('removeItem', function(data, cb)
    TriggerServerEvent('admin:removeItem', data.playerId, data.itemId, data.amount)
    cb('ok')
end)

RegisterNUICallback('toggleTrainer', function(data, cb)
    local toolId = data.toolId
    local enabled = data.enabled
    
    if toolId == 'noclip' then
        ToggleNoclip(enabled)
    elseif toolId == 'invisibility' then
        ToggleInvisibility(enabled)
    elseif toolId == 'godmode' then
        ToggleGodmode(enabled)
    elseif toolId == 'showNames' then
        ToggleShowNames(enabled)
    elseif toolId == 'playerBlips' then
        TogglePlayerBlips(enabled)
    elseif toolId == 'staffTag' then
        ToggleStaffTag(enabled)
    end
    
    cb('ok')
end)

RegisterNUICallback('selfRevive', function(data, cb)
    TriggerServerEvent('admin:selfRevive')
    cb('ok')
end)

RegisterNUICallback('selfHeal', function(data, cb)
    TriggerServerEvent('admin:selfHeal')
    cb('ok')
end)

-- Command to open admin menu
RegisterCommand('adminmenu', function()
    if HasAdminPermission() then -- You'll need to implement this
        isMenuOpen = true
        SetNuiFocus(true, true)
        SendNUIMessage({
            type = 'openMenu'
        })
    end
end)

-- Key mapping (F2)
RegisterKeyMapping('adminmenu', 'Open Admin Menu', 'keyboard', 'F2')

-- ESC key handler
RegisterCommand('+menu_close', function()
    if isMenuOpen then
        isMenuOpen = false
        SetNuiFocus(false, false)
        SendNUIMessage({
            type = 'closeMenu'
        })
    end
end)

RegisterKeyMapping('+menu_close', 'Close Admin Menu', 'keyboard', 'ESCAPE')