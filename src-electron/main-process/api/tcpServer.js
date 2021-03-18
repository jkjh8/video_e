import tcpServer from './socket'
import fileFunc from './files'
import controls from './player'
import fs from 'fs'
import { sendMsg } from './function'

tcpServer.read('13333', async (data) => {
  console.log('from tcpServer : ', data)
  const comm = data.split(',')
  const control = {
    addr: comm[0].toLowerCase(),
    value: comm[1],
    value2: comm[2]
  }
  switch (control.addr) {
    case 'mode': {
      const value = control.value.toLowerCase()
      console.log(value)
      if (value === 'playlist') {
        status.mode = 'playlist'
      } else {
        status.mode = 'nomal'
      }
      sendMsg('status', status)
      break
    }
    case 'play':
      controls({ addr: 'play' })
      break
    case 'pp':
      status.mode = 'playlist'
      status.play = true
      controls({ addr: 'play' })
      break
    case 'pf': {
      const result = await fs.existsSync(control.value)
      console.log(result)
      if (result) {
        try {
          fileFunc.sendFileObj(control.value)
        } catch (err) {
          return err
        }
      }
      status.play = true
      controls({ addr: 'play' })
      break
    }
    case 'pl':
      if (status.items.length < control.value) {
        return
      }
      status.play = true
      controls({ addr: 'itemIdx', value: control.value })
      controls({ addr: 'play' })
      break
    case 'pause':
      controls({ addr: 'pause' })
      break
    case 'clear':
      controls({ addr: 'clear' })
      break
    case 'cl':
      if (status.list.length < control.value) {
        break
      }
      controls({ addr: 'listIdx', value: control.value })
      break
    case 'ci':
      if (status.items.length < control.value) {
        break
      }
      controls({ addr: 'itemIdx', value: control.value })
      break
    case 'next':
      controls({ addr: 'next' })
      break
    case 'previous':
      controls({ addr: 'previous' })
      break
    case 'fs':
      controls({ addr: 'fullscreen' })
      break
    case 'reqfs':
      if (windows.mainWindow && !windows.mainWindow.isFullScreen()) {
        windows.mainWindow.setFullScreen(true)
      }
      break
    case 'leafs':
      if (windows.mainWindow && windows.mainWindow.isFullScreen()) {
        windows.mainWindow.setFullScreen(false)
      }
      break
    case 'loop':
      status.loop = control.value === 'true'
      sendMsg('status', status)
      break
    case 'loopAll':
      status.loopAll = control.value === 'true'
      sendMsg('status', status)
      break
    case 'flip':
      if (windows.mainWindow) {
        windows.mainWindow.show()
      }
      break
    case 'mute':
      status.mute = control.value === 'true'
      sendMsg('status', status)
      break
    case 'vol':
      console.log(control)
      status.volume = Number(control.value)
      sendMsg('status', status)
      break
  }
})
