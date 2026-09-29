const { app, BrowserWindow, systemPreferences, ipcMain } = require('electron')
const fs = require('fs');
const path = require('path');
if (require('electron-squirrel-startup')) app.quit();

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 1500,
    show: false,
    fullscreen: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      devTools: true
    },
  })

  
  win.setTitle('....knoT here..')
  if (app.isPackaged || ['./version.txt', 'art', 'audio', 'font', 'icons'].map((filePath) => (fs.existsSync(filePath))).every(item => item === true)){
    win.loadFile('index.html');
  } else {
    win.loadFile('nofiles.html')
  }

  win.show();
}

ipcMain.on('quit-game', () => {
  app.quit(); 
});

app.whenReady().then(async () => {
  if (process.platform === 'darwin') {
    const cameraStatus = systemPreferences.getMediaAccessStatus('camera');
    
    if (cameraStatus !== 'granted') {
      const success = await systemPreferences.askForMediaAccess('camera');
      console.log(success ? "Camera access granted" : "Camera access denied");
    }
  }
  createWindow();
});