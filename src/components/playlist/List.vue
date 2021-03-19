<template>
  <q-card
    class="q-ml-sm"
    bordered
    flat
  >
    <q-card-section
      class="row no-warp items-center"
    >
      <div class="text-body1">
        Playlist
      </div>
      <q-space />
      <div>
        <q-btn
          flat
          round
          icon="add_circle"
           @click="$refs.textedit.dialog = true"
        ></q-btn>
        <q-btn
          flat
          round
          icon="remove_circle"
          @click="$refs.dialog.dialog = true"
        ></q-btn>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none">
      <q-list>
        <q-item
          v-for="(item, idx) in status.list"
          :key="idx"
          class="q-pa-none"
          :active="status.listIdx === idx"
          @click="clickList(idx)"
          @dragover="dragover($event, idx)"
          @drop="drop($event, idx)"
          @dragleave="dragleave($event, idx)"
          clickable
          v-ripple
        >
          <div class="fit row no-wrap q-px-md" :ref="idx">
            <q-item-section>
              <div>
                {{ item.name }}
              </div>
            </q-item-section>
            <q-item-section top side>
              <q-btn
                flat
                round
                color="red"
                icon="delete"
                @click.capture.stop="delPlaylist(item)"
              >
              </q-btn>
            </q-item-section>
          </div>
        </q-item>
      </q-list>
    </q-card-section>
    <ConfirmDialog
      ref="dialog"
      :contents="contents"
      @confirm="delAll"
    />
    <Textfield
      ref="textedit"
      :contents="contents"
      @confirm="addPlaylist"
    />
  </q-card>
</template>

<script>
import ConfirmDialog from './Confirm'
import Textfield from './Textfield'
import { playerfunc } from '../../mixins/playerFunc'

export default {
  name: 'Playlist',
  mixins: [playerfunc],
  components: { ConfirmDialog, Textfield },
  props: ['status'],
  data () {
    return {
      selected: 0,
      contents: {
        name: 'Delete All Playlist and Items',
        text: 'Do you want to delete all playlist and items?'
      }
    }
  },
  methods: {
    async clickList (idx) {
      this.sendControl('listIdx', idx)
    },
    addPlaylist (list) {
      this.sendControl('addList', list)
    },
    delPlaylist (list) {
      this.sendControl('delList', list)
    },
    delAll () {
      this.sendControl('delAll')
    },
    drop (event, idx) {
      event.preventDefault()
      const files = event.dataTransfer.files
      const fileArray = []
      for (let i = 0; i < files.length; i++) {
        if (files[i].type.includes('video')) {
          fileArray.push(files[i].path)
        }
      }
      this.sendControl('addListandItems', {
        id: idx,
        items: fileArray
      })
      this.$refs[idx][0].style.background = ''
    },
    dragover (event, idx) {
      event.preventDefault()
      this.$refs[idx][0].style.background = '#F0F8FF'
    },
    dragleave (event, idx) {
      this.$refs[idx][0].style.background = ''
    }
  }
}
</script>
