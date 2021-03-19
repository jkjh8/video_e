import { app, BrowserWindow } from 'electron'
import os from 'os'
import path from 'path'

const folderThumbnail = path.join(app.getPath('userData'), 'tmp', 'thumbnail')

let ffmpeg
const arch = os.arch()
if (arch !== 'arm64') {
  const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path.replace('app.asar', 'app.asar.unpacked')
  const ffprobePath = require('@ffprobe-installer/ffprobe').path.replace('app.asar', 'app.asar.unpacked')
  ffmpeg = require('fluent-ffmpeg')
  ffmpeg.setFfmpegPath(ffmpegPath)
  ffmpeg.setFfprobePath(ffprobePath)
}

export const sendMsg = function (addr, data) {
  // eslint-disable-next-line no-undef
  for (const [, win] of Object.entries(windows)) {
    if (win) {
      win.webContents.send(addr, data)
    }
  }
}

export const sendStatus = function (addr, data) {
  // eslint-disable-next-line no-undef
  for (const [, win] of Object.entries(windows)) {
    if (win) {
      win.webContents.send('status', status)
    }
  }
}

export const sendControl = function (addr, data) {
  // eslint-disable-next-line no-undef
  for (const [, win] of Object.entries(windows)) {
    if (win) {
      win.webContents.send('control', {
        addr: addr,
        value: data
      })
    }
  }
}

export const sendItemError = function () {
  const wins = BrowserWindow.getAllWindows()
  wins.forEach(win => {
    if (win) {
      win.webContents.send('error', {
        message: 'The file does not exist',
        caption: status.items[status.itemIdx].name
      })
    }
  })
}

export const enterFullscreen = async function () {
  const win = windows.mainWindow
  if (win && win.isFullScreen()) {
    win.setFullScreen(false)
    return false
  } else {
    win.setFullScreen(true)
    return true
  }
}

export const genThunbnail = function (file, fileName, filePath = '') {
  if (status.arch === 'arm64') {
    return ''
  }
  ffmpeg(file)
    .on('end', () => {
      if (status.file && !status.file.playlist) {
        status.file.thumbnail = `${fileName}.png`
        sendStatus()
      }
      return fileName
    })
    .screenshot({
      timestamps: ['00:00:02'],
      filename: fileName,
      folder: path.join(folderThumbnail, filePath),
      size: '640x360'
    })
}
