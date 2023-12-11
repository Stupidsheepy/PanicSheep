
<template>
  <div class="setting-container">
    <div class="profile-image">
      Profile Image :
    </div>

    <!-- <div class="upload-div" @click="handleClick">
      <input type="file" accept="image/*" ref="fileInput" style="display: none" @change="submitImage">
      <img v-if="imageUrl" :src="imageUrl" alt="Image preview">
    </div> -->
    <div @click="handleClick">
      <img :src="imagePath" alt="avatar_image" class="setting-avatar">
      <input type="file" name="file" accept="image/*" ref="fileInput" style="display: none;" @change="previewImage">
    </div>
    <div class="content-desc">Display Name : </div>
    <input type="text" name="displayname" v-model="displayName" required>
    <div class="content-desc">Username : </div>
    <input type="text" name="username" v-model="userName" autocomplete="off" required disabled
      style="background-color:#e8e8e8;">
    <!-- <PwdInputIcon :placeholder="`enter your password...`"></PwdInputIcon> -->
    <div class="content-desc">Password : </div>
    <div class="pwd-input">
      <input :type="isShowPassword" name="password" v-model="password" autocomplete="off" required>
      <div class="show-pwd-icon" :class="isShowPasswordIcon" @click="ShowOrHidePwd">
      </div>
    </div>
    <div class="content-desc">Bio : </div>
    <textarea name="bio" v-model="bio" placeholder=" please write your goal..." required></textarea>
    <button class="btn save-btn" @click="submitInfo" type="submit">Save</button>
  </div>
</template>
<script setup lang='ts'>
import axios from 'axios'
import { storeToRefs } from 'pinia'
// import { ElMessage } from 'element-plus'
// import elMsg from '~/composables/elMsg';
import { useOssImageStore } from '../stores/ossImageStore'
import { useUserStore } from '../stores/userStore'
import type { UserProfile } from '../types/UserInfo'
const userStore = useUserStore()
const ossImageStore = useOssImageStore()
const { aliDomain,avatarPrefix } = storeToRefs(ossImageStore)
const imageUrl = ref("")
const displayName = ref("")
const userName = ref("")
const bio = ref("")
const password = ref("")
const isShowPassword = ref("password")
const isShowPasswordIcon = ref("i-mdi-eye-off-outline")
const isUploadImage = ref(false)
const imagePath = computed(() => {
  return !isUploadImage.value ? aliDomain.value + avatarPrefix.value + imageUrl.value : imageUrl.value
})
displayName.value = userStore.displayName
userName.value = userStore.username
bio.value = userStore.bio
password.value = userStore.password
imageUrl.value = userStore.avatar
console.log(aliDomain.value, imageUrl.value)
const ShowOrHidePwd = () => {
  if (isShowPassword.value === "password") {
    isShowPassword.value = "text"
    isShowPasswordIcon.value = "i-mdi-eye-outline"
  } else {
    isShowPassword.value = "password"
    isShowPasswordIcon.value = "i-mdi-eye-off-outline"
  }
}
let file: any;

const fileInput = ref(null);
const handleClick = () => {
  if (fileInput.value == null)
    return;
  fileInput.value.click();
};

const previewImage = (event) => {
  file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    isUploadImage.value = true;
    imageUrl.value = reader.result;
    console.log("preview image: ", reader.result)
  }
}
const submitImage = async () => {
  const formData = new FormData();
  formData.append('file', file);
  let imageUUID = await axios.post('/api/upload/avatars', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then(response => {
    // 处理服务器响应
    console.log(response.data)
    return response.data.data.outdir
  }).catch(error => {
    // 处理请求错误
    throw new Error(error)
    // console.error(error);
  });
  return imageUUID
}
const submitInfo = async () => {
  // 先传图片，再到这里请求
  let profile_image_uuid = await submitImage();
  const optionsData: UserProfile = {
    "username": userName.value,
    "displayName": displayName.value,
    "password": password.value,
    "bio": bio.value,
    "avatar": profile_image_uuid
  }
  console.log(displayName.value, userName.value, bio.value)
  axios.post('/api/setprofile', optionsData)
    .then(response => {
      console.log(response.data);
      elMsg('success to update profile', 'success')
      userStore.updateUserStore(optionsData)
    })
    .catch(error => {
      console.error(error);
      elMsg('fail to update profile', 'error')
    });

}
onMounted(() => {
  isUploadImage.value = false;
})
</script>

<style lang='scss' scoped>
.setting-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  // align-content: center;
  gap: 5px;
  font-size: 1rem;
  font-weight: 400;
  height: 100%;
  margin-left: 20px;
  width: 80%;
}

.profile-image {}

.setting-avatar {
  border-radius: 50%;
  width: 200px;
  height: 200px;
}

.setting-avatar:hover {
  cursor: pointer;
  border: #3b82f6 1px solid;
  // background 10% become bigger;
  background-size: 110%;
}



// .save-btn {

// /* font-size: 2rem; */
// }

.upload-div {
  width: 100px;
  height: 100px;
  background-image: url('image-icon.png');
  background-size: cover;
  cursor: pointer;
}

.show-pwd-icon {
  position: relative;
  right: 20px;
}

.pwd-input {
  display: flex;
  justify-content: flex-start;
  width: 100%;
}
</style>
