import { app, BrowserWindow, Menu } from 'electron'
import { sendMsg } from './function'
import setup from './setup'

export const createMainWindow = function (windows) {
  windows.mainWindow = new BrowserWindow({
    width: 1280,
    height: 740,
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
    sendMsg('status', status)
  })
  windows.mainWindow.on('leave-full-screen', () => {
    windows.mainWindow.setMenuBarVisibility(true)
    status.fullscreen = false
    sendMsg('status', status)
  })

  windows.mainWindow.on('resize', (e) => {
    var size = windows.mainWindow.getSize()
    windows.mainWindow.setSize(size[0], parseInt(size[0] * 9 / 16) + 52, true)
  })

  windows.mainWindow.on('ready-to-show', async (e) => {
    route.mainWindow.id = windows.mainWindow.id
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
  windows.controlWindow.on('ready-to-show', (e) => {
    route.controlWindow.id = windows.controlWindow.id
  })
  return windows
}
export const createApiWindow = function (windows) {
  windows.apiWindow = new BrowserWindow({
    width: 600,
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
  windows.apiWindow.loadURL(process.env.APP_URL)
  windows.apiWindow.on('closed', () => {
    windows.apiWindow = null
  })
  windows.apiWindow.on('ready-to-show', (e) => {
    route.apiWindow.id = windows.apiWindow.id
  })
  return windows
}
