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

export default {
  name: 'slider',
  mixins: [msToHms],
  props: ['status'],
  methods: {
    changeTime (time) {
      console.log(time)
    }
  }
}
</script>
