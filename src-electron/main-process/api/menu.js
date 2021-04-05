/* eslint-disable no-undef */
import { app, Menu } from 'electron'
import { createApiWindow } from './createWindow'
import { sendStatus, enterFullscreen } from './function'
import files from './files'
import controls from './player'
import setup from './setup'

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
        {
          label: 'Minimize Window',
          accelerator: 'F12',
          click () { windows.mainWindow.minimize() }
        },
        {
          label: 'Show Window',
          accelerator: 'CommandOrControl+f',
          click () { controls({ addr: 'flip' }) }
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
          label: 'Show Logo',
          type: 'checkbox',
          // checked: status.logo,
          click () {
            if (status.logo) {
              setup.setLogo(false)
            } else {
              setup.setLogo(true)
            }
            sendStatus()
          }
        },
        {
          label: 'Background White',
          type: 'checkbox',
          async click () {
            status.background = await setup.setBgColor()
            sendStatus()
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
