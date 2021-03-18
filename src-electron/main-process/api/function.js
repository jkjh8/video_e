import { app, BrowserWindow } from 'electron'
import os from 'os'
import fs from 'fs'
import path from 'path'

const folder_thumbnail = path.join(app.getPath('userData'), 'tmp', 'thumbnail')

let ffmpeg
const arch = os.arch()
if (arch !== 'arm64') {
  const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path.replace('app.asar', 'app.asar.unpacked')
  const ffprobePath = require('@ffprobe-installer/ffprobe').path.replace('app.asar', 'app.asar.unpacked')
  ffmpeg = require('fluent-ffmpeg')
  ffmpeg.setFfmpegPath(ffmpegPath)
  ffmpeg.setFfprobePath(ffprobePath)
  console.log(ffmpegPath, ffprobePath)
}

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

export const genThunbnail = function (file, fileName, filePath = '') {
  if (status.arch === 'arm64') {
    return ''
  }
  // if (status.file && !status.file.playlist) {
  //   status.file.thumbnail = ''
  // }
  ffmpeg(file)
    .on('end', () => {
      if (status.file && !status.file.playlist) {
        status.file.thumbnail = `${fileName}.png`
        sendMsg('status', status)
      }
      return fileName
    })
    .screenshot({
      timestamps: ['00:00:02'],
      filename: fileName,
      folder: path.join(folder_thumbnail, filePath),
      size: '640x360'
    })
}
