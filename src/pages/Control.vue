<template>
  <div>
    <div class="text-h1">Control</div>
    <q-footer>
      <ControlPanel :status="status" />
    </q-footer>
  </div>
</template>

<script>
import { playerfunc } from '../mixins/playerFunc'
import ControlPanel from '../components/ControlPanel'

export default {
  name: 'Control',
  mixins: [playerfunc],
  components: { ControlPanel },
  data () {
    return {
      status: {}
    }
  },
  created () {
    this.sync()
    this.updateStatus()
  }
}
</script>
