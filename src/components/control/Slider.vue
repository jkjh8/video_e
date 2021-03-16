<template>
  <div>
    <q-slider
      :value="status.time"
      :min="0"
      :max="status.duration"
      color="teal"
      label
      :label-value="`${msToHms(status.time * 1000)}/${msToHms(status.duration * 1000)}`"
      @input="changeTime"
    />
  </div>
</template>

<script>
import { msToHms } from '../../mixins/msToHMS'
import { playerfunc } from '../../mixins/playerFunc'

export default {
  name: 'slider',
  mixins: [msToHms, playerfunc],
  props: ['status'],
  methods: {
    changeTime (time) {
      this.sendControl('time', time)
    }
  }
}
</script>
