import { setTimeout } from 'core-js'
import { ipcMain, BrowserWindow } from 'electron'
import fileFunc from '../files'
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
      fileFunc.open()
      break
    case 'clear':
      fileFunc.clear()
      break
    case 'next':
      next()
      break
    case 'previous':
      previous()
      break
    case 'itemIdx':
      status.itemIdx = data.value
      fileFunc.openFileIdx()
      func.sendMsg('status', status)
      break
    case 'addItems': {
      const items = await fileFunc.openRemote()
      status.items = await playlistFunc.addListItems(items)
      func.sendMsg('status', status)
      break
    }
    case 'delItem':
      await playlistFunc.delListItem(data.value)
      status.items = await playlistFunc.getListItems(status.currListName)
      func.sendMsg('status', status)
      break
    case 'delItems':
      await playlistFunc.delListItems(status.currListName)
      status.items = []
      func.sendMsg('status', status)
      break
    case 'listIdx':
      status.listIdx = data.value
      status.currListName = status.list[status.listIdx]
      status.items = await playlistFunc.getListItems(status.currListName)
      func.sendMsg('status', status)
      break
    case 'addList':
      await playlistFunc.addList(data.value)
      status.list = await playlistFunc.getList()
      func.sendMsg('status', status)
      break
    case 'delList':
      await playlistFunc.delList(data.value)
      status.list = await playlistFunc.getList()
      if (status.listIdx > status.list.length - 1) {
        status.listIdx = status.list.length - 1
        status.currListName = status.list[status.listIdx]
        status.items = await playlistFunc.getListItems(status.currListName)
      }
      func.sendMsg('status', status)
      break
    case 'delAll':
      await playlistFunc.delAll()
      status.list = await playlistFunc.getList()
      status.items = await playlistFunc.getListitems(status.currListName)
      func.sendMsg('status', status)
      break
    case 'ended':
      await ended()
      break
    case 'ready':
      if (status.play && status.mode === 'playlist') {
        if (!status.loopAll && status.itemIdx === 0) {
          status.play = false
          func.sendMsg('status', status)
          break
        }
        func.sendMsg('control', { addr: 'play' })
      }
      break

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
  fileFunc.openFileIdx()
}

async function previous () {
  const itemsLength = status.items.length
  status.itemIdx = status.itemIdx - 1
  if (status.itemIdx < 0) {
    status.itemIdx = itemsLength - 1
  }
  fileFunc.openFileIdx()
}

async function ended () {
  const itemsLength = status.items.length
  if (status.mode === 'playlist') {
    console.log('playlist')
    status.itemIdx = status.itemIdx + 1
    if (status.itemIdx >= itemsLength) {
      status.itemIdx = 0
    }
    console.log(status.itemIdx)
    fileFunc.openFileIdx()
  }
}
