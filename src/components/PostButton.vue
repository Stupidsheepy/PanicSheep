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
  <div class="post-wrap">
    <div class="post-btn" @click="openPostPanel">
      Post
    </div>
    <div v-show="isPressPost" class="wrap">
      <div class="postPanelShadow" />
      <div class="postPanel">
        <div class="panelButton i-carbon-close-outline" @click="closePostPanel" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.post-wrap {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.post-btn {
    font-size: 2.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #3b82f6;
    color: white;
    border-radius: 20px;
    cursor: pointer;
    height: 3.5rem;
    width: 100%;
    font-weight: 700;
    /* font-size: 2rem; */
}

.postPanel {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    background-color: dodgerblue;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    z-index: 2;
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
