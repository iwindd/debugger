local Json = {};

---@param id string
---@param table table
local function Drawer(id, table)
  local invokingResource = GetInvokingResource();
  if (not Json[invokingResource]) then
    Json[invokingResource] = {};
  end

  Json[invokingResource][id] = json;

  SendNUIMessage({
    type = "json",
    json = {
      invokingResource = invokingResource,
      id = id,
      data = table,
    }
  })
end

exports("Json", Drawer)
RegisterNetEvent("iDebugger.json:Drawer", Drawer)
AddEventHandler("onResourceStop", function(resourceName)
  if (Json[resourceName]) then
    Json[resourceName] = nil;

    SendNUIMessage({
      type = "json.clear",
      header = resourceName,
    })
  end
end)

local function toggleNuiFrame(shouldShow)
  SendReactMessage('setVisible', shouldShow)
end

RegisterCommand('openJsonViewer', function() toggleNuiFrame(true) end)


lib.addKeybind({
  name = "DEBUGGER:OPEN_JSON_VIER",
  description = "Toggle Cursor Debugger",
  defaultKey = "PAGEDOWN",
  defaultMapper = "keyboard",
  onPressed = function ()  toggleNuiFrame(true) end,
})

RegisterNUICallback('hideFrame', function(_, cb) toggleNuiFrame(false) cb({}) end)
RegisterNUICallback('getClientData', function(data, cb)

-- Lets send back client coords to the React frame for use
  local curCoords = GetEntityCoords(PlayerPedId())

  local retData <const> = { x = curCoords.x, y = curCoords.y, z = curCoords.z }
  cb(retData)
end)