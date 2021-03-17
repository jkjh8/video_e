<template>
  <div>
    <q-card flat>
        <q-card-section class="flex nowarp items-center">
          <div class="text-h6">
            <q-icon
              class="text-teal"
              size="md"
              name="play_circle_filled"
            />
            Playlist
          </div>
          <q-space />
          <div>
            {{ clock }}
          </div>
        </q-card-section>
        <q-card-section class="row">
          <div class="col-8">
            <Items
              :status="status"
            />
          </div>
          <div class="col-4">
            <List
              :status="status"
            />
          </div>
        </q-card-section>
      </q-card>
    <q-footer>
      <ControlPanel :status="status" />
    </q-footer>
  </div>
</template>

<script>
import moment from 'moment'
import { playerfunc } from '../mixins/playerFunc'
import List from '../components/playlist/List'
import Items from '../components/playlist/Items'
import ControlPanel from '../components/ControlPanel'

export default {
  name: 'Control',
  mixins: [playerfunc],
  components: { Items, List, ControlPanel },
  data () {
    return {
      status: {},
      clock: ''
    }
  },
  created () {
    this.sync()
    this.updateStatus()
    this.createClock()
  },
  methods: {
    createClock () {
      moment.locale('ko')
      setInterval(() => {
        this.clock = moment().format('LL LTS')
      }, 1000)
    }
  }
}
</script>
