import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

// Configure logging for auto-updater
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');
console.log('App starting...');

// Get __dirname equivalent in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

const createWindow = () => {
  console.log('Creating main window...');
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
    backgroundColor: '#1f1f28',
  });

  const isDev = process.env.VITE_DEV_SERVER_URL !== undefined;
  const startUrl = isDev
    ? process.env.VITE_DEV_SERVER_URL
    : `file://${path.join(__dirname, '../dist-electron/index.html')}`;

  console.log(`Loading URL: ${startUrl}`);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    console.log('Opening DevTools...');
    mainWindow.webContents.openDevTools({
      mode: 'detach', // Opens DevTools in a separate window
    });
  }
};

// Handle app lifecycle
app.whenReady().then(() => {
  console.log('App ready. Creating window...');
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      console.log('Reactivating app, no windows open. Creating a new one...');
      createWindow();
    }
  });
});

ipcMain.on('minimize-window', () => {
  console.log('Minimizing window...');
  if (mainWindow) mainWindow.minimize();
});

ipcMain.on('maximize-window', () => {
  console.log('Toggling maximize/unmaximize...');
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.on('close-window', () => {
  console.log('Closing window...');
  if (mainWindow) mainWindow.close();
});

app.on('window-all-closed', () => {
  console.log('All windows closed.');
  if (process.platform !== 'darwin') {
    console.log('Quitting app...');
    app.quit();
  }
});

// Auto-Updater Event Handling
autoUpdater.on('checking-for-update', () => {
  log.info('Checking for updates...');
  console.log('Checking for updates...');
});

autoUpdater.on('update-available', (info) => {
  log.info('Update available:', info);
  console.log('Update available:', info);
  if (mainWindow) mainWindow.webContents.send('update_available', info);
});

autoUpdater.on('update-not-available', (info) => {
  log.info('No update available:', info);
  console.log('No update available:', info);
  if (mainWindow) mainWindow.webContents.send('update_not_available', info);
});

autoUpdater.on('error', (error) => {
  log.error('Error during update:', error);
  console.error('Error during update:', error);
  if (mainWindow) mainWindow.webContents.send('update_error', error.message);
});

autoUpdater.on('download-progress', (progressObj) => {
  const logMessage = `Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}% (${progressObj.transferred}/${progressObj.total})`;
  log.info(logMessage);
  console.log(logMessage);
  if (mainWindow) mainWindow.webContents.send('update_download_progress', progressObj);
});

autoUpdater.on('update-downloaded', (info) => {
  log.info('Update downloaded:', info);
  console.log('Update downloaded:', info);
  if (mainWindow) mainWindow.webContents.send('update_downloaded', info);

  console.log('Installing update in 5 seconds...');
  setTimeout(() => {
    autoUpdater.quitAndInstall();
  }, 5000); // Delay of 5 seconds before installation
});

// Trigger Update Check
app.whenReady().then(() => {
  console.log('Triggering auto-updater...');
  autoUpdater.checkForUpdatesAndNotify();
});

// IPC Event for App Version
ipcMain.on('app_version', (event) => {
  const appVersion = app.getVersion();
  console.log('Sending app version to renderer:', appVersion);
  event.sender.send('app_version', { version: appVersion });
});
