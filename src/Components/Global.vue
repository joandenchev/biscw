<script setup lang="js">
import RightTab from "./RightTab.vue";
import LeftTab from "./LeftTab.vue";
import {computed} from "vue";

let ltW = 49.92
let rtW = 49.92

let ltWC = computed(() => ltW + '%')
let rtWC = computed(() => rtW + '%')

</script>

<template>
  <left-tab></left-tab>
  <div id="splitter"></div>
  <right-tab></right-tab>
  <div id="increaseSplitter"></div>
</template>

<style lang="scss">

html, body, #start{
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
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
  width: 0.48%;
  min-width: 10px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
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