<template>
    <div class="nav-container">
        <div class="site-logo" @click="goPage('Home')">
            <span>🐑PanicSheep</span>
        </div>

        <div v-for="navItem in navItems" :key="navItem.name" class="nav-item" :class="{ active: active === navItem.name }"
            @click="goPage(navItem.name)">
            <div :class="['nav-item__icon', navItem.icon]" />
            <div class="nav-item__words">
                {{ navItem.name }}
            </div>
        </div>
        <div class="nav-btn">
            <SignUpButton />
        </div>
        <div class="nav-btn">
            <SignInButton />
        </div>
    </div>
</template>
<script setup lang='ts'>
import { useRouter } from 'vue-router'
const active = ref('Home')
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
    // 切换页面时，将active的值改为当前页面的name
    active.value = pathName
}
interface NavItems {
    name: string,
    icon: string,
}
const navItems = ref<NavItems[]>([
    {
        name: 'home',
        icon: 'i-mdi-home-outline',
    },
    {
        name: 'explore',
        icon: 'i-mdi-magnify',
    },
])
// const unwatch = watch(active, (newVal: string) => {
//     console.log(newVal)
//     newVal = newVal.toLowerCase()
//     icons.value.home = 'i-mdi-home-outline'
//     icons.value.accountSettings = 'i-mdi-account-settings-outline'
//     icons.value.bell = 'i-mdi-bell-outline'
//     icons.value.cog = 'i-mdi-cog-outline'

//     if (newVal === 'home')
//         icons.value.home = 'i-mdi-home'
//     else
//         icons.value.home = 'i-mdi-home-outline'
//     if (newVal === 'profile')
//         icons.value.accountSettings = 'i-mdi-account-settings'
//     else
//         icons.value.accountSettings = 'i-mdi-account-settings-outline'
//     if (newVal === 'notifications')
//         icons.value.bell = 'i-mdi-bell'
//     else
//         icons.value.bell = 'i-mdi-bell-outline'
//     if (newVal === 'settings')
//         icons.value.cog = 'i-mdi-cog'
//     else
//         icons.value.cog = 'i-mdi-cog-outline'


// })
// defineExpose({ active })
// // icons:

// const icons = ref({
//     home: 'i-mdi-home-outline',
//     bell: 'i-mdi-bell-outline',
//     cog: 'i-mdi-cog-outline',
//     accountSettings: 'i-mdi-account-settings-outline',
//     explore: 'i-mdi-magnify',
// })
// const exploreIconStyle = ref({
//     'font-weight': '',
// })
// const iconIsClick = ref({
//     home: false,
//     bell: false,
//     cog: false,
//     accountSettings: false,
//     explore: false,
// })
// // 要让iconIsClick的值在改变的同时

// watch(iconIsClick, (newVal) => {
// })
// onUnmounted(() => {
//     unwatch()
// })
</script>
<style lang="scss" scoped>
.active {
    font-weight: 800;
}

.nav-container {
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5625rem;
    /* 25px */
    /* margin-left: 2.5rem; */
    /* 40px */
}

.nav-item,
.site-logo {
    /* font-size: 2rem; */
    font-size: 2rem;
    /* 20px */
    border-radius: 0.625rem;
    /* 10px */
    padding: 0 0.625rem;
    /* 10px */
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 0.25rem;
    /* 4px */
    /* 用户复制失效 */
    user-select: none;
}

.site-logo:hover {
    cursor: pointer;
    font-weight: 800;
}

.nav-item__icon:hover {
    color: black;
}

.nav-item:hover {
    background-color: #e8e8e8;
    font-weight: 800;
    cursor: pointer;
}

.nav-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
</style>
