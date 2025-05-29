<script setup lang="js">
import RightTab from "./RightTab.vue";
import LeftTab from "./LeftTab.vue";
import {computed, nextTick, onMounted, ref, watch} from "vue";
import {globals} from "../globals.js";

//lt -> left tab
//rt -> right tab

const splitter = ref()
const increaseSplitter = ref()

const splitterWidthInPercentOfOneRem = 24
const splitterWidthFormatted = `0.${splitterWidthInPercentOfOneRem}rem`

const ltWidthPercentage = ref(50)
const splitHovered = ref(false)
const resizing = ref(false)
const touchDisplay = 'ontouchstart' in window || navigator.maxTouchPoints > 0

const ltWidthComputed = computed(() => `calc(${ltWidthPercentage.value}% - 0.${splitterWidthInPercentOfOneRem/2}rem)`)
const rtWidthComputed = computed(() => `calc(${100-ltWidthPercentage.value}% - 0.${splitterWidthInPercentOfOneRem/2}rem)`)
const increaseSplitterWidthComputed = computed(() => resizing.value ? '20%' : '1rem')
const cursor = computed(() => resizing.value ? 'grabbing' : 'grab')

function resize(event){
  if (resizing.value){
    const a = event.clientX / window.innerWidth * 100
    if (a > 98) ltWidthPercentage.value = 100
    else if (a < 52 && a > 48) ltWidthPercentage.value = 50
    else if (a < 2) ltWidthPercentage.value = 0
    else ltWidthPercentage.value = a
  }
}
function startResize(){
  resizing.value = true
  window.addEventListener('mouseup', releaseResize, {once: true})
}
function releaseResize(event){
  event.preventDefault()
  resizing.value = false
}

const touchFunctions = {}

onMounted(()=>{
    if(touchDisplay){

      globals.splitHovered = splitHovered
      const splitterLeftCoordinateGetter = () => splitter.value.getBoundingClientRect().left
      const buttonRightCoordinateGetter = () => globals.leftTouchToggleDiv.getBoundingClientRect().right

      //logic for moving the resize toggle when necessary
      const triggeredResize = function () {
        globals.leftTouchResizeToggleHidden = splitterLeftCoordinateGetter() < buttonRightCoordinateGetter() -1 //1 is a buffer for edge cases
      }
      triggeredResize()

      touchFunctions.touchResize = function (event) {
        event.preventDefault()
        triggeredResize()
        if (resizing.value) {
          const a = event.touches[0].clientX / window.innerWidth * 100
          if (a > 98) ltWidthPercentage.value = 100
          else if (a < 52 && a > 48) ltWidthPercentage.value = 50
          else if (a < 2) ltWidthPercentage.value = 0
          else ltWidthPercentage.value = a
        }
      }

      touchFunctions.touchStart = function (event) {
        event.preventDefault()
        resizing.value=true
      }

      touchFunctions.touchEnd = function () {
        resizing.value=false
        splitHovered.value=false
      }

      watch(splitHovered, async (newVal) => {
        if (newVal) {
          await nextTick();
          increaseSplitter.value.addEventListener('touchmove',  touchFunctions.touchResize, {passive: false})
          increaseSplitter.value.addEventListener('touchstart', touchFunctions.touchStart, {passive: false})
          increaseSplitter.value.addEventListener('touchend',   touchFunctions.touchEnd)
        } else {
          increaseSplitter.value.removeEventListener('touchmove',  touchFunctions.touchResize)
          increaseSplitter.value.removeEventListener('touchstart', touchFunctions.touchStart)
          increaseSplitter.value.removeEventListener('touchEnd',   touchFunctions.touchEnd)
        }
      })
  }
})
</script>

<template>
  <left-tab :touchDisplay="touchDisplay"></left-tab>
  <div id="splitter"
       ref="splitter"
       @mouseenter="splitHovered=true"
  >
    <div id="increaseSplitter"
         v-if="splitHovered"
         @mouseleave="resizing || (splitHovered=false)"
         @mousedown.prevent="startResize"
         @mousemove="resize"
         ref="increaseSplitter"
    >
    </div>
  </div>
  <right-tab :resizing="resizing"></right-tab>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html, body, #start{
  height: 100%;
  overflow: hidden;
}
p {
  margin: 0;
}
#start{
  display: flex;
}
#splitter{
  background-color: $secondary;
  width: v-bind(splitterWidthFormatted);
}
#increaseSplitter{
  height: 100%;
  width: v-bind(increaseSplitterWidthComputed);
  position: absolute;
  transform: translateX(-50%);
  cursor: v-bind(cursor);
}
#lt {
  background-color: $background;
  width: v-bind(ltWidthComputed);
  display: flex;
  flex-direction: column;
}
#rt{
  width: v-bind(rtWidthComputed);
  overflow: hidden;
}
</style>