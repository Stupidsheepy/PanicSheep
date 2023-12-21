<template>
  <div class="tweet-container">
    <!-- {{ route.params.username }} -->
    <!-- {{ route.params.tweetId }} -->
    <div class="switch-sort-btn">
      <el-radio-group v-model="sortWith" fill="#3b82f6" class="search-radios">
        <el-radio-button label="random" size="small">Random</el-radio-button>
        <el-radio-button label="lastUpdated" size="small">Updated</el-radio-button>
      </el-radio-group>
    </div>
    <!-- <transition-group name="tweet-list" mode="out-in">
      <div v-for="(item, index) in items" :key="index" class="">
        {{ item.text }}
      </div>
    </transition-group> -->
    <Suspense>
      <div class="tweet-container-items" v-for="(tweetDetails) in tweetList">
        <PostMessage :tweetDetails="tweetDetails" :widthSize="PostTweetSize.MEDIUM_SIZE"></PostMessage>
      </div>
    </Suspense>
  </div>
</template>
<script setup lang='ts'>
import { PostTweetSize } from '~/types/TweetInfo'
import { getHomeTweet, getTweetDetails } from '~/apis/TweetApi'
import type { TweetDetails, HomeTweetListParams } from '~/types/TweetInfo'
import { useUserStore } from '~/stores/userStore'
import { useRoute } from 'vue-router'
const route = useRoute()
const userStore = useUserStore()
const sortWith = ref("random")
watch(sortWith, (newVal) => {
  getAllTweets(newVal)
  console.log(newVal)
  console.log(tweetList.value)
})
// const username = userStore.username
console.log(route.params)
// const details = await getTweetDetails(username, route.params.tweetId as string)
// await nextTick()
const tweetList = ref<TweetDetails[]>([])
// const tweetDetails = ref<TweetDetails | null>(null)
const getAllTweets = async (type: string) => {
  // tweetList.value.forEach(() => {
  //   tweetList.value?.pop()
  // })
  tweetList.value = []
  const homeTweetListParams: HomeTweetListParams[] = await getHomeTweet(type)
  homeTweetListParams.forEach(async (item) => {
    const details: TweetDetails = await getTweetDetails(item.username, item.tweetUuid)
    // 切换得先把其他都remove掉
    tweetList.value?.push(details)
  })
}
onMounted(async () => {
  getAllTweets(sortWith.value)
})
</script>
<style lang='scss' scoped>
@import '~/styles/variables';

.tweet-container {
  margin-right: $sider-width;
  position: relative;
}

.switch-sort-btn {
  position: absolute;
  top: 0;
  right: -4rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-radios {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
}

.tweet-list-enter-active,
.follow-list-leave-active {
  transition: transform 0.5s;
}

.tweet-list-enter,
.follow-list-leave-to {
  animation: one-in 0.5s;
}

@keyframes one-in {
  from {
    padding-top: 100px;
    height: 0%;
  }

  to {
    padding-top: 0px;
    height: 100%;
  }
}
</style>
