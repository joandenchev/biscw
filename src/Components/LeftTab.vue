<script setup>
import DbSelector from "./MiniComponents/DbSelector.vue";
</script>

<template>
<div id="lt">
  <div>
    <h2>Panel control</h2>
  </div>
  <DbSelector></DbSelector>
</div>
</template>

<style scoped lang="scss">
h2{
  display: block;
  margin-left: 1.5rem;
  width: max-content;
  font-style: italic;
  cursor: pointer;
}
</style>