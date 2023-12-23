<template>
  <!-- {{ props.activeTab }} -->
  <div class="profile-content-container" v-if="tweetCards" ref="profileContent">
    <el-card :body-style="{ padding: '0px' }" v-for="(tweetInfo, index) in tweetCards" :key="index"
      class="profile-content-card">
      <div class="i-mdi-close-circle delete-tweet-icon" @click="toDeleteTweet(tweetInfo.tweetUuid)"
        v-if="state === 'tweets' && (!route.query.username || route.query.username === userStore.username.toLowerCase())">
      </div>
      <img :src="tweetImageUrl(tweetInfo.tweetImage)" class="tweet-image-style" />
      <div style="padding: 14px">

        <span class="tweet-content">{{ tweetInfo.tweetContent }} </span>
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
import { deleteTweet } from '~/apis/OperateTweet';
import { ElMessageBox, ElMessage, ElLoading } from 'element-plus'
import { sleep } from '~/utils/SetDelay'
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
const tweetCards = ref<TweetCard[]>([])
const profileContent = ref<HTMLElement>()
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
let loading: any
const startLoading = () => {
  // Loading.service(options); options 参数为 Loading 的配置项
  // 使用loading变量来接收Loading.service返回的实例

  loading = ElLoading.service({
    target: profileContent.value,
    lock: true,
    text: 'Loading for getting tweets',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

const endLoading = async () => {
  await sleep(400)
  loading.close()
}

const createTweetCards = async (state: string) => {
  startLoading()
  const rawTweetCards: TweetCard[] = await getAllTweets(username.value, state);
  tweetCards.value = rawTweetCards.map((item) => {
    (item.tweetCreatedAt.indexOf("T") !== -1) ? item.tweetCreatedAt = item.tweetCreatedAt.split("T")[0] : item.tweetCreatedAt = item.tweetCreatedAt
    return item
  })

  endLoading()
  console.log(tweetCards.value)
}
watch(state, async (newVal) => {
  createTweetCards(newVal)
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
const toDeleteTweet = async (tweetUuid: string) => {
  ElMessageBox.confirm(
    'Are your sure to delete your tweet?',
    'Warning',
    {
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(async () => {
      await deleteTweet(tweetUuid, username.value)
      tweetCards.value.forEach((item, index) => {
        if (item.tweetUuid === tweetUuid) {
          tweetCards.value?.splice(index, 1)
        }
      })
      ElMessage({
        type: 'success',
        message: 'Delete completed',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
  // run

}
onBeforeMount(async () => {
  createTweetCards(state.value)
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
  position: relative;
  height: 24rem;
}

.delete-tweet-icon {
  position: absolute;
  top: 1%;
  right: 1%;
  width: 3rem;
  height: 3rem;
  background-color: grey;
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
  height: 3.5rem;
  word-break: break-all;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
