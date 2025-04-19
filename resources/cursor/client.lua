local function ToggleCursor()
  local current = IsNuiFocused();
  SetNuiFocus(not current, not current);
  SetNuiFocusKeepInput(not current);
  SetCursorLocation(0.5, 0.5);
end

lib.addKeybind({
  name = "DEBUGGER:GET_MOUSE",
  description = "Toggle Cursor Debugger",
  defaultKey = "RMENU",
  defaultMapper = "keyboard",
  onPressed = ToggleCursor,
})