<template>
  <q-page>
    <q-media-player
      ref="mediaplayer"
      :type="status.type"
      :show-spinner="status.spinner"
      :show-big-play-button="status.bigBtn"
      :no-controls="!status.controls"
      :preload="status.preload"
      :background-color="status.background"

      :autoplay="status.autoplay"
      :loop="status.loop"
      :muted="status.mute"
      :volume="status.volume"

      :sources="sources"

      @play="play"
      @playing="playing"
      @paused ="paused"
      @ended="sendControl('ended')"
      @ready="ready"
      @timeupdate="updateTime"
      @duration="duration"
    >
      <template
        v-if="!status.file && status.logo"
        v-slot:overlay
      >
        <div
          class="full-height row justify-center content-center"
        >
          <q-img
            style="max-width: 100px"
            src="logo_100.png"
          />
        </div>
      </template>
    </q-media-player>
  </q-page>
</template>

<script>
// import { ipcRenderer } from 'electron'
import { playerfunc } from '../mixins/playerFunc'

export default {
  mixins: [playerfunc],
  computed: {
    player () {
      return this.$refs.mediaplayer
    }
  },
  data () {
    return {
      status: {},
      sources: [],
      rtData: {
        control: null,
        value: null
      }
    }
  },
  async mounted () {
    await this.player.setFullscreen()
    this.sync()
    this.controlFunc()
    this.sourceChange()
    this.updateStatus()
  },
  methods: {
    play () { console.log('play') },
    playing () { this.sendStatus('isPlaying', true) },
    paused () { this.sendStatus('isPlaying', false) },
    ended () { this.sendStatus('isPlaying', false) },
    ready () { this.sendControl('ready') },
    updateTime (time) { this.sendStatus('time', time) },
    duration (time) { this.sendStatus('duration', time) }
  }
}
</script>

<style>
/* .q-media {
  pointer-events: none;
} */
::-webkit-scrollbar {
    display: none;
}
</style>
