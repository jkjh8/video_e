<template>
  <div>
    <q-list bordered separator class="q-ma-md">
      <q-item>
        <q-item-section avatar>
          <q-icon
              class="text-teal"
              size="md"
              name="play_circle_filled"
            />
        </q-item-section>
        <q-list-section>
          <q-item-label class="text-h6">Player Api</q-item-label>
          <q-item-label caption>TCP PORT: 13333</q-item-label>
        </q-list-section>
      </q-item>
      <q-item>
        <q-item-section>
          Mode: mode,-mode-
          <q-item-label caption>nomal or playlist</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          Play: play
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          Pause: paus
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          Stop: clea
          <q-item-label caption>clear file</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          Change Playlist: list,-id-
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          Change Item: item,-id-
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          Play File: pf,-file path-
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          Loop: loop,-boolean- or loop(toggle)
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          Loop All(playlist mode only): loopAll,-boolean- or loopAll(toggle)
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          Fullscreen toggle: full,-boolean- ro full(toggle)
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          Flip: flip
          <q-item-label caption>play window bring front</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          Mute: mute,-boolean- or mute(toggle)
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          Volume: volume,-vol-
          <q-item-label caption>volume value: 1 ~ 100</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          Next: next
          <q-item-label caption>next item in playlist</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          Previous: previous
          <q-item-label caption>previous item in playlist</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
