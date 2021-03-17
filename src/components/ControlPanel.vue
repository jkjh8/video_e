<template>
  <q-card flat square>
    <q-card-section class="q-my-none q-py-none">
      <Slider :status="status"></Slider>
    </q-card-section>
    <q-list>
      <q-item>
        <q-card-section
          class="row fit no-warp items-center"
          :class="$q.platform.is.mobile ? 'justify-start' : 'justify-center'"
        >
          <NameTag
            class="col-sm-grow col-xs-12"
            :status="status"
          />
          <Buttons
            class="col-md-shrink"
            :status="status" />
        </q-card-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
import Slider from './control/Slider'
import NameTag from './control/NameTag'
import Buttons from './control/Buttons'

export default {
  name: 'ControlPanel',
  props: ['status'],
  components: {
    NameTag,
    Slider,
    Buttons
  }
}
</script>
