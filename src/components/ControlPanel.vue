<template>
  <q-card flat square>
    <q-card-section class="q-my-none q-py-none">
      <Slider :status="status"></Slider>
    </q-card-section>
    <q-list>
      <q-item>
        <q-item-section>
          <NameTag :status="status"></NameTag>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
import Slider from './control/Slider'
import NameTag from './control/NameTag'

export default {
  name: 'ControlPanel',
  props: ['status'],
  components: {
    NameTag,
    Slider
  }
}
</script>
