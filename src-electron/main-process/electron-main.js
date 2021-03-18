/* eslint-disable no-undef */
import { app, nativeTheme, ipcMain } from 'electron'
import { createMainWindow } from './api/createWindow'
import { sendMsg } from './api/function'
import playlistFunc from './api/playlist'
import webServer from './api/web/web'
import controls from './api/player'

require('./api/global')
require('./api/menu')
require('./api/tcpServer')

webServer.listen(9074, () => {
  console.info('Listening on 9074')
})

try {
  if (process.platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(require('path').join(app.getPath('userData'), 'DevTools Extensions'))
  }
} catch (_) { }

if (process.env.PROD) {
  global.__statics = __dirname
}

app.on('ready', async () => {
  // eslint-disable-next-line no-undef
  windows = await createMainWindow(windows)
  status.list = await playlistFunc.getList()
  status.items = await playlistFunc.getListItems(status.currListName)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', async () => {
  if (windows.mainWindow === null) {
    windows = await createMainWindow(windows)
  }
})

ipcMain.on('showControlWindow', (evnet) => {
  windows.controlWindow.show()
})

ipcMain.on('getWindows', (event) => {
  event.returnValue = route
})

ipcMain.on('status', (event, data) => {
  status[data.addr] = data.value
  sendMsg('status', status)
})

ipcMain.on('sync', (event) => {
  event.returnValue = status
})

ipcMain.on('control', (event, data) => {
  controls(data)
})
