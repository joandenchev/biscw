<script setup>
import DbEntry from "./DbEntry.vue";
import {ref} from "vue";

const activeDbIndex = ref(null)
const namesOfDbs=['Joan', 'Nqkakvo mnogo dulgo ime', 'Baza bus', '', '', '', 'Baza vlak', 'Neshto mnogo dulgo, koeto nqma da kazvam kakvo e!', '000000000', '0000000000', '', '00000000', 'Maximum Pyrus']

const flippedScroll = function (event) {
  if (event.deltaY) {
    event.currentTarget.scrollLeft += event.deltaY;
  }
}

const setActiveDb = function (index) {
  activeDbIndex.value = index
}

</script>

<template>
  <div id="outer-db-selector">
  <div id="db-selector"
       @wheel="flippedScroll">

    <DbEntry v-for="(el, i) in namesOfDbs"
             :key="i"
             :name-of-db="el"
             :class="i === activeDbIndex ? 'selected-dbe' : ''"
             @click="() => setActiveDb(i)"
    ></DbEntry>

  </div>
  </div>
</template>

<style scoped lang="scss">
#db-selector{
  height: 4rem;
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: none;
}
#outer-db-selector{
  margin: 1rem;
  border: 0.2rem solid;
  padding: 0 2rem;
  background-color: $darker-background;
}
</style>