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
defineExpose({ active })
// icons:

const icons = ref({
  home: 'i-mdi-home-outline',
  bell: 'i-mdi-bell-outline',
  cog: 'i-mdi-cog-outline',
  accountSettings: 'i-mdi-account-settings-outline',
  explore: 'i-mdi-magnify',
})
const exploreIconStyle = ref({
  'font-weight': '',
})
const iconIsClick = ref({
  home: false,
  bell: false,
  cog: false,
  accountSettings: false,
  explore: false,
})
function toggleButtons(buttonName: string) {
  switch (buttonName) {
    case 'home':
      iconIsClick.value.home = !iconIsClick.value.home
      // console.log(iconIsClick.value.home)
      if (iconIsClick.value.home)
        icons.value.home = 'i-mdi-home'
      else
        icons.value.home = 'i-mdi-home-outline'

      break
    case 'bell':
      iconIsClick.value.bell = !iconIsClick.value.bell
      if (iconIsClick.value.bell)
        icons.value.bell = 'i-mdi-bell'
      else
        icons.value.bell = 'i-mdi-bell-outline'

      break
    case 'accountSettings':
      iconIsClick.value.accountSettings = !iconIsClick.value.accountSettings
      if (iconIsClick.value.accountSettings)
        icons.value.accountSettings = 'i-mdi-account-settings'
      else
        icons.value.accountSettings = 'i-mdi-account-settings-outline'

      break
    case 'cog':
      iconIsClick.value.cog = !iconIsClick.value.cog
      if (iconIsClick.value.cog)
        icons.value.cog = 'i-mdi-cog'
      else
        icons.value.cog = 'i-mdi-cog-outline'

      break
    case 'explore':
      iconIsClick.value.explore = !iconIsClick.value.explore
      if (iconIsClick.value.explore)
        exploreIconStyle.value['font-weight'] = '800'
      else
        exploreIconStyle.value['font-weight'] = ''

      break
  }
}
</script>

<template>
  <div class="nav">
    <!-- <SiteLogo></SiteLogo> -->
    <div class="site-logo" @click="goPage('Home')">
      🐑PanicSheep
    </div>
    <div class="nav-item" :class="{ active: active === 'Home' }" @click="goPage('Home');toggleButtons('home')">
      <div class="nav-item__icon" :class="icons.home" />
      <div class="nav-item__words">
        Home
      </div>
    </div>
    <div class="nav-item" :class="{ active: active === 'Explore' }" @click="goPage('Explore');toggleButtons('explore')">
      <div :style="exploreIconStyle" class="nav-item__icon" :class="icons.explore" />
      <div class="nav-item__words">
        Explore
      </div>
    </div>
    <div class="nav-item" :class="{ active: active === 'Profile' }" @click="goPage('Profile');toggleButtons('accountSettings')">
      <div class="nav-item__icon" :class="icons.accountSettings" />
      <div class="nav-item__words">
        Profile
      </div>
    </div>
    <div class="nav-item" :class="{ active: active === 'Notifications' }" @click="goPage('Notifications');toggleButtons('bell')">
      <div class="nav-item__icon" :class="icons.bell" />
      <div class="nav-item__words">
        Notifications
      </div>
    </div>
    <div class="nav-item" :class="{ active: active === 'Settings' }" @click="goPage('Settings');toggleButtons('cog')">
      <div class="nav-item__icon" :class="icons.cog" />
      <div class="nav-item__words">
        Settings
      </div>
    </div>
    <div class="nav-item nav-post-button">
      <PostButton />
    </div>
  </div>
</template>

<style scoped>
.active {
    font-weight: 800;
}

.nav {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 25px;
    /* margin-left: 40px; */
}

.nav-item,
.site-logo {
    /* font-size: 2rem; */
    font-size: 2.1rem;
    border-radius: 10px;
    padding: 0 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 4px;
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

.nav-post-button:hover {
    background-color: white;
}

.nav-post-button {
    width: 100%;
}
</style>
