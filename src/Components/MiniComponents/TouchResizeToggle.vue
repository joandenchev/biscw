<!--suppress HtmlUnknownTarget -->
<script setup lang="js">
import {globals} from "../../globals.js";
import {onMounted, ref} from "vue";

const props = defineProps(['left'])
const btnDiv = ref()

function toggleResize(){
  globals.splitHovered = !globals.splitHovered
}

onMounted(()=>{
  if (props.left){
    globals.leftTouchToggleDiv = btnDiv
  }
})
</script>
<template>
  <div v-if="globals.touchDisplay"
       class="crazyDiv"
       ref="btnDiv">
    <button :class="['mobile-resize-toggle-button', {'selected': globals.splitHovered}]"
            @click="toggleResize">
      <img src="~assets/resize-mobile.svg" alt="Toggle resize" title="Toggle resize" class="mobile-resize-toggle-image">
    </button>
  </div>
</template>

<style scoped lang="scss">
.crazyDiv{
  padding-right: 1rem;
}
.mobile-resize-toggle-image{
  display: block;
  width: 2.5em;
  height: 1.6em;
}
.mobile-resize-toggle-button{
  background-color: $darker-background;
  padding: 0.3em;
  border: #0d0e0f 0.2em solid;
  border-radius: 0.7em;
}
.selected{
  background-color: #bfbdbd;
}
</style>