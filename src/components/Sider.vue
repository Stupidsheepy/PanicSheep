<template>
    <div class="sider">
        <!-- <button @click="toggleDark()">
            <div class="i-mdi-weather-night" v-if="isDark"></div>
            <div class="i-mdi-weather-sunny" v-if="!isDark"></div>
        </button> -->
        <el-switch v-model="value1" :active-action-icon="Sunny" :inactive-action-icon="Moon" :active-color="activeColor"
            :inactive-color="inactiveColor" /> <el-switch v-model="isLogin" :active-action-icon="Select"
            :inactive-action-icon="CloseBold" :active-color="activeColor" :inactive-color="inactiveColor" />
    </div>
</template>
<script setup lang='ts'>
import { Sunny, Moon, Select, CloseBold } from '@element-plus/icons-vue'
import { useUserStore } from '../stores/userStore'
import { storeToRefs } from 'pinia';
const userStore = useUserStore()
const { isLogin } = storeToRefs(userStore)
const value1 = ref(true)
const activeColor = ref("#3b82f6")
const inactiveColor = ref("#364152")
watch(value1, () => {
    console.log(value1.value)
    toggleDark()
})
</script>
<style lang='scss' scoped>
.sider {
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    height: 100%;
    width: 250px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
}
</style>