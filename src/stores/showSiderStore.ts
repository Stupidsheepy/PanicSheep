import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useShowSiderStore = defineStore(
    'my-show-sider-store',
    () => {
        const isShowSider = ref(false)
        return { isShowSider }
    },
    { // 使用默认持久化配置保存
        persist: true,
    }
)