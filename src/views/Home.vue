<script setup lang='ts'>
// import { useVirtualList } from '@vueuse/core'

// const { list, containerProps, wrapperProps } = useVirtualList(
//     Array.from(Array(99999).keys()),
//     {
//         // Keep `itemHeight` in sync with the item's row.
//         itemHeight: 22,
//     },
// )
</script>

<template>
  <div v-for="i in 5" :key="i">
    <PostMessage />
  </div>
</template>

<style  scoped></style>
