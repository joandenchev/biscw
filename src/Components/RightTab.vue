<script setup>
import maplibre from "maplibre-gl"
import {computed,  nextTick, onMounted, ref, watch} from "vue";
import {globals} from "../globals.js";
import TouchResizeToggle from "./MiniComponents/TouchResizeToggle.vue";

const props = defineProps(['resizing'])
const rt = ref()
const map = {}

onMounted(()=>{
  nextTick( ()=>{
    map.width = computed(() => (props.resizing, rt.value.clientWidth))
    map.instance = new maplibre.Map({
      container: 'map',
      style: 'https://demotiles.maplibre.org/style.json',
      center: [25.5, 42.5],
      zoom: 6
    })
    map.instance.easeTo({
      center: map.instance.getCenter(),
      zoom: map.instance.getZoom(),
      duration: 1000,
      offset: [-map.width.value/2, 0]
    })
  })
})
watch(() => props.resizing, (newVal)=>{
  if (newVal) {
    map.rtOld = map.width.value
  } else {
    const offset = (map.width.value - map.rtOld) / 2
    map.instance.easeTo({
      center: map.instance.getCenter(),
      zoom: map.instance.getZoom(),
      duration: 1000,
      offset: [offset, 0]
    })
  }
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