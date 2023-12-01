<template>
    <div class="bottom-nav-container">
        <div class="nav-item" @click="goPage('home')">Home</div>
        <div class="nav-item" @click="goPage('settings')">Settings</div>
        <div class="nav-item" @click="goPage('explore')">Explore</div>
        <PostButton></PostButton>
        <div class="nav-item" @click="goPage('profile')">Profile</div>
        <div class="nav-item" @click="goPage('notifications')">Notices</div>
    </div>
</template>
<script setup lang='ts'>
import { useRouter } from 'vue-router'
const router = useRouter()
function goPage(pathName: string | undefined): void {
    if (!pathName)
        return
    router.push({
        name: pathName,
        params: {
            pathname: pathName,
        },
    })
}
</script>
<style lang='scss' scoped>
.bottom-nav-container {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-around;
    align-items: center;
    // font-size: 2.1rem;
    font-weight: 700;
    padding: 10px;
    height: 100%;
    background-color: #f9f9f9;
}
</style>