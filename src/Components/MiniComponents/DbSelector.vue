<script setup>
import DbEntry from "./DbEntry.vue";

const flippedScroll = function (event) {
  if (event.deltaY) {
    event.currentTarget.scrollLeft += event.deltaY;
  }
}
</script>

<template>
  <div id="outer-db-selector">
  <div id="db-selector"
  @wheel="flippedScroll">
    <DbEntry name-of-db="Joan"></DbEntry>
    <DbEntry name-of-db="nqkakvo mnogo dulgo ime"></DbEntry>
    <DbEntry></DbEntry>
    <DbEntry></DbEntry>
    <DbEntry></DbEntry>
    <DbEntry name-of-db="000000000"></DbEntry>
    <DbEntry name-of-db="000000000"></DbEntry>
    <DbEntry name-of-db="000000000"></DbEntry>
    <DbEntry></DbEntry>
    <DbEntry></DbEntry>
    <DbEntry></DbEntry>
    <DbEntry></DbEntry>
    <DbEntry></DbEntry>
    <DbEntry></DbEntry>
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
  border-radius: 0 4rem;
  border: 0.2rem solid;
  padding: 0 4rem 0 4rem;
  background-color: $darker-background;
}
</style>