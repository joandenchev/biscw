<script setup lang="js">
import {globals} from "../../globals.js";

function toggleResize(){
  globals.splitHovered = true
}
</script>
<template>
  <button v-if="globals.touchDisplay"
          :class="['mobile-resize-toggle-button', {'selected': globals.splitHovered}]"
          @click="toggleResize">
    <img src="~assets/resize-mobile.svg" alt="Toggle resize" title="Toggle resize" class="mobile-resize-toggle-image">
  </button>
</template>

<style scoped lang="scss">
.mobile-resize-toggle-image{
  display: block;
  width: 2.5em;
  height: 1.6em;
}
.mobile-resize-toggle-button{
  background-color: $darker-background;
  padding: 0.1em;
  border: #0d0e0f 0.2em solid;
  border-radius: 0.7em;
}
.selected{
  background-color: #bfbdbd;
}
</style>