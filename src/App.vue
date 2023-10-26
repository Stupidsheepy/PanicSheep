<script>
// import MidHeader from './components/MidHeader.vue';
// import EmptyPost from './views/EmptyPost.vue';
// const postArrays = ref([])
// console.log(postArrays.value.length)
// import { defineProps } from 'vue'
// const props = defineProps({
//   name: String,
// })
// console.log(props.name)
</script>

<template>
  <main font-sans text="center gray-700 dark:gray-200">
    <div class="main-left main-item">
      <Navigation />
    </div>
    <div class="main-item main-mid">
      <MidHeader />
      <div class="main-post-content">
        <EmptyPost v-if="false" />
        <RouterView v-else />
        <!-- <EmptyPost></EmptyPost> -->
        <!-- <RouterView/> -->
      </div>
    </div>
    <div class="main-item main-right">
      Here is the sider
      <button style="background-color: dodgerblue;" @click="toggleDark">
        Dark
      </button>
    </div>
  </main>
</template>

<style>
main {
  display: flex;
  width: 100%;
  justify-content: center;
}

.main-left {
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  margin: 10px 0 0 130px;
  font-size: 1.35rem;
  flex: 0.5;
}

.main-item {
  height: 100vh;
  /* flex: 1; */
}

.main-mid {
  flex: 2;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-right {
  flex: 0.6;
  margin: 10px 130px 0 0;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}

.main-post-content {
  flex: 1;
  overflow: auto;

}
</style>
