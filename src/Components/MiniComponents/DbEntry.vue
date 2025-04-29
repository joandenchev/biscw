<script setup>
import {computed, onMounted, ref, useTemplateRef} from 'vue'

const props = defineProps(['nameOfDb'])
const dbe = ref()

const isOverflowing = computed(()=> checkOverflow(dbe?.value) )
const pText = computed(() => {
  if (props.nameOfDb && !isOverflowing.value){
    return props.nameOfDb
  } else if (props.nameOfDb && isOverflowing.value){
    return props.nameOfDb.slice(0,5) + '...'
  } else {
    return 'no data'
  }
})

function checkOverflow(el){
  return el?.scrollWidth && (el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight)
}

</script>

<template>
  <div class="outer-dbe">
    <div class="inner-dbe" ref="dbe" :title="nameOfDb">
      <img src="~assets/storage-device.png" alt="Button image">
      <p>{{ pText }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">


.outer-dbe{
  display: flex;
  justify-content: center;
  min-width: calc($db-entry-weight + 2ch);
  margin-right: $db-entry-margin-right;
  cursor: pointer;
}
.outer-dbe img{
  height: 50%;
}
.inner-dbe{
  max-width: $db-entry-weight;
  min-width: $db-entry-weight;
  overflow: visible;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: $db-entry-font-size;
}
.selected-dbe {
  background-color: #bfbdbd;
  font-weight: 580;
}
</style>