<template>
    <div class="lil-profile-info">
        <img class="lil-profile-image" :src="imagePath">
        <div class="lil-profile-details">
            <span class="lil-profile-name">{{ userStore.displayName }}</span>
            <span class="lil-profile-username">@{{ userStore.username }}</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lil-profile-icon">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
        </svg>
    </div>
</template>
<script setup lang='ts'>
import { useUserStore } from '~/stores/userStore'
import { useOssImageStore } from '~/stores/ossImageStore';
const userStore = useUserStore()
const ossImageStore = useOssImageStore()
const imagePath = computed(() => {
    return ossImageStore.aliDomain + ossImageStore.avatarPrefix + userStore.avatar
})
</script>
<style lang='scss' scoped>
.lil-profile-info {
    background-color: transparent;
    border-radius: 9999px;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 25px;
    
}

.lil-profile-info:hover {
    background-color: #3b82f6;
    color: white;
}


.lil-profile-image {
    position: relative;
    overflow: hidden;
    width: 32px;
    height: 32px;
    border-radius: 9999px;
}

.lil-profile-details {
    display: flex;
    flex-direction: column;
}

.lil-profile-name {
    font-weight: 600;
}

.lil-profile-username {
    color: #aaa;
}

.lil-profile-icon {
    width: 24px;
    height: 24px;
    margin-left: auto;
}
</style>