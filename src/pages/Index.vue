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
import { remote } from 'electron'
export default {
  name: 'PageIndex',
  created () {
    const win = remote.getCurrentWindow()
    if (win.id === 1) {
      this.$router.push('player')
    } else {
      this.$router.push('control')
    }
  }
}
</script>
