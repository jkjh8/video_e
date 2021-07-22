import fs from 'fs'
import ff from '../files'
import lf from '../playlist'
import tcpServer from '../socket'
import { Menu } from 'electron'

import { sendMsg, sendItemError, sendStatus, sendControl } from '../function'

export default async function (data) {
  /* global windows */
  let rtMsg
  switch (data.addr) {
    case 'mode':
      if (data.value === 'playlist' || data.value === 'nomal') {
        status.mode = data.value
        if (status.mode === 'playlist') {
          const menu = Menu.getApplicationMenu()
          menu.items[1].submenu.items[0].checked = true
        } else {
          const menu = Menu.getApplicationMenu()
          menu.items[1].submenu.items[0].checked = false
        }
        rtMsg = `mode,${data.value}`
      }
      break

    case 'play':
      status.play = true
      status.autoplay = false
      rtMsg = 'play'
      sendControl('play')
      break

    case 'pf':
    case 'playFile': {
      status.play = true
      status.autoplay = true
      const result = await fs.existsSync(data.value)
      if (result) {
        try {
          ff.sendFileObj(data.value)
        } catch (err) {
          return err
        }
      }
      rtMsg = `playfile,${data.value}`
      break
    }
    case 'pause':
    case 'paue':
      rtMsg = 'paus'
      status.play = false
      status.autoplay = false
      sendControl('pause')
      break

    case 'full':
    case 'fullscreen': {
      let value
      if (data.value) {
        value = data.value === 'true'
      } else {
        value = !status.fullscreen
      }
      windows.mainWindow.setFullScreen(value)
      rtMsg = `full,${value}`
      break
    }
    case 'minimize':
    case 'mini':
      windows.mainWindow.minimize()
      rtMsg = 'mini'
      break

    case 'flip':
      windows.mainWindow.show()
      rtMsg = 'flip'
      break

    case 'loop':
      if (data.value) {
        status.loop = data.value === 'true'
      } else {
        status.loop = !status.loop
      }
      rtMsg = `loop,${status.loop}`
      break

    case 'loopAll':
    case 'alop':
      if (data.value) {
        status.loopAll = data.value === 'true'
      } else {
        status.loopAll = !status.loopAll
      }
      rtMsg = `alop,${status.loopAll}`
      break

    case 'mute':
      if (data.value) {
        status.mute = data.value === 'true'
      } else {
        status.mute = !status.mute
      }
      rtMsg = `mute,${status.mute}`
      break

    case 'volume':
    case 'volu':
      status.volume = data.value
      rtMsg = `volu,${data.value}`
      break

    case 'open': {
      rtMsg = `open,${await ff.open()}`
      break
    }

    case 'clea':
    case 'clear':
    case 'stop':
    case 'STOP':
    case 'Stop':
      ff.clear()
      status.autoplay = false
      rtMsg = 'clea'
      break

    case 'next': {
      const result = await lf.next()
      if (!result) {
        sendItemError()
        rtMsg = 'next,err'
        await lf.next()
      }
      rtMsg = `next,${status.itemIdx}`
      break
    }

    case 'prev':
    case 'previous': {
      const result = await lf.previous()
      if (!result) {
        sendItemError()
        rtMsg = 'prev,err'
        await lf.previous()
      }
      rtMsg = `prev,${status.itemIdx}`
      break
    }
    case 'pl': {
      status.autoplay = true
      status.itemIdx = Number(data.value)
      const result = await ff.openFileIdx()
      if (!result) {
        sendItemError()
        await lf.next()
      }
      rtMsg = `pl,${status.itemIdx}`
      break
    }
    case 'item':
    case 'itemIdx': {
      status.itemIdx = Number(data.value)
      status.autoplay = false
      const result = await ff.openFileIdx()
      if (!result) {
        sendItemError()
        await lf.next()
      }
      rtMsg = `item,${status.itemIdx}`
      break
    }
    case 'openFile':
      ff.sendFileObj(data.value)
      break
    case 'getItems': {
      const items = await ff.openRemote()
      status.items = await lf.addListItems(items)
      break
    }

    case 'addItems': {
      status.items = await lf.addListItems(data.value)
      break
    }

    case 'delItem':
      await lf.delListItem(data.value)
      status.items = await lf.getListItems(status.currListName)
      break

    case 'delItems':
      await lf.delListItems(status.currListName)
      status.items = []
      break

    case 'listIdx':
    case 'list':
      status.listIdx = Number(data.value)
      status.currListName = status.list[status.listIdx].name
      status.items = await lf.getListItems(status.currListName)
      rtMsg = `list,${status.listIdx}`
      break

    case 'addList':
      await lf.addList(data.value)
      status.list = await lf.getList()
      break

    case 'addListandItems':
      await lf.addListItems(data.value.items, status.list[data.value.id].name)
      status.items = await lf.getListItems()
      break
    case 'delList':
      await lf.delList(data.value)
      break

    case 'delAll':
      await lf.delAll()
      break

    case 'ended':
      await ended()
      break

    case 'ready':
      ready()
      break

    default:
      sendMsg('control', data)
      break
  }
  sendStatus()
  if (rtMsg) {
    rtMsg.toLowerCase()
    tcpServer.send(rtMsg)
    return rtMsg
  }
}

async function ready () {
  if (status.play && status.time === 0) {
    if (status.mode === 'playlist') {
      if (!status.loopAll && status.itemIdx === 0) {
        status.play = false
        sendStatus()
        return
      }
      sendControl('play')
    } else {
      status.play = false
      sendControl('play')
    }
  }
}

async function ended () {
  if (status.mode === 'playlist') {
    // status.autoplay = false
    const result = await lf.next()
    if (!result) {
      sendItemError()
      lf.next()
    }
  } else {
    status.play = false
    status.isPlaying = false
    // status.autoplay = false
    sendMsg('status', status)
  }
}
