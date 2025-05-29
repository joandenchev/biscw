<script setup>
import DbEntry from "./DbEntry.vue";
import { onBeforeMount, ref } from "vue";
import { globals } from "../../globals.js"

const activeDbName = ref()
// All DB names must be unique and checked because they are used as keys in a v-for!
const namesOfDbs=['Joan', 'Casts', 'Maximus', 'Pyrus', 'Ima', 'I', 'Mnogo dulug text', 'Aquos', 'Subterra', 'Darkus']
onBeforeMount(()=>{
  globals.activeDbName = activeDbName
})
const flippedScroll = function (event) {
  if (event.deltaY) {
    event.currentTarget.scrollLeft += event.deltaY;
  }
}

const setActiveDb = function (el) {
  activeDbName.value = el
}

</script>

<template>
  <div id="outer-db-selector">
  <div id="db-selector"
       @wheel.passive="flippedScroll">
    <DbEntry v-for="el in namesOfDbs"
             :key="el"
             :name-of-db="el"
             :class="el === activeDbName ? 'selected-dbe' : ''"
             @click="() => setActiveDb(el)"
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