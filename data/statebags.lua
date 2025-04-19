
Wait(3000)

CreateThread(function ()
  local registeredEntities = {};
  local states = {};

  local function Register(entity)
    if (registeredEntities[entity]) then return end;
    if (not NetworkGetEntityIsNetworked(entity)) then return end;
    local stateId = entity;
    if (IsPedAPlayer(entity)) then
      stateId = ("player:%s"):format(GetPlayerServerId(NetworkGetPlayerIndexFromPed(entity)));
    elseif (IsEntityAVehicle) then
      stateId = ("vehicle:%s"):format(VehToNet(entity));
    elseif (IsEntityAnObject(entity)) then
      stateId = ("object:%s"):format(NetToObj(entity));
    end

    if (not stateId) then return end;
    registeredEntities[entity] = true;
    states[stateId] = {};

    for _, key in ipairs(GetStateBagKeys(stateId)) do
      local value = GetStateBagValue(stateId, key);
      states[stateId][key] = value;
    end

    local function onUpdate()
      lib.debugger.json(stateId, states[stateId], "StateBags");
    end

    ---@diagnostic disable-next-line: param-type-mismatch
    AddStateBagChangeHandler(nil, stateId, function (stateBag, key, value)
      states[stateId][key] = value;
      onUpdate();
    end)

    onUpdate()
  end

  while true do
    for _, entity in ipairs(GetGamePool('CPed')) do Register(entity); end
    for _, entity in ipairs(GetGamePool('CVehicle')) do Register(entity); end
    for _, entity in ipairs(GetGamePool('CNetObject')) do Register(entity); end
    Wait(60 * 1000)
  end
end)