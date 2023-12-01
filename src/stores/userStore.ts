import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserStore = defineStore(
    'my-user-store',
    () => {
        const userImageUrl = ref("heroimage.jpeg")
        const userName = ref("")
        const displayName = ref("")
        const bio = ref("")
        return {
            userImageUrl,
            userName,
            displayName,
            bio
        }
    },
    { // 使用默认持久化配置保存
        persist: true,
    }
)