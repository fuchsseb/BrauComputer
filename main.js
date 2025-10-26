const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

let mainWindow;

function createWindow() {
  // Erstelle das Browser-Fenster
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    titleBarStyle: 'hiddenInset',
    show: false
  });

  // Lade die App
  const startUrl = isDev 
    ? 'http://localhost:3000' 
    : `file://${path.join(__dirname, '../build/index.html')}`;
  
  // Lade die App mit Retry-Logik
  const loadApp = () => {
    mainWindow.loadURL(startUrl).catch((error) => {
      console.log('Failed to load app, retrying in 2 seconds...', error.message);
      if (isDev) {
        setTimeout(loadApp, 2000);
      }
    });
  };
  
  loadApp();

  // Zeige das Fenster wenn es bereit ist
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Öffne DevTools in Development
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// App Event Listeners
app.whenReady().then(() => {
  createWindow();
  createMenu();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Menu erstellen
function createMenu() {
  const template = [
    {
      label: 'BrauComputer',
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    {
      label: 'Bearbeiten',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'Ansicht',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Fenster',
      submenu: [
        { role: 'minimize' },
        { role: 'close' }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// IPC Handlers für Datenbank-Operationen
ipcMain.handle('save-recipe', async (event, recipe) => {
  // Hier würde die Rezept-Speicherung implementiert werden
  console.log('Saving recipe:', recipe);
  return { success: true, id: Date.now() };
});

ipcMain.handle('load-recipes', async () => {
  // Hier würde das Laden der Rezepte implementiert werden
  return [];
});

ipcMain.handle('save-brewing-session', async (event, session) => {
  // Hier würde die Brausitzung-Speicherung implementiert werden
  console.log('Saving brewing session:', session);
  return { success: true, id: Date.now() };
});
