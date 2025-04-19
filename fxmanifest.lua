fx_version "cerulean"

name 'iDebugger'
description "FiveM Debugger"
author 'iwindd'
version '1.0.0'
lua54 'yes'

ui_page 'web/build/index.html'

shared_scripts {
  '@ox_lib/init.lua',
}

client_scripts {
  "utils.client.lua",
  "resources/**/client.lua",
  "data/*.lua"
}

files {
	'web/build/index.html',
	'web/build/**/*',
}

games {
  "gta5",
}
