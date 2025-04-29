<script setup>
import DbSelector from "./MiniComponents/DbSelector.vue";
import {globals} from "../globals.js";
</script>

<template>
<div id="lt">
  <div>
    <h2>Panel control</h2>
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
  margin: 1rem 2rem 0 1.5rem;
  width: max-content;
  font-style: italic;
  cursor: pointer;
}
.selector-div{
  display: flex;
  flex-wrap: wrap;
}
</style>