<template>
  <div class="empty-place">
    <img src="/empty_place.png" alt="nothing here" class="empty-place__img">
    <div class="empty-place__desc">Nothing here....</div>
  </div>
</template>
<script setup lang='ts'>
</script>
<style lang='scss' scoped>
.empty-place {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  opacity: 0.5;
}

.empty-place__img {
  height: 30rem;
}

.empty-place__desc {
  font-size: 2rem;
  font-weight: 600;
}
</style>
