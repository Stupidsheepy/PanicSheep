<script setup lang='ts'>
const isPressPost = ref(false)

function openPostPanel() {
  // console.log('post panel')
  isPressPost.value = true
}
function closePostPanel() {
  isPressPost.value = false
}
</script>

<template>
  <div class="post-btn btn" @click="openPostPanel">
    Post
  </div>

  <div v-if="isPressPost" class="post-container">
    <div class="postPanelShadow" @click="isPressPost = !isPressPost"></div>
    <div class="postPanel">
      <div class="panelButton i-carbon-close-outline" @click="closePostPanel" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.post-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 3;
}

/* .post-btn { */
  /* font-size: 2rem; */
/* } */

.postPanel {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1000px;
  height: 500px;
  background-color: dodgerblue;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  z-index: 50;
}

.panelButton {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5rem;
  cursor: pointer;
}

.postPanelShadow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
