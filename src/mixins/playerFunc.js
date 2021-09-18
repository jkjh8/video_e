import { ipcRenderer } from 'electron'
import moment from 'moment'
import Crypto from 'crypto-js'

export const playerfunc = {
  methods: {
    sendControl (addr, data) {
      ipcRenderer.send('control', { addr: addr, value: data })
    },
    async sendSetup (addr, data) {
      ipcRenderer.send('setup', { addr: addr, value: data })
    },
    async getLicense () {
      const r = await ipcRenderer.sendSync('license')
      return r
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
    },
    checkKey (key) {
      const reference = moment().format('YYYY/MM')
      const refKey = Crypto.AES.encrypt(reference, 'password').toString()
      const compair = Crypto.AES.decrypt(key, 'password').toString(Crypto.enc.Utf8)
      console.log({ reference, refKey, compair })
      if (reference === compair) {
        return true
      } else {
        return false
      }
    }
  }
}
