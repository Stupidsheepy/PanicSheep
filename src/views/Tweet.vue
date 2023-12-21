<template>
  <div class="tweet-container">
    <!-- {{ route.params.username }} -->
    <!-- {{ route.params.tweetId }} -->
    <Suspense>
      <template #default>
        <PostMessage :tweetDetails="tweetDetails" :widthSize="PostTweetSize.MAX_SIZE"></PostMessage>
      </template>
      <template #fallback>
        <PostMessageSkeleton></PostMessageSkeleton>
      </template>
    </Suspense>
  </div>
</template>
<script setup lang='ts'>
import { PostTweetSize } from '~/types/TweetInfo'
import { getTweetDetails } from '~/apis/TweetApi'
import type { TweetDetails } from '~/types/TweetInfo'
// import { useUserStore } from '~/stores/userStore'
import { useRoute } from 'vue-router'
const route = useRoute()
// const userStore = useUserStore()
// const username = userStore.username
console.log(route.params)
// const details = await getTweetDetails(username, route.params.tweetId as string)
// await nextTick()
const tweetDetails = ref<TweetDetails | null>(null)
const routeParams = computed(() => {
  return route.params
})
watch(routeParams, async (newVal) => {
  const details = await getTweetDetails(routeParams.value.username as string, routeParams.value.tweetId as string)
  tweetDetails.value = details
})
onBeforeMount(async () => {
  try {
    const details = await getTweetDetails(routeParams.value.username as string, routeParams.value.tweetId as string)
    tweetDetails.value = details
  } catch (error) {
    console.error(error)
  }
})
</script>
<style lang='scss' scoped>
@import '~/styles/variables';

.tweet-container {
  margin-right: $sider-width;
}
</style>
