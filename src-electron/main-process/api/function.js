import { BrowserWindow } from 'electron'

export const sendMsg = function (addr, data) {
  const wins = BrowserWindow.getAllWindows()
  wins.forEach(win => {
    if (win) {
      win.webContents.send(addr, data)
    }
  })
}

export const enterFullscreen = function () {
  const win = BrowserWindow.fromId(1)
  if (win && win.isFullScreen()) {
    win.setFullScreen(false)
    return false
  } else {
    win.setFullScreen(true)
    return true
  }
}
