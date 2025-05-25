<script setup>
import maplibre from "maplibre-gl"

import {computed, nextTick, onMounted, ref} from "vue";
import {globals} from "../globals.js";

let map
const rt = ref()


onMounted(()=>{

  nextTick(() =>{
    globals.rtWCinPx = computed(() => (globals.resizing, rt.value.clientWidth))
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
      offset: [-globals.rtWCinPx/2, 0]
    })
  })
})

</script>

<template>
<div ref="rt" id="rt">
  <div id="map"></div>
</div>
</template>

<style scoped lang="scss">
#map{
  width: 100vw;
  height: 100%;
}
</style>