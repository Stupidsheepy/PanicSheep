<template>
  <Suspense>
    <div class="tweet-container-items" v-for="(tweetDetails) in tweetList">
      <PostMessage :tweetDetails="tweetDetails" :widthSize="PostTweetSize.MEDIUM_SIZE"></PostMessage>
    </div>
  </Suspense>
  <EmptyPlace v-if="tweetList.length === 0"></EmptyPlace>
</template>
<script setup lang='ts'>
import { useRoute, useRouter } from 'vue-router'
import { searchTweetContent } from '~/apis/TweetApi';
import { PostTweetSize } from '~/types/TweetInfo';
import { TweetDetails } from '~/types/TweetInfo';
import type { HomeTweetListParams } from '~/types/TweetInfo';
import { getTweetDetails } from '~/apis/TweetApi';
import EmptyPlace from '~/components/EmptyPlace.vue';
const route = useRoute()
const rawTweetInfo = ref<HomeTweetListParams[]>([])
const tweetList = ref<TweetDetails[]>([])
const searchByContent = async () => {
  rawTweetInfo.value = await searchTweetContent(route.query.content as string)
  rawTweetInfo.value.forEach(async (homeTweetListParams) => {
    const details: TweetDetails = await getTweetDetails(homeTweetListParams.username, homeTweetListParams.tweetUuid)
    tweetList.value?.push(details)

  })
  tweetList.value = tweetList.value.sort((a, b) => {
    return b.createdAt.localeCompare(a.createdAt)
  })
  console.log(tweetList)
}
onBeforeMount(() => {
  searchByContent()
})
</script>
<style lang='scss' scoped></style>
