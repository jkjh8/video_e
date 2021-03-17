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
  // resize event
  let resizeTimeout
  windows.mainWindow.on('resize', (e) => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout (function () {
      var size = windows.mainWindow.getSize()
      windows.mainWindow.setSize(size[0], parseInt(size[0] * 9 / 16) + 51)
    }, 100)
  })
  windows.mainWindow.setSize(1000, 564)

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
