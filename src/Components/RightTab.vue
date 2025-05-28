<script setup>
import maplibre from "maplibre-gl"

import {computed, nextTick, onMounted, ref} from "vue";
import {globals} from "../globals.js";
import TouchResizeToggle from "./MiniComponents/TouchResizeToggle.vue";

const rt = ref()


onMounted(()=>{
  nextTick( ()=>{
    const rtWCinPx = computed(() => (globals.resizing, rt.value.clientWidth))
    const map = new maplibre.Map({
      container: 'map',
      style: 'https://demotiles.maplibre.org/style.json',
      center: [23.1, 42.6],
      zoom: 6
    })
    map.easeTo({
      center: [23.1, 42.6],
      zoom: 6,
      duration: 1000,
      offset: [-rtWCinPx.value/2, 0]
    })
  })
})

</script>

<template>
<div ref="rt" id="rt">
  <touch-resize-toggle v-if="globals.leftTouchResizeToggleHidden"></touch-resize-toggle>
  <div id="map"></div>
</div>
</template>

<style scoped lang="scss">
#map{
  width: 100vw;
  height: 100%;
}
.crazyDiv{
  position: absolute;
  margin: 1rem;
}

</style>