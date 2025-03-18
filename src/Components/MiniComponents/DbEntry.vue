<script setup>
import {onMounted, ref} from 'vue'
const props = defineProps(['nameOfDb'])
const newName = ref(props.nameOfDb)

onMounted(() =>{
  if (props.nameOfDb && props.nameOfDb.length > 10){
    newName.value = props.nameOfDb.slice(0, 7) + '...'
  }
})
</script>

<template>
  <div id="dbe">
    <img src="~assets/storage-device.png" alt="Button image">
    <p>{{ newName || 'no name' }}</p>
  </div>
</template>

<style scoped lang="scss">
#dbe{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 10ch;
  margin-right: 1rem;
}
#dbe img{
  height: 50%;

}
</style>