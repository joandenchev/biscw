<script setup>
import {computed, onMounted, ref, useTemplateRef} from 'vue'

const props = defineProps(['nameOfDb'])
const dbe = ref()

const isOverflowing = ref(false)
const pText = computed(() => {
  if (props.nameOfDb && !isOverflowing.value){
    return props.nameOfDb
  } else if (props.nameOfDb && isOverflowing.value){
    return props.nameOfDb.slice(0,5) + '...'
  } else {
    return 'no data'
  }
})

onMounted(()=>{
  checkOverflow(dbe.value)
})

function checkOverflow(el){
  console.log(el)
  isOverflowing.value = el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight
}

</script>

<template>
  <div id="dbe" ref="dbe">
    <img src="~assets/storage-device.png" alt="Button image">
    <p>{{ pText }}</p>
  </div>
</template>

<style scoped lang="scss">
#dbe{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 8ch;
  max-width: 8ch;
  min-width: 8ch;
  margin-right: 1rem;
  cursor: pointer;
  overflow: hidden;
}
#dbe img{
  height: 50%;

}
.selected-dbe {
  background-color: #bfbdbd;
  font-weight: 580;
}
</style>