/* eslint-disable no-undef */
import { app, nativeTheme, ipcMain } from 'electron'
import webServer from './api/web/web'
import tcpServer from './api/socket'
import createWindow from './api/createWindow'

require('./api/global')
require('./api/player')
require('./api/menu')

webServer.listen(12300, () => {
  console.info('Listening on 12300')
})

tcpServer.read('1339', (data) => {
  console.log('from tcpServer : ', data)
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
  windows = await createWindow(windows)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', async () => {
  if (windows.mainWindow === null) {
    windows = await createWindow(windows)
  }
})

ipcMain.on('showControlWindow', (evnet) => {
  windows.controlWindow.show()
})
