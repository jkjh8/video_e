/* eslint-disable no-undef */
import fileType from 'file-type'
import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { app, dialog } from 'electron'
import { sendMsg, genThunbnail } from '../function'

const folder_temp = path.join(app.getPath('userData'), 'tmp')
const folder_thumbnail = path.join(app.getPath('userData'), 'tmp/thumbnail')
const folder_thumbnail_playlist = path.join(app.getPath('userData'), 'tmp/thumbnail/playlist')

!fs.existsSync(folder_temp) && fs.mkdirSync(folder_temp)
!fs.existsSync(folder_thumbnail) && fs.mkdirSync(folder_thumbnail)
!fs.existsSync(folder_thumbnail_playlist) && fs.mkdirSync(folder_thumbnail_playlist)

async function getFileObj (file, playlist = '') {
  const type = await fileType.fromFile(file)
  const uuid = await uuidv4()
  let thumbnail = ''
  if (playlist) {
    thumbnail = `${uuid}.png`
  }
  return {
    file: file,
    name: await path.basename(file),
    path: await path.dirname(file),
    type: type.mime,
    ext: type.ext,
    src: `${status.stream}?file=${encodeURIComponent(file)}&type=${type.mime}`,
    uuid: uuid,
    thumbnail: thumbnail,
    playlist: playlist
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
  return true
}

async function sendFileObj (file) {
  if (status.file && !status.file.playlist) {
    await fs.unlinkSync(path.join(folder_thumbnail, `${status.file.uuid}.png`))
  }
  status.file = await getFileObj(file)
  await genThunbnail(status.file.file, status.file.uuid)
  windows.mainWindow.webContents.send('file', status.file)
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

const files = {
  getFileObj: getFileObj,
  open: open,
  openRemote: openRemote,
  openFileIdx: openFileIdx,
  sendFileObj: sendFileObj,
  clear: clear
}
export default files
