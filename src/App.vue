<template>
  <div class="app-container">
    <Container></Container>
  </div>
</template>
<script setup lang='ts'>
import { useUserStore } from './stores/userStore';
const userStore = useUserStore();
const unsubscribe = userStore.$subscribe(
  (mutation, state) => {
    /*
      mutation主要包含三个属性值：
      events：当前state改变的具体数据，包括改变前的值和改变后的值等等数据
      storeId：是当前store的id
      type：用于记录这次数据变化是通过什么途径，主要有三个分别是
        direct：通过 action 变化的
        patch object：通过 $patch 传递对象的方式改变的
        patch function：通过 $patch 传递函数的方式改变的
  	
    */
    // 我们就可以在此处监听store中值的变化，当变化为某个值的时候，去做一些业务操作之类的
    if (state.isLogin === true) {
      
    } else {
      userStore.userLogout();
    }
  }, { detached: false })

onUnmounted(() => {
  unsubscribe()
})
</script>
<style lang='scss' scoped>
.app-container {
  // zoom: 0.8;
}
</style>