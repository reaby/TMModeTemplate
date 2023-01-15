# Gamemode Starter Template

# Development

### Preparations

1. Copy the contents of `Dedicated/Maps` folder into your dedicated server's `UserData/Maps` folder.
2. Setup a symlink to this project `Scripts`-folder:
	Windows:
	```powershell
	D:\trackmania\server\UserData> mklink /D Scripts D:\trackmania\TMModeTemplate\Dedicated\Scripts
	```
	Linux:
	```bash
	ln -s <path from> <path to>
	```
	> When you wish to change between project, just rename the `Scripts` folder to `Scripts_modename` and do the opposite for the other script.
3. Install `vscode` from https://code.visualstudio.com/Download
4. Open the `workspace`-file, install suggested extensions:
   1. `maniascript-support` by reaby
   2. `mslint` by aessi
   3. `xml` by redhat
5. Install `node.js` and `npm` to your platform from https://nodejs.org
   1. Copy `Tools\config.default.js` to `Tools\config.js` and set the appropriate values.
   2. Run `npm install` at the `Tools`-folder
   3. Done

### Start local dedicated server
Windows:
```powershell
TrackmaniaServer.exe /game_settings=MatchSettings/ModeTemplate.txt /dedicated_cfg=dedicated_cfg.txt
```

Linux:
```bash
./TrackmaniaServer /game_settings=MatchSettings/ModeTemplate.txt /dedicated_cfg=dedicated_cfg.txt /NoDaemon
```

## Helpers

### Deployment

The workspace is set to deploy the updated script at local dedicated server when you press F5 at vscode.

Alternative you can start a minicontroller at `Tools`-folder, by running `npm start`.

The default chat commands for minicontroller are:
- `/reload` to reload mode
- `/add` add bot
- `/remove` remove bot

Feel free to implement more, if you need to.

### Ingame debugging tools

You can find a debug button at bottom left above chat. Clicking it will open debug tools for adding and controlling bots.


# Dedicated Server How-To for Production

1. Place the contents of `Dedicated` folder into your dedicated server's `UserData` folder.
2. Start the server:

Linux:
```bash
./TrackmaniaServer /game_settings=MatchSettings/ModeTemplate.txt /dedicated_cfg=dedicated_cfg.txt
```

Windows:
```powershell
TrackmaniaServer.exe /game_settings=MatchSettings/ModeTemplate.txt /dedicated_cfg=dedicated_cfg.txt
```

# Thanks
   - Beu for debug modebase script
   - Ze-Rax for simplified and improved Modebase
