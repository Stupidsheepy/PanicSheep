import { defineStore } from 'pinia'
export const useDraftStore = defineStore(
  'my-draft-store',
  () => {
  },
  { // 使用默认持久化配置保存
    persist: true,
  }
)