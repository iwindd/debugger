lib.addCommand("getClosestModelData", {
  restricted = "group.admin",
  params = {
    {name = "modelFilterName", type = "string", optional = true, help = "The model name to search for. If not provided, it will use the closest object model."},
    {name = "distance", type = "number", optional = true, help = "The distance to search for objects, default is 10."}
  }
}, function (source, args, raw)
  TriggerClientEvent("debugger.closestModel:get", source, args.modelFilterName)
end)