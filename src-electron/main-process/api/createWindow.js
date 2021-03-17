import { app, BrowserWindow } from 'electron'
const func = require('./function')

export default function (windows) {
  windows.mainWindow = new BrowserWindow({
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
  windows.mainWindow.loadURL(process.env.APP_URL)
  windows.mainWindow.on('closed', () => {
    windows.mainWindow = null
    app.quit()
  })
  windows.mainWindow.on('enter-full-screen', () => {
    windows.mainWindow.setMenuBarVisibility(false)
    status.fullscreen = true
    func.sendMsg('status', status)
  })
  windows.mainWindow.on('leave-full-screen', () => {
    windows.mainWindow.setMenuBarVisibility(true)
    status.fullscreen = false
    func.sendMsg('status', status)
  })

  windows.controlWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      enableRemoteModule: true,
      contextIsolation: false,
      webSecurity: false
    }
  })
  windows.controlWindow.loadURL(process.env.APP_URL)
  windows.controlWindow.on('close', (e) => {
    if (windows.mainWindow) {
      e.preventDefault()
      windows.controlWindow.hide()
    } else {
      windows.controlWindow = null
    }
  })
  windows.controlWindow.on('closed', () => {
    windows.controlWindow = null
  })
  return windows
}
