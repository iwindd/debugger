---@param modelFilter? string
---@param distance? number
local function getClosestModelData(modelFilter, distance)
  local coords = GetEntityCoords(cache.ped);
  local nearbyObjects = lib.getNearbyObjects(coords, distance or 10);
  local closestObject, closestDistance = nil, -1;

  for _, data in ipairs(nearbyObjects) do
    if (modelFilter and modelFilter ~= GetEntityModel(data.object)) then
      goto continue;
    end

    local objectDistance = #(coords - data.coords);
    if (not closestObject or objectDistance < closestDistance) then
      closestDistance = objectDistance;
      closestObject = data.object;
    end

    ::continue::
  end

  if (not closestObject) then
    return lib.print.error("No objects found within the specified distance.");
  end

  local textFormat = ([[
  ------------------------- Object Details -------------------------
    Object Model: %s
    Object Coords (vec4): vec4(%.2f, %.2f, %.2f, %.2f)
  ------------------------------------------------------------------
  ]]):format(
    GetEntityModel(closestObject),
    GetEntityCoords(closestObject).x,
    GetEntityCoords(closestObject).y,
    GetEntityCoords(closestObject).z,
    GetEntityHeading(closestObject)
  )

  return lib.print.info(textFormat)
end

RegisterNetEvent("debugger.closestModel:get", getClosestModelData)