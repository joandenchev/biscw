<script setup>
import maplibre from "maplibre-gl"

import {computed, reactive, nextTick, onMounted, ref} from "vue";
import {globals} from "../globals.js";
import TouchResizeToggle from "./MiniComponents/TouchResizeToggle.vue";

let map
const rt = ref()
const rtWC = reactive({inPx: null})
const toggle = computed(() => rtWC.inPx && (rtWC.inPx >= 0.95*window.innerWidth))


onMounted(()=>{
  nextTick( ()=>{
    rtWC.inPx = computed(() => (globals.resizing, rt.value.clientWidth))
    map = new maplibre.Map({
      container: 'map',
      style: 'https://demotiles.maplibre.org/style.json',
      center: [23.1, 42.6],
      zoom: 6
    })
    map.easeTo({
      center: [23.1, 42.6],
      zoom: 6,
      duration: 1000,
      offset: [-rtWC.inPx/2, 0]
    })
  })
})

</script>

<template>
<div ref="rt" id="rt">
  <touch-resize-toggle v-if="!globals.splitHovered && toggle"></touch-resize-toggle>
  <div id="map"></div>
</div>
</template>

<style scoped lang="scss">
#map{
  width: 100vw;
  height: 100%;
}
.maplibregl-control-container, .maplibregl-control-container *{
  display: none !important;
  tab-index: -1;
  visibility: hidden;
  pointer-events: none;
  outline: none;
}
.mobile-resize-toggle-button{
  position: absolute;
  margin: 1rem;
}

</style>