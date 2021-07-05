<template>
  <div
    @dragover="dragover"
    @drop="drop"
    @dragleave="dragleave"
    ref="nameTag"
  >
    <div
      class="row no-wrap"
    >
      <span class="q-px-md">
        <q-img
          ref="thumb"
          style="height: 70px; width: 122px"
          :ratio="16/9"
          :src="thumbnail ? thumbnail : 'logo_sq.png'"
        />
      </span>
      <span class="text-black" v-if="status && status.file">
        <div class="text-body1 text-bold">{{ filePath.name }}</div>
        <div class="text-caption">{{ filePath.dir}}</div>
        <div class="text-overline text-uppercase">{{ status.mode }}</div>
      </span>
      <span class="text-black" v-else>
        <div class="text-body1 text-bold">None</div>
        <div class="text-caption">Please load video file</div>
        <div class="text-overline text-uppercase">{{ status.mode }}</div>
      </span>
    </div>
  </div>
</template>

<script>
import path from 'path'
import { playerfunc } from '../../mixins/playerFunc'

export default {
  mixins: [playerfunc],
  props: ['status'],
  computed: {
    filePath () {
      return path.parse(this.status.file.file)
    },
    thumbnail () {
      if (this.status.file && this.status.file.ext === 'mp3') {
        return ''
      }
      if (this.status.file && this.status.file.ext === 'wav') {
        return ''
      }
      if (this.status.file && this.status.file.thumbnail) {
        if (this.status.file.playlist) {
          return `${this.status.url}/thumbnail/playlist/${this.status.file.thumbnail}`
        } else {
          return `${this.status.url}/thumbnail/${this.status.file.thumbnail}`
        }
      } else {
        return ''
      }
    }
  },
  methods: {
    loadError () {
      this.$refs.thumb.src = 'logo_sq.png'
    },
    drop (event) {
      event.preventDefault()
      const files = event.dataTransfer.files
      console.log(files)
      const fileArray = []
      for (let i = 0; i < files.length; i++) {
        if (files[i].type.includes('video')) {
          fileArray.push(files[i].path)
        }
      }
      this.sendControl('openFile', fileArray[0])
      this.$refs.nameTag.style.background = ''
    },
    dragover (event) {
      event.preventDefault()
      this.$refs.nameTag.style.background = '#F0F8FF'
    },
    dragleave (event) {
      this.$refs.nameTag.style.background = ''
    }
  }
}
</script>
