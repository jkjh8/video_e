import { ipcMain } from 'electron'
const func = require('../function')

ipcMain.on('status', (event, data) => {
  status[data.addr] = data.value
  func.sendMsg('status', status)
})

ipcMain.on('sync', (event) => {
  event.returnValue = status
})

ipcMain.on('control', (event, data) => {
  func.sendMsg('control', data)
})
