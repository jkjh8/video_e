/* eslint-disable no-undef */
import { app, nativeTheme, ipcMain, Menu } from 'electron'
import { createMainWindow } from './api/createWindow'
import { sendMsg, enterFullscreen } from './api/function'
import playlistFunc from './api/playlist'
import webServer from './api/web/web'
import tcpServer from './api/socket'
import controls from './api/player'
import setup from './api/setup'

require('./api/global')
require('./api/menu')

webServer.listen(9074, () => {
  console.info('Listening on 9074')
})

tcpServer.read('13333', (data) => {
  console.log('from tcpServer : ', data)
  const comm = data.split(',')
  controls({
    addr: comm[0].toLowerCase(),
    value: comm[1],
    value2: comm[2]
  })
})

try {
  if (process.platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(require('path').join(app.getPath('userData'), 'DevTools Extensions'))
  }
} catch (_) { }

if (process.env.PROD) {
  global.__statics = __dirname
}
app.commandLine.appendSwitch('ignore-certificate-errors', 'true')

app.on('ready', async () => {
  // eslint-disable-next-line no-undef
  status.list = await playlistFunc.getList()
  status.items = await playlistFunc.getListItems(status.currListName)
  windows = await createMainWindow(windows)
  status.fullscreenStart = await setup.getFullscreenStart()
  if (status.fullscreenStart) {
    enterFullscreen()
    windows.mainWindow.show()
  }
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

ipcMain.on('license', async (event) => {
  const r = await setup.getLicense()
  console.log('license data = ', r)
  event.returnValue = r
})

ipcMain.on('quit', (e) => {
  app.quit()
})

ipcMain.on('setup', (event, data) => {
  console.log()
  setup.setLicense(data.value)
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
