<template>
    <div class="tweet-container">
        <!-- {{ username }} -->
        <!-- {{ tweetId }} -->
        <PostMessage :tweetDetails="tweetDetails" :widthSize="PostTweetSize.MAX_SIZE"></PostMessage>
    </div>
</template>
<script setup lang='ts'>
import { PostTweetSize } from '~/types/TweetInfo'
import type { TweetDetails } from '~/types/TweetInfo'
import { useRoute } from 'vue-router'
const route = useRoute()
console.log(route.params)
const tweetDetails: TweetDetails = {
    username: route.params.username as string,
    
}
</script>
<style lang='scss' scoped>
@import '~/styles/variables';

.tweet-container {
    margin-right: $sider-width;
}
</style>