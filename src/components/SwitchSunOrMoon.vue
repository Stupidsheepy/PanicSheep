<template>
    <el-switch v-model="isDark" :active-action-icon="Sunny" :inactive-action-icon="Moon" :active-color="activeColor"
        :inactive-color="inactiveColor" />
</template>
<script setup lang='ts'>
import { Sunny, Moon } from '@element-plus/icons-vue'
import { useUserStore } from '../stores/userStore'
const userStore = useUserStore()
const isDark = ref(true)
const activeColor = ref("#3b82f6")
const inactiveColor = ref("#364152")

watch(isDark, () => {
    console.log(isDark.value)
    toggleDark()
})
</script>
<style lang='scss' scoped></style>