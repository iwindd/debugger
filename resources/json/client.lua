local Json = {};
local visibility = false;

---@param id string
---@param data table
---@param invokingResource? string
local function Drawer(id, data, invokingResource)
  invokingResource = invokingResource or GetInvokingResource() or "N/A";
  if (not Json[invokingResource]) then
    Json[invokingResource] = {};
  end

  Json[invokingResource][id] = data;

  if (table.type(Json[invokingResource][id]) == 'empty') then
    return SendNUIMessage({
      action = "json:clear",
      data = {
        id = id,
      }
    })
  end

  SendNUIMessage({
    action = "json",
    data = {
      invokingResource = invokingResource,
      id = id,
      data = Json[invokingResource][id],
    }
  })
end

exports("Json", Drawer)
RegisterNetEvent("iDebugger.json:Drawer", Drawer)
AddEventHandler("onResourceStop", function(resourceName)
  SendNUIMessage({
    action = "json:clear",
    data = {
      invokingResource = resourceName,
    },
  })
end)

local function toggleNuiFrame(shouldShow)
  SendReactMessage('setVisible', shouldShow)
  SetNuiFocus(shouldShow, shouldShow)
  SetNuiFocusKeepInput(shouldShow)
  visibility = shouldShow
  if (visibility) then
    CreateThread(function ()
      while visibility do
        Wait(0)
        if (IsNuiFocused()) then
          DisableAllControlActions(0);
        end
      end
    end)
  end
end

RegisterNUICallback('hideFrame', function(_, cb) toggleNuiFrame(false) cb({}) end)

lib.addKeybind({
  name = "DEBUGGER:OPEN_JSON_VIER",
  description = "Toggle Cursor Debugger",
  defaultKey = "PAGEDOWN",
  defaultMapper = "keyboard",
  onPressed = function ()  toggleNuiFrame(not visibility) end,
})