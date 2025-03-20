<script setup>
import DbEntry from "./DbEntry.vue";
import { onMounted, ref } from "vue";
import { globals } from "../globals.js"

const activeDbIndex = ref(null)
const namesOfDbs=['Joan', 'Prizovava', 'Maximus', 'Ultra', 'Vuicho', 'Huicho', 'Aquos', 'Pyrus', 'Darkus']
onMounted(()=>{
  globals.activeDbName = namesOfDbs[activeDbIndex.value]
  globals.a = 'sex'
})
const flippedScroll = function (event) {
  if (event.deltaY) {
    event.currentTarget.scrollLeft += event.deltaY;
  }
}

const setActiveDb = function (index) {
  activeDbIndex.value = index
  globals.activeDbName = namesOfDbs[activeDbIndex.value]
}

</script>

<template>
  <div id="outer-db-selector">
  <div id="db-selector"
       @wheel.passive="flippedScroll">
    <DbEntry v-for="(el, i) in namesOfDbs"
             :key="i"
             :name-of-db="el"
             :class="i === activeDbIndex ? 'selected-dbe' : ''"
             @click="() => setActiveDb(i)"
    ></DbEntry>
    <h4 v-if="!namesOfDbs.length">Unable to get databases!</h4>
  </div>
  </div>
</template>

<style scoped lang="scss">
#db-selector{
  height: $db-selector-height;
  max-width: calc(10ch + 5*$db-entry-weight + 4*$db-entry-margin-right);
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: none;
}
#outer-db-selector{
  min-width: 0;
  display: block;
  margin: 1rem;
  border: 0.2rem solid;
  padding: 0 2rem;
  background-color: $darker-background;
}
</style>