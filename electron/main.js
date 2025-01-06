import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { autoUpdater } from 'electron-updater';

// Get __dirname equivalent in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    icon: path.join(__dirname, '../src/assets/icons/waypoint_logo.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      contextIsolation: true,
      nodeIntegration: true,
      webviewTag: true,
      sandbox: false,
      webSecurity: false,
    },
    frame: false,
    backgroundColor: '#1f1f28'
  });

  const isDev = process.env.VITE_DEV_SERVER_URL !== undefined;
  const startUrl = isDev
    ? process.env.VITE_DEV_SERVER_URL
    : `file://${path.join(__dirname, '../dist-electron/index.html')}`;

  mainWindow.loadURL(startUrl);

  // Open DevTools for both development and production if desired
  mainWindow.webContents.openDevTools({
    mode: 'detach', // Opens DevTools in a separate window
  });
};

// Handle app lifecycle
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

ipcMain.on('minimize-window', () => {
  if (mainWindow) mainWindow.minimize();
});

ipcMain.on('maximize-window', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.on('close-window', () => {
  if (mainWindow) mainWindow.close();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Auto-Updater
autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');
});

autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
});

autoUpdater.checkForUpdatesAndNotify();

// Example IPC communication
ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});