<template>
    <div class="tweet-container">
        <!-- {{ username }} -->
        <!-- {{ tweetId }} -->
        <PostMessage :username="username" :tweetId="tweetId"></PostMessage>
    </div>
</template>
<script setup lang='ts'>
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
console.log(route.params)
const username = route.params.username
const tweetId = route.params.tweetId
</script>
<style lang='scss' scoped>
@import '~/styles/variables';

.tweet-container {
    margin-right: $sider-width;
}
</style>