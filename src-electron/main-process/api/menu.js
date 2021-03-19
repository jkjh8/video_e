/* eslint-disable no-undef */
import { app, Menu } from 'electron'
import { createApiWindow } from './createWindow'
import { enterFullscreen } from './function'
import files from './files'
import controls from './player'

Menu.setApplicationMenu(
  Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {
          label: 'Open',
          accelerator: 'CommandOrControl+O',
          click () {
            files.open()
          }
        },
        {
          label: 'OpenControlWindow',
          accelerator: 'F4',
          click () { windows.controlWindow.show() }
        },
        {
          label: 'Exit',
          accelerator: 'CommandOrControl+F4',
          click () { app.quit() }
        }
      ]
    },
    {
      label: 'Function',
      submenu: [
        {
          label: 'Playlist Mode',
          type: 'checkbox',
          accelerator: 'CommandOrControl+m',
          click () {
            if (status.mode === 'playlist') {
              controls({ addr: 'mode', value: 'nomal' })
            } else {
              controls({ addr: 'mode', value: 'playlist' })
            }
          }
        },
        {
          label: 'Toggle Fullscreen',
          accelerator: 'F11',
          click () { enterFullscreen() }
        },
        { type: 'separator' },
        {
          label: 'Play/Pause',
          accelerator: 'Space',
          click () {
            if (status.isPlaying) {
              controls({ addr: 'pause' })
            } else {
              controls({ addr: 'play' })
            }
          }
        },
        {
          label: 'Next',
          accelerator: 'CommandOrControl+Right',
          click () {
            controls({ addr: 'next' })
          }
        },
        {
          label: 'Previous',
          accelerator: 'CommandOrControl+Left',
          click () {
            controls({ addr: 'previous' })
          }
        },
        {
          label: 'Seek +5',
          accelerator: 'right',
          click () {
            controls({ addr: 'time', value: status.time + 5 })
          }
        },
        {
          label: 'Seek -5',
          accelerator: 'left',
          click () {
            controls({ addr: 'time', value: status.time - 5 })
          }
        },
        {
          label: 'Seek +10',
          accelerator: 'Shift+right',
          click () {
            controls({ addr: 'time', value: status.time + 10 })
          }
        },
        {
          label: 'Seek -10',
          accelerator: 'Shift+left',
          click () {
            controls({ addr: 'time', value: status.time - 10 })
          }
        },
        { type: 'separator' },
        {
          label: 'Logo',
          type: 'checkbox',
          click () {
            if (status.logo) {
              controls({ addr: 'mode', value: 'nomal' })
            } else {
              controls({ addr: 'mode', value: 'playlist' })
            }
          }
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Api',
          accelerator: 'F1',
          click () { createApiWindow(windows) }
        },
        { role: 'toggleDevTools' }
      ]
    }
  ])
)
