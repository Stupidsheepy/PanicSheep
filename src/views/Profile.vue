<template>
  <div class="container">
    <!-- 上部分 -->
    <div class="profile-info" :style="backgroundImage">
      <!-- change background button -->
      <div class="btn profile-bg-btn" @click="handleClick"
        v-if="!route.query.username || route.query.username === userStore.username">
        设置背景图
        <input type="file" name="file" accept="image/*" ref="fileInput" style="display: none;" @change="previewImage">
      </div>
      <button v-if="isUploadImage" class="btn profile-bg-btn btn-second" @click="toSetProfileCover">save?</button>
      <!-- <input type="file" name="file" accept="image/*" ref="fileInput" style="display: none;" @change="previewImage"> -->
      <!-- 头像 -->
      <img :src="avatarUrl" class="avatar rotate-image">
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
      <button class="btn" @click="debouncedToggleTab('tweets')"
        :class="{ activeTab: activeTab === 'tweets' }">tweets</button>
      <button class="btn" @click="debouncedToggleTab('likes')"
        :class="{ activeTab: activeTab === 'likes' }">likes</button>
      <button class="btn" @click="debouncedToggleTab('comments')"
        :class="{ activeTab: activeTab === 'comments' }">comments</button>
      <!-- 其他 Tab -->
    </div>
    <div class="active-container">
      <ProfileContent :activeTab="activeTab"></ProfileContent>
    </div>
  </div>
</template>
<script setup lang='ts'>
import { useOssImageStore } from '../stores/ossImageStore';
import { useUserStore } from '../stores/userStore';
import { useRoute } from 'vue-router';
import { setProfileCover } from '~/apis/OperateUserInfo'
import { submitImage, UploadPath } from '~/apis/Upload'
import { debounce } from 'lodash'
import axios from 'axios';
const userStore = useUserStore();
const ossImageStore = useOssImageStore();
const displayName = ref(userStore.displayName);
const username = ref(userStore.username);
const bio = ref(userStore.bio);
const route = useRoute()
const isUploadImage = ref(false)
const activeTab = ref('tweets')
// const profileCover = ref("profile_cover.jpg")
const toggleTab = (tab: any) => {
  // 处理按钮点击事件的逻辑
  activeTab.value = tab;
};

const debouncedToggleTab = debounce(toggleTab, 200);

const avatarUrl = ref("")
avatarUrl.value = ossImageStore.getAvatarUrl(userStore.avatar)
const imageUrl = ref(userStore.profileCover)
const backgroundImage = computed(() => {
  return `background: url('${imageUrl.value !== 'profile_cover.png' ? (imageUrl.value.startsWith("data") ?
    imageUrl.value : ossImageStore.getProfileCoverUrl(imageUrl.value)) : imageUrl.value}') no-repeat center / cover;`
})
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
let file: any;

const fileInput = ref(null);
const handleClick = () => {
  if (fileInput.value == null)
    return;
  (fileInput as any).value.click();
};
const previewImage = (event: any) => {
  file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    isUploadImage.value = true;
    (imageUrl as any).value = reader.result;
    console.log("preview image: ", reader.result)
  }
}
const toSetProfileCover = async () => {
  //  TODO
  imageUrl.value = await submitImage(file, UploadPath.profile)
  isUploadImage.value = false
  elMsg("success set profile cover", "success")
  setProfileCover(imageUrl.value).then((res) => {
    userStore.profileCover = imageUrl.value
  })
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
      console.log(res.data.data)
      displayName.value = res.data.data.displayName
      username.value = res.data.data.username
      bio.value = res.data.data.bio
      avatarUrl.value = ossImageStore.getAvatarUrl(res.data.data.userAvatar)
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

.btn-second {
  top: 5rem;
  right: 0.5rem;
}

.active-container {
  margin-top: 1rem;
}
</style>
