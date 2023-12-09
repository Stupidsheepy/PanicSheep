import { defineStore } from 'pinia'
import { ref } from 'vue'
import { UserInfo } from '../types/UserInfo'
export const useUserStore = defineStore(
    'my-user-store',
    () => {
        const password = ref("")
        const avatar = ref("")
        const username = ref("")
        const displayName = ref("")
        const email = ref("")
        const bio = ref("")
        const token = ref("")
        const vip = ref(false)
        const isLogin = ref(false)
        const initAnonymousUser = {
            username: "anonymous",
            password: "nihao",
            email: "sheepland.smail.com",
            avatar: "heroimage.jpeg",
            bio: "dingzheng",
            displayName: "Anonymous",
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
            username.value = "anonymous"
            displayName.value = "Anonymous"
            email.value = ""
            bio.value = ""
            password.value = ""
            token.value = ""
            window.location.reload()
        }
        return {
            avatar,
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
            initAnonymousUser
        }
    },
    { // 使用默认持久化配置保存
        persist: true,
    }
)