import { ipcMain, BrowserWindow } from 'electron'
import files from '../files'
import playlistFunc from '../playlist'
const func = require('../function')

ipcMain.on('status', (event, data) => {
  status[data.addr] = data.value
  func.sendMsg('status', status)
})

ipcMain.on('sync', (event) => {
  event.returnValue = status
})

ipcMain.on('control', async (event, data) => {
  switch (data.addr) {
    case 'fullscreen':
      func.enterFullscreen()
      break
    case 'flip':
      BrowserWindow.fromId(1).show()
      break
    case 'open':
      files.open()
      break
    case 'clear':
      files.clear()
      break
    case 'next':
      next()
      break
    case 'addItems': {
      const items = await files.openRemote()
      await playlistFunc.addListItems(items)
      break
    }
    default:
      func.sendMsg('control', data)
      break
  }
})

async function next () {
  const itemsLength = status.items.length
  status.itemIdx = status.itemIdx + 1
  if (status.itemIdx >= itemsLength) {
    status.itemIdx = 0
  }
}
