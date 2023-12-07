import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useOssImageStore = defineStore(
  'my-oss-image-store',
  () => {
    const ali_domain = ref("http://sheepy-oss1.oss-cn-guangzhou.aliyuncs.com")
    return { ali_domain }
  },
  { // 使用默认持久化配置保存
    persist: true,
  }
)