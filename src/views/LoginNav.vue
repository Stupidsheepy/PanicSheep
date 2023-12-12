<template>
    <div class="nav-container">
        <!-- <SiteLogo></SiteLogo> -->
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
            <PostButton />
        </div>
        <div class="nav-profile-btn">
            <el-popover placement="bottom" :width="200" trigger="click" popper-style="border-radius: 10px;">
                <template #reference>
                    <LilProfileBtn></LilProfileBtn>
                </template>
                <div class="nav-profile-panel">
                    <div class="header">Setting</div>
                    <button @click="userStore.userLogoutFunc" class="btn">Logout</button>
                    <DeleteUserBtn></DeleteUserBtn>
                </div>
            </el-popover>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { useUserStore } from '../stores/userStore'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import DeleteUserBtn from '~/components/DeleteUserBtn.vue';
const userStore = useUserStore()
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
    {
        name: 'profile',
        icon: 'i-mdi-account-settings-outline',
    },
    {
        name: 'notifications',
        icon: 'i-mdi-bell-outline',
    },
    {
        name: 'settings',
        icon: 'i-mdi-cog-outline',
    },
])
// const icons = ref({
//     home: 'i-mdi-home-outline',
//     bell: 'i-mdi-bell-outline',
//     cog: 'i-mdi-cog-outline',
//     accountSettings: 'i-mdi-account-settings-outline',
//     explore: 'i-mdi-magnify',
// })
const active = ref("")
// 使用useRoute()获取当前路由信息
active.value = useRoute().name as string
const router = useRouter()
function goPage(pathName: string | undefined): void {
    active.value = pathName as string
    if (!pathName)
        return
    router.push({
        name: pathName,
        params: {
            pathname: pathName,
        },
    })
    // 切换页面时，将active的值改为当前页面的name

}
const unwatch = watch(active, (newVal: string, oldVal: string) => {
    console.log("active: ", active)
    console.log("oldVal: ", oldVal)
    console.log("newVal: ", newVal)
    for (let i = 0; i < navItems.value.length; i++) {
        if (navItems.value[i].name === 'explore') {
            continue;
        }
        if (navItems.value[i].name === newVal) {
            navItems.value[i].icon = navItems.value[i].icon.replace('-outline', '')
            console.log(navItems.value[i].icon)
        }
        if (navItems.value[i].name === oldVal) {
            navItems.value[i].icon += '-outline'
            console.log(navItems.value[i].icon)
        }
    }
})
defineExpose({ active })
// icons:

// const iconIsClick = ref({
//     home: false,
//     bell: false,
//     cog: false,
//     accountSettings: false,
//     explore: false,
// })
// 要让iconIsClick的值在改变的同时

// watch(iconIsClick, (newVal) => {
// })
onMounted(() => {
    for (let i = 0; i < navItems.value.length; i++) {
        if (navItems.value[i].name === 'explore') {
            continue;
        }
        if (navItems.value[i].name === active.value) {
            navItems.value[i].icon = navItems.value[i].icon.replace('-outline', '')
            console.log(navItems.value[i].icon)
        }
    }
})
onUnmounted(() => {
    unwatch()
})  
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
    gap: 25px;
    /* margin-left: 40px; */
    height: 100%;
    position: relative;
}

.nav-item,
.site-logo {
    /* font-size: 2rem; */
    font-size: 1.5rem;
    border-radius: 10px;
    padding: 0 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 4px;
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

.nav-item__words {
    text-transform: capitalize;
}

.nav-profile-btn {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    // align-self: flex-end;
    position: absolute;
    bottom: 50px;
}

.nav-profile-panel {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;
    height: 200px;
}
</style>
