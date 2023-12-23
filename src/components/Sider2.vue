<template>
  <div class="sider">
    <!-- <button @click="toggleDark()">
            <div class="i-mdi-weather-night" v-if="isDark"></div>
            <div class="i-mdi-weather-sunny" v-if="!isDark"></div>
        </button> -->
    <div class="sider-content-01" style="font-size:1.4rem;">
      <h2>Account For Test: </h2>
      <div>------------------------</div>
      <div class="username-content">
        <span>Username1: </span>
        <span>sheepy</span>
      </div>
      <div class="password-content">
        <span>Password1: </span>
        <span>114514</span>
      </div>
      <div>------------------------</div>
      <div class="username-content">
        <span>Username2: </span>
        <span>Stupidsheep</span>
      </div>
      <div class="password-content">
        <span>Password2: </span>
        <span>nihao</span>
      </div>
    </div>
    <!-- <button @click="userStore.userLogoutFunc" class="btn">Logout</button> -->
  </div>
</template>
<script setup lang='ts'>
// watch(isLogin, (newVal) => {
//     switchLogin.value = newVal
// })
// watch(switchLogin, (newVal) => {
//     if (newVal) {
//         userStore.userLoginFunc()
//     } else {
//         userStore.userLogoutFunc()
//     }
// })
</script>
<style lang='scss' scoped>
@import '~/styles/variables';

.sider {
  height: 100%;
  // 修改为rem
  width: $sider-width;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.sider-content-01 {
  width: 25rem;
  height: 25rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px #ccc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}
</style>
