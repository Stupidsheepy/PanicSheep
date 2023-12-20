<template>
  <div class="container">
    <!-- 上部分 -->
    <div class="profile-info" :style="backgroundImage">
      <!-- change background button -->
      <button class="btn profile-bg-btn" @click="setProfileCover">
        设置背景图
      </button>
      <!-- <input type="file" name="file" accept="image/*" ref="fileInput" style="display: none;" @change="previewImage"> -->
      <!-- 头像 -->
      <img :src="imagePath" class="avatar rotate-image">
      <!-- 用户信息 -->
      <div class="user-info">
        <div class="display-name">{{ displayName }}</div>
        <div class="username">username: {{ username }}</div>
        <div class="bio">
          Bio: {{ bio }}
        </div>
        <div class="user-interactions">
          <div class="desc">following:</div>
          <div class="following">0</div>
          <div class="desc">fans:</div>
          <div class="fans">0</div>
          <div class="desc">liked:</div>
          <div class="get-likes">
            0
          </div>
        </div>
      </div>
    </div>

    <!-- 下部分 -->
    <div class="tab-bar">
      <!-- Tab 栏 -->
      <button class="btn" @click="activeTab = 'tweet'" :class="{ activeTab: activeTab === 'tweet' }">tweets</button>
      <button @click="activeTab = 'likes'" class="btn" :class="{ activeTab: activeTab === 'likes' }">likes</button>
      <button @click="activeTab = 'comments'" class="btn"
        :class="{ activeTab: activeTab === 'comments' }">comments</button>
      <!-- 其他 Tab -->
    </div>

    <div class="content">
      <!-- 根据 Tab 栏的选择显示不同的内容 -->
      <!-- 笔记内容 -->
      <div v-if="activeTab === 'tweet'">
        <!-- 笔记列表 -->
      </div>

      <!-- 赞过内容 -->
      <div v-if="activeTab === 'likes'">
        <!-- 赞过列表 -->
      </div>

      <!-- 评论内容 -->
      <div v-if="activeTab === 'comments'">
        <!-- 评论列表 -->
      </div>
    </div>
    <div class="active-container">

    </div>
  </div>
</template>
<script setup lang='ts'>
import { useOssImageStore } from '../stores/ossImageStore';
import { useUserStore } from '../stores/userStore';
import { useRoute } from 'vue-router';
import axios from 'axios';
const userStore = useUserStore();
const ossImageStore = useOssImageStore();
const displayName = ref(userStore.displayName);
const username = ref(userStore.username);
const bio = ref(userStore.bio);
const route = useRoute()

const activeTab = ref('tweet')
// const profileCover = ref("profile_cover.jpg")
const profileCover = computed(() => {
  return ossImageStore.aliDomain + ossImageStore.profileCoverPrefix + userStore.profileCover;
})
const backgroundImage = computed(() => {
  return `background: url('${profileCover.value}') no-repeat center / cover;`
})
const imagePath = ref("heroimage.jpeg")
// let file: any;

// const fileInput = ref(null);
// const handleClick = () => {
//   if (fileInput.value == null)
//     return;
//   fileInput.value.click();
// };

// const previewImage = (event) => {
//   file = event.target.files[0];
//   const reader = new FileReader();
//   reader.readAsDataURL(file);
//   reader.onload = () => {
//     isUploadProfileCover.value = true;
//     profileCover.value = reader.result;
//     console.log("preview image: ", reader.result)
//   }
// }
const setProfileCover = () => {
  console.log("nihao")
}

onBeforeMount(() => {
  console.log("before mount")
  console.log(route.query.username)
  if (route.query.username == null) {
    return
  }
  axios.get(`/get-profile?username=${route.query.username}`).then(res => {
    if (res.data.data === null)
      elMsg('user not exist', 'error');
    else {
      displayName.value = res.data.data.displayName
      username.value = res.data.data.username
      bio.value = res.data.data.bio
      imagePath.value = res.data.data.userAvatar
      elMsg('find the user', 'success');
    }
  })
})
</script>

<style lang='scss' scoped>
@import '../styles/rotate.scss';


.container {
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.profile-info {
  height: 20rem;
  display: flex;
  align-items: center;
  align-content: space-around;
  justify-content: center;
  padding: 1rem;
  gap: 3rem;

  position: relative;
}

.profile-bg-btn {
  font-size: 0.8rem;
  position: absolute;
  right: 1rem;
  top: 1rem;
  background-color: #f7f7f7;
  opacity: 0.55;
  color: #666;
}

.profile-bg-btn:hover {
  opacity: 1;
  background-color: #e8e8e8;
  color: #000;
}

.avatar {
  border-radius: 50%;
  width: 16rem;
  height: 16rem;
}

.avatar:hover {
  cursor: pointer;
  border: #3b82f6 1px solid;
  // background 10% become bigger;
  background-size: 110%;
}


.user-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.9rem;
  padding: 1rem;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
  opacity: 0.8;

  .display-name {
    font-size: 2rem;
    font-weight: 800;
  }

  .username {
    color: #666;
  }

  .user-interactions {
    display: flex;
    gap: 1rem;


    .desc {
      color: #666;
    }
  }
}

.tab-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-bottom: #f0f0f0 1px solid;

  button {
    background-color: #f7f7f7;
    color: #666;
  }

  button:hover {
    background-color: #e8e8e8;
    color: #000;
  }
}

.content {
  flex-grow: 1;
  padding: 1rem;
}

button {
  margin: 0 0.5rem;

  &.activeTab {
    background-color: #e8e8e8;
    color: #000;
  }
}
</style>
