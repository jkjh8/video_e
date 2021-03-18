import { app, BrowserWindow } from 'electron'
import os from 'os'
import fs from 'fs'
import path from 'path'

const thumbFolder = path.join(app.getPath('userData'), 'tmp', 'thumbnail')

fs.readdir(thumbFolder, (err, files) => {
  if (err) throw err
  for (const file of files) {
    fs.unlink(path.join(thumbFolder, file), err => {
      if (err) throw err
    })
  }
})

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

export const genThunbnail = function () {
  if (status.arch === 'arm64') {
    status.thumbnail = ''
    return status
  }
  const fileName = `${path.basename(status.file.file).split('.')[0]}.png`
  const result = fs.existsSync(path.join(thumbFolder, fileName))
  if (result) {
    status.thumbnail = `${status.static}/thumbnail/${fileName}`
    if (windows.controlWindow) {
      windows.controlWindow.webContents.send('status', status)
    }
  } else {
    ffmpeg(status.file.file)
      .on('end', () => {
        status.thumbnail = `${status.static}/thumbnail/${fileName}`
        if (windows.controlWindow) {
          windows.controlWindow.webContents.send('status', status)
        }
      })
      .screenshot({
        timestamps: ['00:00:02'],
        filename: fileName,
        folder: thumbFolder,
        size: '640x360'
      })
  }
  return status
}
