/* eslint-disable no-undef */
import { dialog } from 'electron'
import path from 'path'

const fileType = require('file-type')
const func = require('../function')

async function getFileObj (file) {
  const type = await fileType.fromFile(file)
  return {
    file: file,
    name: await path.basename(file),
    path: await path.dirname(file),
    type: type.mime,
    ext: type.ext,
    src: `${status.stream}?file=${encodeURIComponent(file)}&type=${type.mime}`
  }
}

async function open () {
  const files = await dialog.showOpenDialogSync({
    filters: [
      {
        name: 'Video',
        extensions: ['mp4', 'mov', 'avi', 'webm', 'mkv']
      },
      {
        name: 'All Files',
        extensions: ['*']
      }
    ],
    properties: ['openFile']
  })
  if (files && files.length > 0) {
    status.isPlaying = false
    await sendFileObj(files[0])
    return status.file
  }
}

async function openFileIdx () {
  status.file = status.items[status.itemIdx]
  windows.mainWindow.send('file', status.file)
  if (status.mode === 'nomal') {
    status.play = false
  }
  status.isPlaying = false
  func.sendMsg('status', status)
  return status
}

async function sendFileObj (file) {
  status.file = await getFileObj(file)
  windows.mainWindow.webContents.send('file', status.file)
  func.sendMsg('status', status)
  return fileObj
}

async function openRemote () {
  return await dialog.showOpenDialogSync({
    filters: [
      {
        name: 'Video',
        extensions: ['mp4', 'avi', 'webm', 'mkv', 'MKV']
      },
      {
        name: 'All Files',
        extensions: ['*']
      }
    ],
    properties: ['openFile', 'multiSelections']
  })
}

function clear () {
  status.file = null
  func.sendMsg('status', status)
  func.sendMsg('file', null)
  return null
}

const files = { getFileObj: getFileObj, open: open, openRemote: openRemote, openFileIdx: openFileIdx, sendFileObj: sendFileObj, clear: clear }
export default files
