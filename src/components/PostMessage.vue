<script setup lang='ts'>
import type { TweetDetails } from '~/types/TweetInfo'
import { PostTweetSize } from '~/types/TweetInfo'
import { sleep } from '~/utils/SetDelay';
import { likeTweet } from '~/apis/OperateTweet';
import { useUserStore } from '~/stores/userStore';
import { useOssImageStore } from '~/stores/ossImageStore';
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const { text, copy } = useClipboard()
const ossImageStore = useOssImageStore()
const userLikeState = ref(0)
const isPostMessageWrapper = ref()
isPostMessageWrapper.value = route.name === 'tweet' ? "" : "post-message-wrapper"
const routeName = computed(() => {
  return route.name as string
})
watch(routeName, (newVal) => {
  if (newVal === 'tweet')
    isPostMessageWrapper.value = ""
  else
    isPostMessageWrapper.value = "post-message-wrapper"
})
const props = defineProps({
  tweetDetails: {
    // ????
    type: Object as PropType<TweetDetails> | null,
    default: null, // 设置默认值为空对象
    required: true,
  },
  widthSize: {
    type: String,
    default: PostTweetSize.MEDIUM_SIZE,
  },
})
const avatarUrl = computed(() => {
  return ossImageStore.getAvatarUrl(props.tweetDetails?.userAvatar)
})
const tweetImageUrl = computed((): string[] => {
  return props.tweetDetails?.tweetImage?.map((item) => {
    return ossImageStore.getTweetImageUrl(item)
  })
})
const icons = ref({
  thumbUp: 'i-mdi-thumb-up-outline',
  thumbedUp: 'i-mdi-thumb-up',
  reply: 'i-mdi-reply-outline',
  comment: 'i-mdi-comment-outline',
  copy: 'i-mdi-content-copy',
  threeDot: 'i-mdi-dots-horizontal'
})
const iconIsClick = ref({
  thumbUp: false,
  reply: false,
  comment: false,
})
const pressCopy = () => {
  sleep(500).then(() => {
    icons.value.copy = 'i-mdi-check'
    // 复制tweet链接：
    // const fullUrl = window.location.href;
    const bathUrl = window.location.origin + '/user/' + props.tweetDetails.username + '/tweet/' + props.tweetDetails.tweetUuid
    copy(bathUrl)
    sleep(500).then(() => {
      elMsg(`copy success: ${text.value}`, "success");
      icons.value.copy = 'i-mdi-content-copy'
    })

  })
}
const pressThumbUp = async () => {
  sleep(500).then(() => {
    props.tweetDetails.isLiked = !props.tweetDetails.isLiked
    if (props.tweetDetails.isLiked)
      userLikeState.value = 1
    else
      userLikeState.value = -1
    props.tweetDetails.likeCount += userLikeState.value
    // 点赞的是登录的人
    likeTweet(props.tweetDetails.tweetUuid, useUserStore().username, props.tweetDetails.isLiked).then((res: any) => {
      console.log(res.data.data)
      if (res.data.code === 200)
        elMsg('success to like tweet', 'success')
      else
        elMsg('fail to like tweet', 'error')
    })
  })
}
function toggleButtons(buttonName: string) {
  switch (buttonName) {
    case 'thumbUp':
      // iconIsClick.value.thumbUp = !iconIsClick.value.thumbUp
      // if (iconIsClick.value.thumbUp)
      //   icons.value.thumbUp = 'i-mdi-thumb-up'

      // else
      //   icons.value.thumbUp = 'i-mdi-thumb-up-outline'
      pressThumbUp();
      break
    case 'comment':
      iconIsClick.value.comment = !iconIsClick.value.comment
      if (iconIsClick.value.comment)
        icons.value.comment = 'i-mdi-comment'

      else
        icons.value.comment = 'i-mdi-comment-outline'

      break
    case 'reply':
      iconIsClick.value.reply = !iconIsClick.value.reply
      if (iconIsClick.value.reply)
        icons.value.reply = 'i-mdi-reply'

      else
        icons.value.reply = 'i-mdi-reply-outline'
      break
    case 'copy':
      pressCopy();
      break
    case 'threeDot':

      break
  }
}
const goToProfile = () => {
  router.push({
    name: 'profile',
    query: {
      username: props.tweetDetails.username
    }
  })
}
const imgPreviewList = ref<any>([])
const showImagePreview = ref(false)

const handlePreview = async () => {
  showImagePreview.value = true
  imgPreviewList.value = tweetImageUrl.value
}

const closePreview = () => {
  imgPreviewList.value = []
  showImagePreview.value = false
}
const goToTweet = () => {
  router.push({
    name: 'tweet',
    params: {
      username: props.tweetDetails.username,
      tweetId: props.tweetDetails.tweetUuid
    }
  })
}
</script>

<template>
  <div class="wrapper" v-if="props.tweetDetails">
    <div class="post-message" :class="isPostMessageWrapper" @click="goToTweet">
      <div class="post-message-header">

        <div class="post-message-header-avatar-info">
          <img class="post-message-avatar" :src="avatarUrl" alt="Avatar" @click.stop="goToProfile">
          <div class="post-message-user">
            <h3 class="post-message-display-name">
              {{ props.tweetDetails.displayName }}
            </h3>
            <p class="post-message-username">
              @{{ props.tweetDetails.username }}
            </p>
          </div>
        </div>
        <el-popover placement="bottom" :width="50" trigger="click">
          <template #reference>
            <button class="post-message-action-button" :title="`copy the full url to your clipboard`">
              <div :class="icons.threeDot" class="post-message-action-button__icon"
                @click.stop="toggleButtons('threeDot')" />
            </button>
          </template> <template #default>
            <div class="wrapper"><button class="btn three-dot-btn">Block User</button></div>
          </template>
        </el-popover>
        <!-- <button class="post-message-action-button" :title="`copy the full url to your clipboard`">
          <div :class="icons.threeDot" class="post-message-action-button__icon" @click="toggleButtons('threeDot')" />
        </button> -->
      </div>

      <div class="post-message-content">
        <p class="post-message-text">
          {{ props.tweetDetails.tweetContent }}
        </p>
        <!-- 添加图片放大的预览 -->
        <div class="swiper-container" v-if="tweetDetails.tweetImage.length">
          <el-carousel trigger="click" height="250px" :autoplay="true" :loop="true" indicator-position="outside">
            <el-carousel-item v-for="(item, index) in tweetImageUrl" :key="index">
              <img :src="item" alt="Post Image" class="full-width-height" @click.stop="handlePreview" />
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- 图片预览 -->
        <el-image-viewer v-if="showImagePreview" :zoom-rate="1.2" @close="closePreview" :url-list="imgPreviewList" />
        <!-- <el-carousel :loop="false" height="300px">
          <el-carousel-item v-for="(item, index) in props.tweetDetails.tweetImage" :key="index">
            <img class="post-message-image" :src="'/' + item" alt="Post Image"> </el-carousel-item>
        </el-carousel> -->
      </div>
      <div class="post-message-footer">
        <p class="post-message-timestamp">
          {{ props.tweetDetails.createdAt }}
        </p>
        <div class="post-message-actions">
          <button class="post-message-action-button" :title="`copy the full url to your clipboard`">
            <div :class="icons.copy" class="post-message-action-button__icon" @click.stop="toggleButtons('copy')" />
          </button>
          <button class="post-message-action-button">
            <div :class="[props.tweetDetails.isLiked ? icons.thumbedUp : icons.thumbUp,]"
              class="post-message-action-button__icon" @click.stop="toggleButtons('thumbUp')" />
            <span class="post-message-action-count">{{ props.tweetDetails.likeCount }}</span>
          </button>
          <button class="post-message-action-button">
            <div :class="icons.reply" class="post-message-action-button__icon" @click.stop="toggleButtons('reply')" />
            <span class="post-message-action-count">5</span>
          </button>
          <button class="post-message-action-button">
            <div :class="icons.comment" class="post-message-action-button__icon" @click.stop="toggleButtons('comment')" />
            <span class="post-message-action-count">2</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.post-message {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  width: v-bind(widthSize);
  height: auto;
}

.post-message-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  color: #4b5170;
}

.post-message-header-avatar-info {
  display: flex;
  align-items: center;
}

.post-message-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 16px;
}

.post-message-avatar:hover {
  cursor: pointer;
  border: #3b82f6 3px solid;
  // background 10% become bigger;
  background-size: 110%;
}

.post-message-user {
  display: flex;
  flex-direction: column;
}

.post-message-display-name {
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
}

.post-message-username {
  margin: 0;
  font-size: 1rem;
  color: #666;
}

.post-message-content {
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.post-message-text {
  margin: 0;
  font-size: 1.2rem;
  line-height: 1.5;
  font-weight: 600;
  width: 500px;
  word-break: break-all;
  text-align: left;
  text-indent: 2em;
}

.post-message-image {

  width: 500px;
  height: 250px;
}

.post-message-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-message-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.post-message-action-button {
  display: flex;
  align-items: center;
  margin-right: 16px;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.post-message-action-button__icon:hover {
  color: #000;
}

.post-message-action-button__icon {
  font-size: 1.5rem;
  color: #666;
}

.post-message-action-count {
  margin-left: 8px;
  font-size: 1.2rem;
}

.post-message-timestamp {
  margin: 0;
  font-size: 1rem;
  color: #666;
}

.swiper-container {
  overflow: hidden;
  margin-top: 16px;
  border-radius: 10px;
  width: 500px;
  height: 250px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.swiper-container:hover {
  cursor: pointer;
  border: 2px solid pink;
}

.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #475669;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}


.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
}

.post-message-wrapper:hover {
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.full-width-height {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Optional: This property specifies how the contents of the <img> should be resized to fit its container. */
}

button.three-dot-btn {
  // style="background-color:#475669; color:white;
  background-color: #475669;
  color: white;
}
</style>
