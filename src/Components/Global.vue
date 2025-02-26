<script setup lang="js">
import RightTab from "./RightTab.vue";
import LeftTab from "./LeftTab.vue";
import {computed, onMounted, reactive, ref} from "vue";

function toPercent(s){
  return s + '%'
}

const sW = 0.16
const sWC = toPercent(sW)

const ltW = ref(50 - (sW / 2))
const splitHovered = ref(false)
const resizing = ref(false)

const rtW = computed(()=> 100 - sW - ltW.value)
const ltWC = computed(() => toPercent(ltW.value))
const rtWC = computed(() => toPercent(rtW.value))
const isWC = computed(() => resizing.value ? '20%' : '0.48%')
const cursor = computed(() => resizing.value ? 'grabbing' : 'grab')

function resize(event){
  if (resizing.value){
    const a = event.clientX / window.innerWidth * 100
    if (a > 95) ltW.value = 100 - sW
    else if (a < 52.5 && a > 47.5) ltW.value = 50 - (sW / 2)
    else if (a < 5) ltW.value = 0
    else ltW.value = a
  }
}
function touchResize(event){
  if (resizing.value){
    ltW.value = event.touches[0].clientX / window.innerWidth * 100
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
    >
    </div>
  </div>

  <right-tab></right-tab>
</template>

<style lang="scss">

html, body, #start{
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
#start{
  display: flex;
}
#splitter{
  background-color: bisque;
  width: v-bind(sWC);
}
#increaseSplitter{
  height: 100%;
  width: v-bind(isWC);
  min-width: 10px;
  position: absolute;
  transform: translateX(-50%);
  cursor: v-bind(cursor);
}
#lt {
  background-color: cadetblue;
  width: v-bind(ltWC);
}
#rt{
  background-color: mediumpurple;
  width: v-bind(rtWC);
}
</style>