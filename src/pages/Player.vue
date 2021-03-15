<template>
  <div>
    <div class="text-h1">Player</div>
    <q-btn @click="showControlWin">show</q-btn>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  methods: {
    showControlWin () {
      ipcRenderer.send('showControlWindow')
    }
  }
}
</script>
