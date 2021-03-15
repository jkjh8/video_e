<template>
  <q-page class="flex flex-center">
    <q-img
      alt="Quasar logo"
      style="width: 100px;"
      src="~assets/logo.png"
    />
  </q-page>
</template>

<script>
import { remote, ipcRenderer } from 'electron'
export default {
  name: 'PageIndex',
  created () {
    const win = remote.getCurrentWindow()
    const route = ipcRenderer.sendSync('getWindow', win.id)
    if (route === 1) {
      this.$router.push('player')
    } else {
      this.$router.push('control')
    }
  }
}
</script>
