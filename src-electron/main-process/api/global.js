const status = {
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

  mode: 'noaml',
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

  stream: 'http://localhost:12300/stream'
}

const windows = { mainWindow: null, controlWindow: null }

global.windows = windows
global.status = status
