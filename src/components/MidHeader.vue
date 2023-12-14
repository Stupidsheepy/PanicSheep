<script setup lang='ts'>
import SwitchSunOrMoon from './SwitchSunOrMoon.vue';

const route = useRoute()
// console.log(route.path)
</script>

<template>
  <div class="main-mid__header">
    <span>{{ route.name }}</span>
    <!-- <slot name="sheep"></slot> -->
    <div class="switch-btn">
      <SwitchSunOrMoon></SwitchSunOrMoon>
    </div>
  </div>
</template>

<style  scoped>
.main-mid__header {
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 2.1rem;
  font-weight: 700;
  padding: 10px;
  user-select: none;
  text-transform: capitalize;
}

.main-mid__header span {
  /* 使用text，而不是border,因为是文字下的下划线 */
  text-decoration: underline dodgerblue;
  /* border-bottom: 4px solid dodgerblue; */
  /* line-height: 1.4; */
  /* 调节bottom-line位置 */
}

.switch-btn {
  position: absolute;
  right: 5%;
}
</style>
