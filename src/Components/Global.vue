<script setup lang="js">
import RightTab from "./RightTab.vue";
import LeftTab from "./LeftTab.vue";
import {computed, nextTick, onMounted, ref, watch} from "vue";
import {globals} from "../globals.js";

//lt -> left tab
//rt -> right tab

const splitter = ref()
const increaseSplitter = ref()

const sW = 24
const sWC = `0.${sW}rem`

const ltWP = ref(50)
const splitHovered = ref(false)
const resizing = ref(false)
globals.resizing = resizing

const ltWC = computed(() => `calc(${ltWP.value}% - 0.${sW/2}rem)`)
const rtWC = computed(() => `calc(${100-ltWP.value}% - 0.${sW/2}rem)`)
const isWC = computed(() => resizing.value ? '20%' : '1rem')
const cursor = computed(() => resizing.value ? 'grabbing' : 'grab')

function resize(event){
  if (resizing.value){
    const a = event.clientX / window.innerWidth * 100
    if (a > 98) ltWP.value = 100
    else if (a < 52 && a > 48) ltWP.value = 50
    else if (a < 2) ltWP.value = 0
    else ltWP.value = a
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
  globals.touchDisplay = 'ontouchstart' in window || navigator.maxTouchPoints > 0

  if(globals.touchDisplay){
    nextTick(()=>{
      globals.splitHovered = splitHovered
      const splitterLeftCoordinateGetter = () => splitter.value.getBoundingClientRect().left
      const buttonRightCoordinateGetter = () => globals.leftTouchToggleDiv.getBoundingClientRect().right

      //logic for moving the resize toggle when necessary
      const triggeredResize = function () {
        globals.leftTouchResizeToggleHidden = splitterLeftCoordinateGetter() < buttonRightCoordinateGetter()
      }
      triggeredResize()

      touchFunctions.touchResize = function (event) {
        event.preventDefault()
        triggeredResize()
        if (resizing.value) {
          const a = event.touches[0].clientX / window.innerWidth * 100
          if (a > 98) ltWP.value = 100
          else if (a < 52 && a > 48) ltWP.value = 50
          else if (a < 2) ltWP.value = 0
          else ltWP.value = a
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
    })

  }
})
</script>

<template>
  <left-tab></left-tab>
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
  <right-tab></right-tab>
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
  width: v-bind(sWC);
}
#increaseSplitter{
  height: 100%;
  width: v-bind(isWC);
  position: absolute;
  transform: translateX(-50%);
  cursor: v-bind(cursor);
}
#lt {
  background-color: $background;
  width: v-bind(ltWC);
  display: flex;
  flex-direction: column;
}
#rt{
  width: v-bind(rtWC);
  overflow: hidden;
}
</style>