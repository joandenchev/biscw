<script setup>
import DbSelector from "./MiniComponents/DbSelector.vue";
import {globals} from "../globals.js";
import TouchResizeToggle from "./MiniComponents/TouchResizeToggle.vue";

</script>

<template>
<div id="lt">
  <div class="header">
    <h2>Panel control</h2>
    <touch-resize-toggle :left="true" :style="{ visibility: globals.leftTouchResizeToggleHidden ? 'hidden' : 'visible' }"></touch-resize-toggle>
  </div>

  <div class="selector-div">
    <DbSelector></DbSelector>
    <h2 style="margin-left: 1.5rem">{{ globals.activeDbName }}</h2>
  </div>
</div>
</template>

<style scoped lang="scss">
h2{
  display: block;
  width: max-content;
  font-style: italic;
  cursor: pointer;
  white-space: nowrap;
  padding-right: 1rem;
}
.selector-div{
  display: flex;
  flex-wrap: wrap;
}
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0 0 1.5rem;
}
</style>