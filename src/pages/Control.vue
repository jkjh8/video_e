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

    <q-dialog v-model="keyStatus" persistent>
      <q-card style="width: 70%; max-width: 26rem;">
        <q-card-section>
          <div class="fit row items-center">
            <q-icon name="warning" color="red" size="md"></q-icon>
            <span
              class="q-ml-sm text-bold text-h6"
            >
              라이센스 키를 입력하세요
            </span>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="q-px-md">라이센스키가 없습니다. 라이센스키를 입력 하세요. 입력후에는 라이센스 적용을 위해서 자동으로 종료 됩니다.</div>
        </q-card-section>
        <q-card-section class="fit row justify-center">
          <input
            v-model="key"
            class="q-px-md"
            style="width: 90%;"
            outlined
            @paste="paste"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn @click="updateLicense">확인</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import { ipcRenderer } from 'electron'
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
      key: null,
      keyStatus: false,
      status: {},
      clock: ''
    }
  },
  created () {
    this.sync()
    this.updateStatus()
    this.createClock()
    this.errorNotify()
    // console.log(this.status)
    // if (!this.status.locense) {
    //   this.keyStatus = true
    // }
  },
  async mounted () {
    const r = await this.getLicense()
    this.keyStatus = !r.value
  },
  methods: {
    createClock () {
      moment.locale('ko')
      setInterval(() => {
        this.clock = moment().format('LL LTS')
      }, 1000)
    },
    async updateLicense () {
      console.log('start check license')
      const result = await this.checkKey(this.key)
      this.sendSetup('license', result)
      setTimeout(() => {
        ipcRenderer.send('quit')
      }, 1000)
    },
    paste (e) {
      const clipboardData = e.clipboardData || window.clipboardData
      this.key = clipboardData.getData('Text')
    }
  }
}
</script>
