import setup from './setup'
import { Menu } from 'electron'
import { sendStatus } from './function'

const status = {
  arch: '',

  type: 'video',
  spinner: false,
  bigBtn: false,
  constrols: false,
  preload: 'auto',
  background: 'black',

  autoplay: false,
  mute: false,
  volume: 100,
  loop: false,

  mode: 'nomal',
  play: false,
  isPlaying: false,
  fullscreen: false,
  file: null,
  thumbnail: '',
  logo: false,

  duration: 0,
  time: 0,

  loopAll: false,
  list: [],
  items: [],
  listIdx: 0,
  itemIdx: 0,
  currListName: 'default',

  stream: 'http://localhost:9074/stream',
  url: 'http://localhost:9074'
}

setTimeout(async () => {
  status.logo = await setup.getLogo()
  status.background = await setup.getBgColor()
  sendStatus()
  Menu.getApplicationMenu().items[1].submenu.items[11].checked = status.logo
  if (status.background === 'white')
  Menu.getApplicationMenu().items[1].submenu.items[12].checked = true
}, 1000)

const windows = {
  mainWindow: null,
  controlWindow: null,
  apiWindow: null
}

const route = {
  mainWindow: {
    id: 1,
    route: 'player'
  },
  controlWindow: {
    id: 2,
    route: 'control'
  },
  apiWindow: {
    id: null,
    route: 'api'
  }
}

global.route = route
global.windows = windows
global.status = status
