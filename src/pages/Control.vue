<template>
  <div>
    <div class="text-h1">Control</div>
    <q-footer>
      <ControlPanel :status="status" />
    </q-footer>
  </div>
</template>

<script>
import { sendMsg } from '../mixins/sendMsg'
import ControlPanel from '../components/ControlPanel'

export default {
  name: 'Control',
  mixins: [sendMsg],
  components: { ControlPanel },
  data () {
    return {
      status: null
    }
  },
  created () {
    this.sync()
    this.updateStatus()
  }
}
</script>
