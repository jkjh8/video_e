/* eslint-disable no-undef */
import { app, Menu } from 'electron'
import files from './files'

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
          label: 'Toggle Fullscreen',
          accelerator: 'F11',
          click () { }
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Api',
          accelerator: 'F1',
          click () { }
        },
        { role: 'toggleDevTools' }
      ]
    }
  ])
)
