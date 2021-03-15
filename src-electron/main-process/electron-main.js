import { app, BrowserWindow, nativeTheme, ipcMain } from 'electron'
import webServer from './api/web/web'

webServer.listen(12300, () => {
  console.info('Listening on 12300')
})

try {
  if (process.platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(require('path').join(app.getPath('userData'), 'DevTools Extensions'))
  }
} catch (_) { }

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
      nodeIntegrationInWorker: true,
      webSecurity: false
    }
  })
  mainWindow.loadURL(process.env.APP_URL)
  mainWindow.on('closed', () => {
    mainWindow = null
    app.quit()
  })

  controlWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: process.env.QUASAR_NODE_INTEGRATION,
      nodeIntegrationInWorker: process.env.QUASAR_NODE_INTEGRATION,
      enableRemoteModule: true,
      contextIsolation: false,
      webSecurity: false
    }
  })
  controlWindow.loadURL(process.env.APP_URL)
  controlWindow.on('close', (e) => {
    if (mainWindow) {
      e.preventDefault()
      controlWindow.hide()
    } else {
      controlWindow = null
    }
  })
  controlWindow.on('closed', () => {
    controlWindow = null
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
