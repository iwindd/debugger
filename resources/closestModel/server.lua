lib.addCommand("getClosestModelData", {
  restricted = "group.admin",
  params = {
    {name = "modelFilterName", type = "string", optional = true, help = "The model name to search for. If not provided, it will use the closest object model."}
  }
}, function (source, args, raw)
  TriggerClientEvent("debugger.closestModel:get", source, args.modelFilterName)
end)