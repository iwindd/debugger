CreateThread(function ()
  lib.debugger.drawer("PlayerId", "Player ID: " .. GetPlayerServerId(PlayerId()));
  lib.debugger.drawer("PlayerName", "Player Name: " .. GetPlayerName(PlayerId()));

  while true do
    Wait(150)

    local playerPed = PlayerPedId()

    local coords = GetEntityCoords(playerPed)
    local heading = GetEntityHeading(playerPed)

    lib.debugger.drawer("PlayerCoords", "Player Coords: " .. string.format("X: %.2f Y: %.2f Z: %.2f", coords.x, coords.y, coords.z) .. " Heading: " .. string.format("%.2f", heading));
    lib.debugger.drawer("PlayerPedId", "Player Ped ID: " .. PlayerPedId());
  end
end)
