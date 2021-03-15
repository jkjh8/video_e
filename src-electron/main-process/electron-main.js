import { app, BrowserWindow, nativeTheme, ipcMain } from 'electron'
import path from 'path'

try {
  if (process.platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(require('path').join(app.getPath('userData'), 'DevTools Extensions'))
  }
} catch (_) { }

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = __dirname
}

let mainWindow
let controlWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      nodeIntegrationInWorker: true
    }
  })
  mainWindow.loadURL(process.env.APP_URL)
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  controlWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: process.env.QUASAR_NODE_INTEGRATION,
      nodeIntegrationInWorker: process.env.QUASAR_NODE_INTEGRATION
    }
  })
  controlWindow.loadURL(process.env.APP_URL)
  controlWindow.on('close', (e) => {
    e.preventDefault()
    controlWindow.hide()
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('getWindow', (event, data) => {
  console.log(data)
  event.returnValue = data
})

ipcMain.on('showControlWindow', (evnet) => {
  controlWindow.show()
})
