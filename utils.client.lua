function Draw2DText(x, y, text, scale)
  SetTextFont(4)
  SetTextProportional(true)
  SetTextScale(scale, scale)
  SetTextColour(255, 255, 255, 255)
  SetTextEdge(4, 0, 0, 0, 255)
  SetTextEntry("STRING")
  AddTextComponentString(text)
  DrawText(x, y)
end

---@param action string The action you wish to target
---@param data any The data you wish to send along with this action
function SendReactMessage(action, data)
  SendNUIMessage({
    action = action,
    data = data
  })
end