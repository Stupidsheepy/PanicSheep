<template>
    <div class="sider">
        <button @click="toggleDark()">
            <div class="i-mdi-weather-night" v-if="isDark"></div>
            <div class="i-mdi-weather-sunny" v-if="!isDark"></div>
        </button>
    </div>
</template>
<script setup lang='ts'>
</script>
<style lang='scss' scoped>
.sider {
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    height: 100%;
    width: 250px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
}
</style>