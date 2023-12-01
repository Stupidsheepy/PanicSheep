

<template>
    <main font-sans text="center gray-700 dark:gray-200">

        <div class="main-left main-item" v-if="isDesktop">
            <Navigation />
            <!-- <button @click="awesome = !awesome">Toggle</button>

            <h1 v-if="awesome">Vue is awesome!</h1>
            <h1 v-else>Oh no 😢</h1> -->
        </div>
        <div class="main-bottom main-item" v-else>
            <BottomNavigation />
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
        <!-- <Sider class="main-right" v-if="isDesktop"></Sider> -->
    </main>
</template>
<script setup lang="ts">
// import MidHeader from './components/MidHeader.vue';
// import EmptyPost from './views/EmptyPost.vue';
// const postArrays = ref([])
// console.log(postArrays.value.length)
// import { defineProps } from 'vue'
// const props = defineProps({
//   name: String,
// })
// console.log(props.name)
// const isDesktop = ref(false)
const isDesktop = ref(true)
isDesktop.value = window.innerWidth > 700 ? true : false
const marginBottom = ref('0px')
const unwatch = watch(isDesktop, () => {
    if (isDesktop.value)
        marginBottom.value = '0px'
    else
        marginBottom.value = '100px'
})

onUnmounted(() => {
    unwatch()
})  // 用于解除watch监听

</script>
<style>
main {
    display: flex;
    width: 100%;
    justify-content: center;
    position: relative;
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
    position: absolute;
    right: 0;
    top: 10%;

}

.main-post-content {
    flex: 1;
    overflow: auto;
    scroll-behavior: smooth;
    margin-right: v-bind(marginBottom);

}

.main-bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100px;
    border-radius: 10px;
    z-index: 999;

}

/* 隐藏滚动条 */

/* ::-webkit-scrollbar {
    display: none;
} */
</style>
