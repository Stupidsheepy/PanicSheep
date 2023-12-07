import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserType } from '../types/userType'
export const useUserStore = defineStore(
    'my-user-store',
    () => {
        const userImageUrl = ref("heroimage.jpeg")
        const userName = ref("anonymous")
        const displayName = ref("Anonymous")
        const userEmail = ref("")
        const bio = ref("")
        const password = ref("")
        const isLogin = ref(false)
        const userLogin = (User: UserType) => {
            userName.value = User.userName
            displayName.value = User.displayName
            userEmail.value = User.userEmail
            bio.value = User.bio
            password.value = User.password
            console.log("userLogin success")
            // refresh window
            window.location.reload()
        }
        const userLogout = () => {
            console.log("userLogout success")
            userImageUrl.value = "heroimage.jpeg"
            userName.value = "anonymous"
            displayName.value = "Anonymous"
            userEmail.value = ""
            bio.value = ""
            password.value = ""
            window.location.reload()
        }
        return {
            userImageUrl,
            userName,
            displayName,
            bio,
            isLogin,
            userEmail,
            password,
            userLogin,
            userLogout
        }
    },
    { // 使用默认持久化配置保存
        persist: true,
    }
)