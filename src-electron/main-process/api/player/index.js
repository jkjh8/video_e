import ff from '../files'
import lf from '../playlist'
import { sendMsg, enterFullscreen } from '../function'

export default async function (data) {
  switch (data.addr) {
    case 'fullscreen':
      enterFullscreen()
      break
    case 'flip':
      windows.mainWindow.show()
      break
    case 'open':
      status.isPlaying = false
      status.play = false
      ff.open()
      break
    case 'clear':
      status.isPlaying = false
      status.play = false
      status.thumbnail = ''
      ff.clear()
      break
    case 'next': {
      const result = await lf.next()
      if (!result) {
        sendMsg('error', {
          message: 'The file does not exist',
          caption: status.items[status.itemIdx].name
        })
        await lf.next()
      }
      break
    }
    case 'previous': {
      const result = await lf.previous()
      if (!result) {
        sendMsg('error', {
          message: 'The file does not exist',
          caption: status.items[status.itemIdx].name
        })
        await lf.previous()
      }
      break
    }
    case 'itemIdx': {
      status.itemIdx = data.value
      const result = await ff.openFileIdx()
      console.log(result)
      if (!result) {
        sendMsg('error', {
          message: 'The file does not exist',
          caption: status.items[status.itemIdx].name
        })
        await lf.next()
      }
      sendMsg('status', status)
      break
    }
    case 'getItems': {
      const items = await ff.openRemote()
      status.items = await lf.addListItems(items)
      sendMsg('status', status)
      break
    }
    case 'addItems': {
      status.items = await lf.addListItems(data.value)
      sendMsg('status', status)
      break
    }
    case 'delItem':
      await lf.delListItem(data.value)
      status.items = await lf.getListItems(status.currListName)
      sendMsg('status', status)
      break
    case 'delItems':
      await lf.delListItems(status.currListName)
      status.items = []
      sendMsg('status', status)
      break

    case 'listIdx':
      status.listIdx = data.value
      status.currListName = status.list[status.listIdx].name
      status.items = await lf.getListItems(status.currListName)
      sendMsg('status', status)
      break
    case 'addList':
      await lf.addList(data.value)
      status.list = await lf.getList()
      sendMsg('status', status)
      break
    case 'delList':
      await lf.delList(data.value)
      status.list = await lf.getList()
      if (status.listIdx > status.list.length - 1) {
        status.listIdx = status.list.length - 1
        status.currListName = status.list[status.listIdx].name
      }
      status.items = await lf.getListItems(status.currListName)
      sendMsg('status', status)
      break
    case 'delAll':
      await lf.delAll()
      status.list = await lf.getList()
      status.items = await lf.getListItems('default')
      sendMsg('status', status)
      break
    case 'ended':
      await ended()
      break
    case 'ready':
      if (status.play) {
        if (status.mode === 'playlist') {
          if (!status.loopAll && status.itemIdx === 0) {
            status.play = false
            sendMsg('status', status)
            break
          }
          sendMsg('control', { addr: 'play' })
        } else {
          status.play = false
          sendMsg('control', { addr: 'play' })
        }
      }
      break

    default:
      sendMsg('control', data)
      break
  }
}

async function ended () {
  if (status.mode === 'playlist') {
    const result = await lf.next()
    if (!result) {
      sendMsg('error', {
        message: 'The file does not exist',
        caption: status.items[status.itemIdx].name
      })
      lf.next()
    }
  } else {
    status.play = false
    status.isPlaying = false
    sendMsg('status', status)
  }
}
