const { app, BrowserWindow, systemPreferences } = require('electron')
const fs = require('fs');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 1500
  })

  win.setTitle('knot-here')
  if (['./version.txt', 'art', 'audio', 'font', 'icons'].map((filePath) => (fs.existsSync(filePath))).every(item => item === true)){
    win.loadFile('index.html');
  } else {
    win.loadFile('nofiles.html')
  }

//  win.webContents.on('before-input-event', (_, input) => {
//      if (input.type === 'keyUp' && input.key.toLowerCase() === 'escape'){
//          console.log('Escape key was pressed!');
//      }
//  });
}

app.whenReady().then(async () => {
  // systemPreferences.askForMediaAccess is only available on macOS
  if (process.platform === 'darwin') {
    const cameraStatus = systemPreferences.getMediaAccessStatus('camera');
    
    if (cameraStatus !== 'granted') {
      const success = await systemPreferences.askForMediaAccess('camera');
      console.log(success ? "Camera access granted" : "Camera access denied");
    }
  }
  
  createWindow(); // Your function to launch the BrowserWindow
});