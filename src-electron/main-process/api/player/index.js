import fileFunc from '../files'
import listFunc from '../playlist'
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
      fileFunc.open()
      break
    case 'clear':
      status.isPlaying = false
      status.play = false
      status.thumbnail = ''
      fileFunc.clear()
      break
    case 'next': {
      const result = await listFunc.next()
      if (!result) {
        sendMsg('error', {
          message: 'The file does not exist',
          caption: status.items[status.itemIdx].name
        })
        await listFunc.next()
      }
      break
    }
    case 'previous': {
      const result = await listFunc.previous()
      if (!result) {
        sendMsg('error', {
          message: 'The file does not exist',
          caption: status.items[status.itemIdx].name
        })
        await listFunc.previous()
      }
      break
    }
    case 'itemIdx': {
      status.itemIdx = data.value
      const result = await fileFunc.openFileIdx()
      if (!result) {
        sendMsg('error', {
          message: 'The file does not exist',
          caption: status.items[status.itemIdx].name
        })
        await listFunc.next()
      }
      sendMsg('status', status)
      break
    }
    case 'getItems': {
      const items = await fileFunc.openRemote()
      status.items = await listFunc.addListItems(items)
      sendMsg('status', status)
      break
    }
    case 'addItems': {
      status.items = await listFunc.addListItems(data.value)
      sendMsg('status', status)
      break
    }
    case 'delItem':
      await listFunc.delListItem(data.value)
      status.items = await listFunc.getListItems(status.currListName)
      sendMsg('status', status)
      break
    case 'delItems':
      await listFunc.delListItems(status.currListName)
      status.items = []
      sendMsg('status', status)
      break
    case 'listIdx':
      status.listIdx = data.value
      status.currListName = status.list[status.listIdx]
      status.items = await listFunc.getListItems(status.currListName)
      sendMsg('status', status)
      break
    case 'addList':
      await listFunc.addList(data.value)
      status.list = await listFunc.getList()
      sendMsg('status', status)
      break
    case 'delList':
      await listFunc.delList(data.value)
      status.list = await listFunc.getList()
      if (status.listIdx > status.list.length - 1) {
        status.listIdx = status.list.length - 1
        status.currListName = status.list[status.listIdx]
        status.items = await listFunc.getListItems(status.currListName)
      }
      sendMsg('status', status)
      break
    case 'delAll':
      await listFunc.delAll()
      status.list = []
      status.items = []
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
    const result = await listFunc.next()
    if (!result) {
      sendMsg('error', {
        message: 'The file does not exist',
        caption: status.items[status.itemIdx].name
      })
      listFunc.next()
    }
  } else {
    status.play = false
    status.isPlaying = false
    sendMsg('status', status)
  }
}
