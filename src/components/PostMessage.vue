<script setup lang='ts'>
import type { TweetDetails } from '~/types/TweetInfo'
import { PostTweetSize } from '~/types/TweetInfo'
const props = defineProps({
  tweetDetails: {
    // ????
    type: Object as PropType<TweetDetails>,
    required: true,
  },
  widthSize: {
    type: String,
    default: PostTweetSize.MEDIUM_SIZE,
  },
})
const icons = ref({
  thumbUp: 'i-mdi-thumb-up-outline',
  reply: 'i-mdi-reply-outline',
  comment: 'i-mdi-comment-outline',

})
const iconIsClick = ref({
  thumbUp: false,
  reply: false,
  comment: false,
})
function toggleButtons(buttonName: string) {
  switch (buttonName) {
    case 'thumbUp':
      iconIsClick.value.thumbUp = !iconIsClick.value.thumbUp
      if (iconIsClick.value.thumbUp)
        icons.value.thumbUp = 'i-mdi-thumb-up'

      else
        icons.value.thumbUp = 'i-mdi-thumb-up-outline'

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
  }
}
</script>

<template>
  <div class="post-message">
    <div class="post-message-header">
      <img class="post-message-avatar" src="https://via.placeholder.com/50x50" alt="Avatar">
      <div class="post-message-user">
        <h3 class="post-message-username">
          {{ props.username }}
        </h3>
        <p class="post-message-handle">
          @{{ props.tweetId }}
        </p>
      </div>
    </div>
    <div class="post-message-content">
      <p class="post-message-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, sapien vel
        bibendum bibendum, velit sapien bibendum sapien, vel bibendum sapien velit.
      </p>
      <img class="post-message-image" src="https://via.placeholder.com/500x250" alt="Post Image">
    </div>
    <div class="post-message-footer">
      <p class="post-message-timestamp">
        2 hours ago
      </p>
      <div class="post-message-actions">
        <button class="post-message-action-button">
          <div :class="icons.thumbUp" class="post-message-action-button__icon" @click="toggleButtons('thumbUp')" />
          <span class="post-message-action-count">10</span>
        </button>
        <button class="post-message-action-button">
          <div :class="icons.reply" class="post-message-action-button__icon" @click="toggleButtons('reply')" />
          <span class="post-message-action-count">5</span>
        </button>
        <button class="post-message-action-button">
          <div :class="icons.comment" class="post-message-action-button__icon" @click="toggleButtons('comment')" />
          <span class="post-message-action-count">2</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post-message {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  width: v-bind(widthSize);
  height: 40rem;
}

.post-message-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  color: #4b5170;
}

.post-message-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 16px;
}

.post-message-user {
  display: flex;
  flex-direction: column;
}

.post-message-username {
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
}

.post-message-handle {
  margin: 0;
  font-size: 1rem;
  color: #666;
}

.post-message-content {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.post-message-text {
  margin: 0;
  font-size: 1.2rem;
  line-height: 1.5;
}

.post-message-image {
  margin-top: 16px;
  border-radius: 10px;
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
</style>
