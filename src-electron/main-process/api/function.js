import { BrowserWindow } from 'electron'

export const sendMsg = function (addr, data) {
  const wins = BrowserWindow.getAllWindows()
  wins.forEach(win => {
    if (win) {
      win.webContents.send(addr, data)
    }
  })
}
