<template>
  <div @mouseover="mouseOver">
    <div
      v-if="hover"
    >
      <q-slider
        :value="status.time"
        :min="0"
        :max="status.duration"
        color="teal"
        label
        :label-value="`${msToHms(status.currentTime * 1000)}/${msToHms(status.duration * 1000)}`"
        @input="changeTime"
      />
    </div>
    <div
      v-else
    >
      <q-linear-progress
        :value="status.time/status.duration"
        color="teal"
      />
    </div>
  </div>
</template>

<script>
import { msToHms } from '../../mixins/msToHMS'

export default {
  name: 'slider',
  mixins: [msToHms],
  props: ['status'],
  data () {
    return {
      hover: false
    }
  },
  methods: {
    changeTime (time) {
      console.log(time)
    },
    mouseOver () {
      console.log('mouse')
    }
  }
}
</script>
