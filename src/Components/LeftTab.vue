<script setup>
import DbSelector from "./MiniComponents/DbSelector.vue";
import {globals} from "../globals.js";
import TouchResizeToggle from "./MiniComponents/TouchResizeToggle.vue";
</script>

<template>
<div id="lt">
  <div class="header">
    <h2>Panel control</h2>
    <touch-resize-toggle></touch-resize-toggle>
  </div>

  <div class="selector-div">
    <DbSelector></DbSelector>
    <h2>{{ globals.activeDbName }}</h2>
  </div>
</div>
</template>

<style scoped lang="scss">
h2{
  display: block;
  width: max-content;
  font-style: italic;
  cursor: pointer;
}
.selector-div{
  display: flex;
  flex-wrap: wrap;
}
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 1rem 0 1.5rem;
}
</style>