<template>
  <div>
    <div
      v-if="status && status.file"
      class="row"
    >
      <span class="q-px-md">
        <q-img
          style="height: 70px; width: 122px"
          :ratio="16/9"
          :src="status.thumbnail"
        />
      </span>
      <span class="text-black">
        <div class="text-body1 text-bold">{{ filePath.name }}</div>
        <div class="text-caption">{{ filePath.dir}}</div>
        <div class="text-overline text-uppercase">{{ status.mode }}</div>
      </span>
    </div>
    <div
      v-else
      class="row"
    >
      <span class="q-px-md">
        <q-img
          style="height: 70px; width: 122px"
          :ratio="16/9"
          src="~assets/logo_sq.png"
        />
      </span>
      <span>
        <div class="text-body1 text-bold">None</div>
        <div class="text-caption">Please load video file</div>
        <div class="text-overline text-uppercase">{{ status.mode }}</div>
      </span>
    </div>
  </div>
</template>

<script>
import path from 'path'

export default {
  props: ['status'],
  computed: {
    filePath: function () {
      return path.parse(this.status.file.file)
    }
  }
}
</script>
