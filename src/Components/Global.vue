<script setup lang="js">
import RightTab from "./RightTab.vue";
import LeftTab from "./LeftTab.vue";
import {computed, onMounted, reactive, ref} from "vue";
import {globals} from "../globals.js";

const sW = 24
const sWC = `0.${sW}rem`

const ltWP = ref(50)
const splitHovered = ref(false)
const resizing = ref(false)

const ltWC = computed(() => `calc(${ltWP.value}% - 0.${sW/2}rem)`)
const rtWC = computed(() => `calc(${100-ltWP.value}% - 0.${sW/2}rem)`)
const isWC = computed(() => resizing.value ? '20%' : '1rem')
const cursor = computed(() => resizing.value ? 'grabbing' : 'grab')
globals.resizing = resizing

function resize(event){
  if (resizing.value){
    const a = event.clientX / window.innerWidth * 100
    if (a > 98) ltWP.value = 100
    else if (a < 52 && a > 48) ltWP.value = 50
    else if (a < 2) ltWP.value = 0
    else ltWP.value = a
  }
}
function touchResize(event){
  if (resizing.value){
    ltWP.value = event.touches[0].clientX / window.innerWidth * 100
  }
}

const touchControlSplit = reactive({})
const touchControlIncrease = reactive({})


onMounted(()=>{
  if('ontouchstart' in window || navigator.maxTouchPoints > 0){
    touchControlSplit.touchstart=()=>{splitHovered.value=true}
    touchControlIncrease.touchstart=()=>{resizing.value=true}
    touchControlIncrease.touchmove=touchResize
    touchControlIncrease.touchend=()=>{resizing.value=false}
  }
})

</script>

<template>
  <left-tab></left-tab>
  <div id="splitter"
       v-on="touchControlSplit"
       @mouseenter="splitHovered=true"
  >
    <div id="increaseSplitter"
         v-if="splitHovered"
         v-on="touchControlIncrease"
         @mouseleave="resizing ? null : splitHovered=false"
         @mousedown="resizing = true"
         @mousemove="resize"
         @mouseup  ="resizing = false"
         @mouseout ="resizing = false"
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