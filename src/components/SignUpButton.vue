<template>
  <div class="register-btn btn" @click="openregisterPanel">
    Sign up
  </div>
  <div v-if="isPressSignUpBtn" class="register-container">
    <!-- 点击阴影也能退出 -->
    <div class="registerPanelShadow" @click="isPressSignUpBtn = !isPressSignUpBtn"></div>

    <div class="register-panel">
      <div class="register-form">
        <div class="register-header">
          Sign Up
        </div>
        <div class="register-content" v-if="!isGetCode && !isCorrectCode">
          <div class="register-content__item"><span> Email: </span><input type="email" name="email" class="register-input"
              v-model="userEmail" /></div>
        </div>
        <div class="register-content" v-else-if="isGetCode && !isCorrectCode">
          <div class="register-content__item"><span> Code: </span><input type="text" name="code" class="register-input"
              v-model="userCode" /></div>
        </div>
        <div class="register-content" v-else>
          <div class="register-content__item"><span> Username:</span><input type="text" name="username"
              class="register-input" v-model="username" /></div>
          <div class="register-content__item">
            <span> Password:</span><input type="text" name="password" class="register-input" v-model="userPassword" />
          </div>
        </div>
        <div class="btn register-button" @click="getCode" v-if="!isGetCode && !isCorrectCode">Submit Email</div>
        <div class="btn register-button" @click="verifyCode" v-else-if="isGetCode && !isCorrectCode">Submit Code
        </div>
        <div class="btn register-button" @click="setUsernameAndPassword" title="you can only set once" v-else>Save
        </div>
      </div>
      <PanelCloseButton @click="isPressSignUpBtn = !isPressSignUpBtn"></PanelCloseButton>
    </div>
  </div>
</template>
<script setup lang='ts'>
//TODO 创建用户的时候，需要先检查用户名是否重复，如果重复，需要提示用户
//TODO @keydown.enter input button
import axios from 'axios';
// import type { UserInfo } from '~/types/UserInfo';
// import elMsg from ''
import { useUserStore } from '../stores/userStore'
const isPressSignUpBtn = ref(false)
const username = ref('')
const userPassword = ref('')
const userEmail = ref('')
const userCode = ref('')
const isGetCode = ref(false)
const isCorrectCode = ref(false)
const userStore = useUserStore()
function openregisterPanel() {
  // console.log('register panel')
  isPressSignUpBtn.value = true
}

const getCode = () => {
  axios.get('/getcode', {
    params: {
      email: userEmail.value
    }
  }).then(res => {
    console.log(res.data)
    isGetCode.value = true
    elMsg('success to get code', 'success')
  }).catch(err => {
    console.log(err)
    elMsg('fail to get code', 'error')
  })
}
const verifyCode = async () => {
  await axios.post('/verifycode', {
    email: userEmail.value,
    code: userCode.value
  }).then(res => {
    console.log(res.data)
    elMsg('success to verify code', 'success')
    //刷新界面：
    if (res.data === true)
      isCorrectCode.value = true
  }).catch(err => {
    console.log(err)
    elMsg('fail to verify code', 'error')
  })
}
const setUsernameAndPassword = async () => {
  axios.get('/set-username-and-password', {
    params: {
      username: username.value,
      password: userPassword.value,
      email: userEmail.value,
    }
  }).then(async (res) => {
    console.log(res.data)
    let useInfo = await axios.post("/login", {
      username: username.value,
      password: userPassword.value
    }).then(res => {
      console.log(res.data)
      return res.data.data
    })
    userStore.userLoginFunc(useInfo)
    elMsg('success to set username', 'success')
  }).catch(err => {
    console.log(err)
    elMsg('fail to set username', 'error')
  })
}

</script>
<style lang='scss' scoped>
.register-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 3;
}

/* .post-btn { */
/* font-size: 2rem; */
/* } */

.register-panel {
  color: black;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 35vw;
  height: 25rem;
  background-color: #ffffff;
  border: 0.067rem solid rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  z-index: 50;
  box-shadow: 0 0 0.267rem rgba(0, 0, 0, 0.1);
}

.register-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3.333rem;
  height: 100%;
  width: 100%;
  font-size: 1.5rem;
}

.register-header {
  font-weight: 600;

}

.register-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  width: 100%;
}

.register-content__item {
  width: 100%;
}

.register-content__item span {
  width: 6.667rem;
  text-align: right;
  padding: 1rem;
  box-sizing: border-box;
}

.register-input {
  width: 20rem;
}

.register-button {
  width: 13.333rem;
}

.registerPanelShadow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
