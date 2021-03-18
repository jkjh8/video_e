<template>
  <q-page class="flex flex-center">
    <q-img
      alt="logo"
      style="width: 100px;"
      src="logo_100.png"
    />
  </q-page>
</template>

<script>
import { remote, ipcRenderer } from 'electron'
export default {
  name: 'PageIndex',
  async created () {
    const route = await ipcRenderer.sendSync('getWindows')
    const win = await remote.getCurrentWindow()
    for (const prop in route) {
      if (route[prop].id === win.id) {
        this.$router.push(route[prop].route)
      }
    }
  }
}
</script>
