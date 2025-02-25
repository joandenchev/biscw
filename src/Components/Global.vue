<!--suppress JSUnusedGlobalSymbols -->
<script setup lang="js">
import RightTab from "./RightTab.vue";
import LeftTab from "./LeftTab.vue";
import {computed, onMounted, reactive, ref} from "vue";

const ltW = ref(49.92)
const rtW = ref(49.92)
const splitHovered = ref(false)
const resizing = ref(false)

const ltWC = computed(() => ltW.value + '%')
const rtWC = computed(() => rtW.value + '%')
const isWC = computed(() => resizing.value ? '20%' : '0.48%')
const cursor = computed(() => resizing.value ? 'grabbing' : 'grab')

function resize(event){
  if (resizing.value){
    ltW.value = event.clientX / window.innerWidth * 100
    rtW.value = 99.84 - ltW.value
  }
}
function touchResize(event){
  if (resizing.value){
    console.log('hey touchyyy')
    ltW.value = event.touches[0].clientX / window.innerWidth * 100
    rtW.value = 99.84 - ltW.value
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
  width: 0.16%;
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
  background-color: indianred;
  width: v-bind(rtWC);
}
</style>