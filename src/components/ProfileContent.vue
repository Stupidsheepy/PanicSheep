<template>
  <!-- {{ props.activeTab }} -->
  <div class="profile-content-container" v-if="tweetCards">
    <el-card :body-style="{ padding: '0px' }" v-for="(tweetInfo, index) in tweetCards" :key="index"
      class="profile-content-card">
      <img :src="tweetImageUrl(tweetInfo.tweetImage)" class="tweet-image-style" />
      <div style="padding: 14px">
        <span class="tweet-content">{{ tweetInfo.tweetContent }} Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Dolorem, quam,
          praesentium neque doloremque reiciendis laborum minima qui tempore tenetur earum a repellendus eaque pariatur
          quis provident vel tempora inventore cupiditate!</span>
        <div class="bottom">
          <el-button text class="button" @click="goToTweet(tweetInfo.tweetUuid)">Go to Tweet</el-button>
          <span class="time">{{ tweetInfo.tweetCreatedAt }}</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { getAllTweets } from '~/apis/OperateTweet';
import { useUserStore } from '~/stores/userStore';
import { useOssImageStore } from '~/stores/ossImageStore';
interface TweetCard {
  tweetUuid: string
  tweetImage: string
  tweetContent: string
  tweetCreatedAt: string
}
const ossImageStore = useOssImageStore()
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const username = ref("")
const tweetCards = ref<TweetCard[]>()
username.value = route.query.username ? route.query.username as string : userStore.username
const props = defineProps({
  activeTab: {
    type: String,
    default: "tweets"
  }
})
const state = computed(() => {
  return props.activeTab
})

watch(state, async (newVal) => {
  tweetCards.value = await getAllTweets(username.value, newVal);
})

const tweetImageUrl = ((tweetImage: string) => {
  if (tweetImage === "profile_cover.png")
    return "/profile_cover.png"
  return ossImageStore.getTweetImageUrl(tweetImage)
})
const goToTweet = (tweetUuid: string) => {
  router.push({
    name: "tweet",
    params: {
      tweetId: tweetUuid,
      username: username.value
    }
  })
}

onBeforeMount(async () => {
  tweetCards.value = await getAllTweets(username.value, state.value);
  console.log(tweetCards.value)
})
</script>

<style>
.profile-content-container {
  padding: 5px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  gap: 5px;

}

.profile-content-card {
  flex: 0 0 24%;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.tweet-image-style {
  width: 100%;
  height: 15rem;
  object-fit: cover;
}

.tweet-content {
  /* 超过40words自动生成省略号 */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  height: auto;
  word-break: break-all;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
