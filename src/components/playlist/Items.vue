<template>
  <q-card
    class="q-mr-sm"
    bordered
    flat
  >
    <q-card-section
      class="row no-warp items-center"
    >
      <div
        class="text-body1"
      >
        Playlist items
      </div>
      <q-space />
      <div>
        <q-btn
          flat
          round
          icon="add_circle"
          @click="sendControl('addItems')"
        >
        </q-btn>
        <q-btn
          flat
          round
          icon="remove_circle"
          @click="$refs.dialog.dialog = true"
        >
        </q-btn>
      </div>
    </q-card-section>

    <q-card-section
      class="q-pa-none"
    >
      <div @dragover="dragover" @dragleave="dragleave" @drop="drop">
        <q-list :style="over ? 'background: #F0F8FF' : ''">
          <q-item
            v-for="(item, idx) in status.items"
            :key="idx"
            :active="status.itemIdx === idx"
            @click.native.prevent="sendControl('itemIdx', idx)"
            clickable
          >
            <q-item-section top>
              <div>{{ item.name }}</div>
              <div
                class="text-caption text-blue-grey"
              >
                {{ item.path }}
              </div>
            </q-item-section>

            <q-item-section top side>
              <q-btn
                flat
                round
                color="red"
                icon="delete"
                @click.capture.stop="sendControl('delItem', item)"
              >
              </q-btn>
            </q-item-section>
          </q-item>
        </q-list>
        <div
          v-if="dragDropWin"
          class="fit row wrap justify-center items-center content-center"
          :style="over ? 'background: #F0F8FF' : ''"
          style="min-height: 58px;"
        >
          <div>click the open button or drag and drop video file</div>
        </div>
      </div>
    </q-card-section>
    <ConfirmDialog
      ref="dialog"
      :contents="contents"
      @confirm="sendControl('delItems')"
    />
  </q-card>
</template>

<script>
// import path from 'path'
import { ipcRenderer } from 'electron'
import ConfirmDialog from './Confirm'
import { playerfunc } from '../../mixins/playerFunc'

export default {
  name: 'PlaylistItems',
  mixins: [playerfunc],
  components: { ConfirmDialog },
  props: ['status'],
  computed: {
    dragDropWin () {
      if (this.status.items && this.status.items.length > 0) {
        return false
      } else {
        return true
      }
    }
  },
  data () {
    return {
      contents: {
        name: 'Delete All Items',
        text: 'Do you want to delete all items?'
      },
      over: false
    }
  },
  methods: {
    callFileDialog () {
      ipcRenderer.send('control', { control: 'getItems' })
    },
    clickItem (idx) {
      ipcRenderer.send('control', { control: 'itemIdx', value: idx })
    },
    deleteItem (item) {
      ipcRenderer.send('control', { control: 'delItem', value: item })
    },
    deleteAllItems () {
      ipcRenderer.send('control', { control: 'delItems' })
    },
    dragover (event) {
      event.preventDefault()
      this.over = true
    },
    dragleave (event) {
      this.over = false
    },
    drop (event) {
      event.preventDefault()
      const files = event.dataTransfer.files
      const fileArray = []
      for (let i = 0; i < files.length; i++) {
        if (files[i].type.includes('video')) {
          fileArray.push(files[i].path)
        }
      }
      ipcRenderer.send('control', { control: 'addItems', value: fileArray })
      if (fileArray.length > 0) {
        this.$q.notify({
          position: 'top',
          timeout: 1000,
          message: 'Add files in list',
          caption: fileArray.join('\n')
        })
      }
      this.over = false
    }
  }
}
</script>
