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
  logo: true,

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
