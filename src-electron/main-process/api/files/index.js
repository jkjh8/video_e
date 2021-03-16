/* eslint-disable no-undef */
import { dialog } from 'electron'
import path from 'path'

const func = require('../function')

async function getFileObj (fileName) {
  const filePath = await path.parse(fileName)
  const ext = await filePath.ext.split('.').pop()
  let type
  if (ext === 'mp3' || ext === 'wav' || ext === 'flac') {
    type = 'audio'
  } else {
    type = 'video'
  }
  return {
    file: fileName,
    type: `${type}/${ext}`,
    src: `${status.stream}?file=${encodeURIComponent(fileName)}&type=${type}/${ext}`
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
    status.file = await getFileObj(files[0])
    windows.mainWindow.webContents.send('file', status.file)
    func.sendStatus('status', status)
    return status.file
  }
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
  windows.mainWindow.webContents.send('file', null)
  return null
}

const files = { getFileObj: getFileObj, open: open, openRemote: openRemote, clear: clear }
export default files
