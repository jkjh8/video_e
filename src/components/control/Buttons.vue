<template>
  <div class="row no-warp text-black">
    <q-btn
      flat
      round
      :color="status.mode === 'playlist' ? 'orange' : 'teal'"
      :icon="status.mode === 'playlist' ? 'playlist_play' : 'play_circle_fill'"
      @click="sendMode"
    >
      <q-tooltip>Play Mode</q-tooltip>
    </q-btn>

    <q-separator class="q-mx-sm" vertical inset />

    <q-btn
      v-show="status.mode === 'playlist'"
      flat
      round
      icon="skip_previous"
      @click="sendControl('previous')"
    >
      <q-tooltip>Privious</q-tooltip>
    </q-btn>
    <q-btn
      flat
      round
      :color="status.isPlaying ? 'green' : ''"
      :icon="status.isPlaying ? 'pause' : 'play_arrow'"
      @click="play"
    >
      <q-tooltip>Play</q-tooltip>
    </q-btn>
    <q-btn
       v-show="status.mode === 'playlist'"
      flat
      round
      icon="skip_next"
      @click="sendControl('next')"
    >
      <q-tooltip>Next</q-tooltip>
    </q-btn>
    <q-btn
      :color="status.loop ? 'yellow' : ''"
      flat
      round
      icon="repeat_one"
      @click="sendControl('loop')"
    >
      <q-tooltip>Repeat One</q-tooltip>
    </q-btn>
    <q-btn
      v-show="status.mode === 'playlist'"
      flat
      round
      :color="status.loopAll ? 'orange' : ''"
      icon="repeat"
      @click="sendControl('loopAll')"
    >
      <q-tooltip>Repeat All</q-tooltip>
    </q-btn>
    <q-btn
      flat
      round
      icon="flip_to_front"
      @click="sendControl('flip')"
    >
      <q-tooltip>Window Get Front</q-tooltip>
    </q-btn>
    <q-btn
      flat
      round
      icon="file_upload"
      @click="sendControl('open')"
    >
      <q-tooltip>Open File</q-tooltip>
    </q-btn>
    <q-btn
      flat
      round
      icon="cancel_presentation"
      @click="sendControl('clear')"
    >
      <q-tooltip>Clear Source</q-tooltip>
    </q-btn>
    <q-btn
      flat
      round
      :icon="status.mute ? 'volume_off' : 'volume_up'"
    >
      <q-menu
        content-style="background: rgba( 255, 255, 255, 0.1); border-radius: 30px;"
        transition-show="scale"
        transition-hide="scale"
      >
        <div
          class="row no-wrap items-center q-px-md q-py-sm"
          style="border-radius: 30px; min-width: 250px; min-height: 20px"
        >
          <q-btn
            class="q-mr-sm"
            flat
            round
            :icon="status.mute ? 'volume_off' : 'volume_up'"
            :color="status.mute ? 'red' : ''"
            @click="sendControl('mute', !status.mute)"
          />
          <q-slider
            :value="status.volume"
            :min="0"
            :max="100"
            @input="sendControl('volume', $event)"
          />
          <div class="q-ml-lg q-mr-sm">{{ volume }}%</div>
        </div>
      </q-menu>
    </q-btn>
    <q-btn
      flat
      round
      :color="status.fullscreen ? 'red' : ''"
      :icon="status.fullscreen ? 'fullscreen_exit' : 'fullscreen'"
      @click="sendControl('fullscreen')"
    >
      <q-tooltip>Fullscreen</q-tooltip>
    </q-btn>
  </div>
</template>

<script>
import { playerfunc } from 'src/mixins/playerFunc'

export default {
  name: 'Buttons',
  mixins: [playerfunc],
  props: ['status'],
  data () {
    return {
      volume: 100
    }
  },
  methods: {
    sendMode () {
      if (this.status.mode === 'playlist') {
        this.sendControl('mode', 'nomal')
      } else {
        this.sendControl('mode', 'playlist')
      }
    },
    play () {
      if (this.status.isPlaying) {
        this.sendControl('pause')
      } else {
        this.sendControl('play')
      }
    }
  }
}
</script>
