import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useOssImageStore = defineStore(
  'my-oss-image-store',
  () => {
    const aliDomain = ref("http://sheepy-oss1.oss-cn-guangzhou.aliyuncs.com/")
    const avatarPrefix = ref("avatars/")
    const profileCoverPrefix = ref("profile-bg-images/")
    const tweetImagePrefix = ref("tweet-images/")
    return {
      aliDomain,
      avatarPrefix,
      profileCoverPrefix,
      tweetImagePrefix

    }
  },
  { // 使用默认持久化配置保存
    persist: true,
  }
)