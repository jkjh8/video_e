import { ipcRenderer } from 'electron'

export const playerfunc = {
  methods: {
    sendControl (addr, data) {
      ipcRenderer.send('control', { addr: addr, value: data })
    },
    sendStatus (addr, data) {
      ipcRenderer.send('status', { addr: addr, value: data })
    },
    controlFunc () {
      ipcRenderer.on('control', (e, control) => {
        switch (control.addr) {
          case 'play':
            console.log('play')
            this.player.play()
            break
          case 'pause':
            console.log('pause')
            this.player.pause()
            break
          case 'time':
            this.player.setCurrentTime(control.value)
            break
        }
      })
    },
    async sync () {
      this.status = await ipcRenderer.sendSync('sync')
    },
    sourceChange () {
      ipcRenderer.on('file', (e, file) => {
        this.sources = [file]
      })
    },
    updateStatus () {
      ipcRenderer.on('status', (e, data) => {
        this.status = data
      })
    },
    errorNotify () {
      ipcRenderer.on('error', (e, msg) => {
        this.$q.notify({
          position: 'top',
          timeout: 1500,
          message: msg.message,
          caption: msg.caption
        })
      })
    }
  }
}
