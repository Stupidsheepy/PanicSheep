import { defineStore } from 'pinia'
import { ref } from 'vue'
import { UserInfo, UserProfile } from '../types/UserInfo'
import { useOssImageStore } from './ossImageStore'
export const useUserStore = defineStore(
  'my-user-store',
  () => {
    const ossImageStore = useOssImageStore()
    const password = ref("")
    const avatar = ref("")
    const username = ref("")
    const displayName = ref("")
    const email = ref("")
    const bio = ref("")
    const token = ref("")
    const vip = ref(false)
    const isLogin = ref(false)
    const profileCover = ref("")
    const avatarImagePath = computed(() => {
      return ossImageStore.aliDomain + ossImageStore.avatarPrefix + avatar.value
    })
    const initAnonymousUser = {
      username: "",
      password: "nihao",
      email: "sheepland.smail.com",
      avatar: "heroimage.jpeg",
      profileCover: "profile_cover.jpg",
      bio: "dingzheng",
      displayName: "",
      token: "114514",
      vip: false
    }
    const userLoginFunc = (User: UserInfo = initAnonymousUser) => {
      elMsg("Login Success", "success")
      username.value = User.username
      displayName.value = User.displayName
      email.value = User.email
      bio.value = User.bio
      password.value = User.password
      vip.value = User.vip
      token.value = User.token
      avatar.value = User.avatar
      profileCover.value = User.profileCover
      isLogin.value = true
      // console.log("userLogin success")
      // refresh window
      // window.location.reload()
    }
    const userLogoutFunc = () => {
      isLogin.value = false
      elMsg("Logout Success", "warning")
      // console.log("userLogout success")
      avatar.value = "heroimage.jpeg"
      username.value = ""
      displayName.value = ""
      email.value = ""
      bio.value = ""
      password.value = ""
      token.value = ""
      window.location.reload()
    }
    const updateUserStore = (User: UserProfile) => {
      displayName.value = User.displayName
      bio.value = User.bio
      password.value = User.password
      avatar.value = User.userAvatar
    }
    return {
      avatar,
      profileCover,
      username,
      displayName,
      bio,
      isLogin,
      email,
      password,
      token,
      vip,
      userLoginFunc,
      userLogoutFunc,
      initAnonymousUser,
      updateUserStore,
      avatarImagePath
    }
  },
  { // 使用默认持久化配置保存
    persist: true,
  }
)
