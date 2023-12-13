<script setup lang='ts'>
const isPressPost = ref(false)

function openPostPanel() {
  // console.log('post panel')
  isPressPost.value = true
}
function closePostPanel() {
  isPressPost.value = false
}
const active = ref(true)
const closeIcon = ref('i-carbon-close')
watch(active, (newVal) => {
  if (!newVal) {
    closeIcon.value = 'i-carbon-close-outline'
  } else {
    closeIcon.value = 'i-carbon-close'
  }
})
</script>

<template>
  <div class="post-btn btn" @click="openPostPanel">
    Post
  </div>

  <div v-if="isPressPost" class="post-container">
    <div class="postPanelShadow" @click="isPressPost = !isPressPost"></div>
    <div class="postPanel">
      <div class="panelButton-header">
        <div class="panelButton" :class="closeIcon" @click="closePostPanel" @mousemove="active = !active"
          @mouseleave="active = !active" />
      </div>
      <PostPanel></PostPanel>
    </div>

  </div>
</template>

<style lang="scss" scoped>
@import '~/styles/variables';

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
  width: 500px;
  min-height: 400px;
  background-color: #15202b;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  z-index: 50;
}

.panelButton-header {
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
}

.panelButton {
  font-size: 2rem;
  cursor: pointer;
  color: $theme-color;
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
