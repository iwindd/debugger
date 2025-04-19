local drawers = {};

function Drawer(id, text)
  if text == nil then
    for k, v in pairs(drawers) do
      if v.id == id then
        table.remove(drawers, k)
        return
      end
    end

    return;
  end

  for k, v in pairs(drawers) do
    if v.id == id then
      v.text = text
      return
    end
  end

  table.insert(drawers, { id = id, text = text })
end

exports("Drawer", Drawer)
RegisterNetEvent("iDebugger.drawer:Drawer", Drawer)

CreateThread(function ()
  while true do
    Wait(0);

    for i, drawer in pairs(drawers) do
      Draw2DText(0.01, 0.1 + (i * 0.025), drawer.text, 0.4)
    end
  end
end)