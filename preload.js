const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('gameAPI', {
    quitGame: () => ipcRenderer.send('quit-game')
});
