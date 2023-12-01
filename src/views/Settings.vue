<script setup lang='ts'>
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useOssImageStore } from '../stores/ossImageStore'
import { useUserStore } from '../stores/userStore'
const userStore = useUserStore()
const ossImageStore = useOssImageStore()
const imageUrl = ref("")
const displayName = ref("")
const userName = ref("")
const bio = ref("")

displayName.value = userStore.displayName
userName.value = userStore.userName
bio.value = userStore.bio
console.log(ossImageStore.ali_domain)
const clearInputData = () => {
  displayName.value = ''
  userName.value = ''
  bio.value = ''
  imageUrl.value = ''
}
const successSubmit = () => {
  ElMessage({
    message: 'Congrats, this is a success message.',
    type: 'success',
  })
}
const errorSubmit = () => {
  ElMessage.error('Oops, this is a error message.')
}
let file: any;
const fileInput = ref(null);
const backgrondConfig = ref(`url(${imageUrl.value}) no-repeat center center / cover`);
const unwatch = watch(imageUrl, (newVal) => {
  backgrondConfig.value = `url(${newVal}) no-repeat center center / cover`
})
const handleClick = () => {
  fileInput.value.click();
};

const previewImage = (event) => {
  file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    imageUrl.value = reader.result;
    console.log(reader.result)
  }
}

// const submitImage = (event) => {
//   const file = event.target.files[0];
//   const reader = new FileReader();
//   reader.readAsDataURL(file);
//   reader.onload = () => {
//     imageUrl.value = reader.result;
//     // 将图片数据发送给服务器
//     const formData = new FormData();
//     formData.append('file', file);
//     axios.post('/api/upload', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     }).then(response => {
//       // 处理服务器响应
//       console.log(response.data)
//     }).catch(error => {
//       // 处理请求错误
//       console.error(error);
//     });
//   };
// };
const submitImage = async () => {
  const formData = new FormData();
  formData.append('file', file);
  let ansString = await axios.post('/api/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then(response => {
    // 处理服务器响应
    console.log(response.data)
    return response.data
  }).catch(error => {
    // 处理请求错误
    throw new Error(error)
    // console.error(error);
  });
  return ansString
}
const submitInfo = async () => {
  let profile_image_uuid = await submitImage();
  console.log(displayName.value, userName.value, bio.value)
  axios.post('/api/setprofile', {
    "username": userName.value,
    "displayname": displayName.value,
    "bio": bio.value,
    "profile_image_uuid": profile_image_uuid
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      console.log(response.data);
      clearInputData()
      successSubmit()
    })
    .catch(error => {
      console.error(error);
      errorSubmit()
    });

}
onUnmounted(() => {
  unwatch()
})
</script>

<template>
  <div class="setting-container">
    <div class="profile-image">
      Profile Image
    </div>

    <!-- <div class="upload-div" @click="handleClick">
      <input type="file" accept="image/*" ref="fileInput" style="display: none" @change="submitImage">
      <img v-if="imageUrl" :src="imageUrl" alt="Image preview">
    </div> -->
    <div class="setting-avatar" @click="handleClick">
      <input type="file" name="file" accept="image/*" ref="fileInput" style="display: none;" @change="previewImage">
    </div>
    <div class="content-desc">Display Name : </div>
    <input type="text" name="displayname" v-model="displayName" required>
    <div class="content-desc">Username : </div>
    <input type="text" name="username" v-model="userName" autocomplete="off" required>
    <div class="content-desc">Bio : </div>
    <textarea name="bio" v-model="bio" placeholder=" please write your goal..." required></textarea>
    <button class="btn save-btn" @click="submitInfo" type="submit">Save</button>
  </div>
</template>

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
}

.profile-image {}

.setting-avatar {
  background: v-bind(backgrondConfig);
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

input,
textarea {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  text-decoration: none;
  width: 50%;
}

textarea {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  height: 160px;
  resize: none;
}

input:focus,
textarea:focus {
  outline: none;
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
</style>
