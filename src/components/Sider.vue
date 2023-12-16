<template>
    <div class="sider">
        <!-- <button @click="toggleDark()">
            <div class="i-mdi-weather-night" v-if="isDark"></div>
            <div class="i-mdi-weather-sunny" v-if="!isDark"></div>
        </button> -->
        <div class="sider-content-01">
            
                 <!-- <el-switch v-model="switchLogin" :active-action-icon="Select"
                :inactive-action-icon="CloseBold" :active-color="activeColor" :inactive-color="inactiveColor" /> -->
            <div>user logged in : {{ isLogin }}</div>
        </div>
        <!-- <button @click="userStore.userLogoutFunc" class="btn">Logout</button> -->
    </div>
</template>
<script setup lang='ts'>
import { useUserStore } from '../stores/userStore'
import { storeToRefs } from 'pinia'
const userStore = useUserStore()
const { isLogin } = storeToRefs(userStore)
// const isDark = ref(true)

watch(isDark, () => {
    console.log(isDark.value)
    toggleDark()
})
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
    justify-content: flex-start;
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