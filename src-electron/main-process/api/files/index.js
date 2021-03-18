/* eslint-disable no-undef */
import fileType from 'file-type'
import fs from 'fs'
import path from 'path'
import { dialog } from 'electron'
import { genThunbnail, sendMsg } from '../function'

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
    return status
  }
}

async function openFileIdx () {
  const result = await fs.existsSync(status.items[status.itemIdx].file)
  status.file = status.items[status.itemIdx]
  if (!result) {
    return false
  }
  windows.mainWindow.send('file', status.file)
  if (status.mode === 'nomal') {
    status.play = false
  }
  status.isPlaying = false
  sendMsg('status', status)
  genThunbnail()
  return true
}

async function sendFileObj (file) {
  status.file = await getFileObj(file)
  windows.mainWindow.webContents.send('file', status.file)
  genThunbnail()
  sendMsg('status', status)
  return status.file
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
  sendMsg('status', status)
  sendMsg('file', null)
  return null
}

const files = { getFileObj: getFileObj, open: open, openRemote: openRemote, openFileIdx: openFileIdx, sendFileObj: sendFileObj, clear: clear }
export default files
