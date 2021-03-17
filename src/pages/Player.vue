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
      :playsinline="true"

      :autoplay="status.autoplay"
      :loop="status.loop"
      :muted="status.mute"
      :volume="status.volume"

      :sources="sources"

      @play="play"
      @playing="sendStatus('isPlaying', true)"
      @paused ="sendStatus('isPlaying', false)"
      @ended="sendControl('ended')"
      @ready="sendControl('ready')"
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
  created () {
    this.controlFunc()
    this.sourceChange()
    this.updateStatus()
  },
  mounted () {
    // this.player.setFullscreen()
    this.sync()
  },
  methods: {
    play () { console.log('play') },
    updateTime (time) { this.sendStatus('time', time) },
    duration (time) { this.sendStatus('duration', time) }
  }
}
</script>

<style>
.q-media {
  position: relative;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
::-webkit-scrollbar {
    display: none;
}
</style>
