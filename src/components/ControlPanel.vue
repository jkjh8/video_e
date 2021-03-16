<template>
  <q-card>
    <q-card-section>
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
