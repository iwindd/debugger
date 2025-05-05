require '@inventory.enums.prop';
---@diagnostic disable-next-line: undefined-global
local PED_BONE = PED_BONE or {};
local model;
local bone = PED_BONE.SKEL_ROOT;
local offset = { x = 0.0, y = 0.0, z = 0.0 };
local rotation = { x = 0.0, y = 0.0, z = 0.0 };
local options = { softPin = true, collision = true, syncRot = true }
local _object;

RegisterNUICallback('attachFinder', function(data, cb)
  cb(true);

  model = data.model or model;
  bone = PED_BONE[data.bone] or bone; 
  offset = data.offset or offset;
  rotation = data.rotation or rotation;
  options = data.options or options;
  offset.x = offset.x + 0.0;
  offset.y = offset.y + 0.0;
  offset.z = offset.z + 0.0;
  rotation.x = rotation.x + 0.0;
  rotation.y = rotation.y + 0.0;
  rotation.z = rotation.z + 0.0;

  if (_object) then
    DeleteEntity(_object);
    _object = nil;
  end

  if (model and IsModelInCdimage(GetHashKey(model)) and not _object) then
    model = GetHashKey(model);
    lib.requestModel(model);
    local pedCoords = GetEntityCoords(cache.ped);
    _object = CreateObject(model,
      pedCoords.x, pedCoords.y, pedCoords.z, false,
      true,
      false
    )
    SetModelAsNoLongerNeeded(model);
  end

  if (_object) then
    local boneIndex = GetPedBoneIndex(cache.ped, bone);

    if (boneIndex ~= -1) then
      AttachEntityToEntity(
        _object,
        cache.ped,
        boneIndex,
        offset.x,
        offset.y,
        offset.z,
        rotation.x,
        rotation.y,
        rotation.z,
        true,
        options.softPin,
        options.collision,
        true,
        1,
        options.syncRot
      );
    end

    lib.print.info("[ATTACH] REFRESH!")
  end
end)

AddEventHandler("onResourceStop", function(resourceName)
  if (resourceName == GetCurrentResourceName() and _object and DoesEntityExist(_object)) then
    DeleteEntity(_object);
  end
end)