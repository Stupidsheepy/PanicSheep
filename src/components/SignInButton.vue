<template>
  <div class="login-btn btn" @click="openloginPanel">
    Sign in
  </div>
  <div v-if="isPressLoginbtn" class="login-container">
    <!-- 点击阴影也能退出 -->
    <div class="loginPanelShadow" @click="isPressLoginbtn = !isPressLoginbtn"></div>

    <div class="login-panel">
      <form class="login-form" @keydown.enter="toLogin">
        <div class="login-content">
          <div class="login-content__header">
            Sign In
          </div>
          <div class="login-content__items">
            <div class="login-content__item">
              <!-- <span> username: </span><input type="text" name="username"
                                class="login-input" v-model="username" :placeholder="usernamePlaceholder" />
                             -->
              <TextInput :placeholder="textInputPlaceholder" :inputTitle="textInputTitle" :isCheckIcon="isCheckIcon"
                ref="textInput">
              </TextInput>
            </div>
            <div class="login-content__item">
              <PwdInputIcon :placeholder="passwordPlaceholder" :pwdInputTitle="pwdInputTitle"
                :isPasswordIcon="!isEmailCodeSignIn" ref="pwdInput"></PwdInputIcon>
            </div>
          </div>

        </div>
        <div class="login-bottom">
          <div class="btn login-button" @click="toLogin" type="submit">Submit</div>
          <div class="btn" @click="toggleSignInMethod()">
            {{ !isEmailCodeSignIn ? 'use email to sign in' : 'use username to sign in' }}</div>
        </div>
      </form>
      <PanelCloseButton @click="isPressLoginbtn = !isPressLoginbtn"></PanelCloseButton>
    </div>
  </div>
</template>
<script setup lang='ts'>
import axios from 'axios';
import { useUserStore } from '../stores/userStore'
import { ElLoading } from 'element-plus'
interface optionsRef {
  [key: string]: string
}
const isPressLoginbtn = ref(false)
const textInputPlaceholder = ref("enter username")
const passwordPlaceholder = ref("enter password")
const isEmailCodeSignIn = ref(false)
const textInputTitle = ref("username")
const pwdInputTitle = ref("password")
const isCheckIcon = ref(false)
const textInput = ref()
const pwdInput = ref()
const options = ref<optionsRef>()
const pathUrl = ref('/login')
const userStore = useUserStore()
const toggleSignInMethod = () => {
  isEmailCodeSignIn.value = !isEmailCodeSignIn.value
  isCheckIcon.value = !isCheckIcon.value
}
const openloginPanel = () => {
  isPressLoginbtn.value = true
}
const unwatch = watch(isEmailCodeSignIn, (newVal) => {
  if (newVal) {
    textInputPlaceholder.value = "enter email"
    passwordPlaceholder.value = "enter code"
    pwdInputTitle.value = "code"
    textInputTitle.value = "email"
    pathUrl.value = "/verifycode"
  } else {
    textInputPlaceholder.value = "enter username"
    passwordPlaceholder.value = "enter password"
    pwdInputTitle.value = "password"
    textInputTitle.value = "username"
    pathUrl.value = "/login"
  }
})

const createOptions = (isEmailCodeSignIn: boolean): optionsRef => {
  if (isEmailCodeSignIn) {
    return {
      email: textInput.value.username,
      code: pwdInput.value.password
    }
  } else {
    return {
      username: textInput.value.username,
      password: pwdInput.value.password
    }
  }
}
let loading: any
const startLoading = () => {
  // Loading.service(options); options 参数为 Loading 的配置项
  // 使用loading变量来接收Loading.service返回的实例

  loading = ElLoading.service({
    lock: true,
    text: 'Loading for the submission',
    background: 'rgba(0, 0, 0, 0.7)',
  })
}

const endLoading = () => {
  loading.close()
}
const toLogin = async () => {
  startLoading()
  options.value = createOptions(isEmailCodeSignIn.value) as optionsRef
  await axios.post(pathUrl.value, options.value)
    .then(res => {
      endLoading()
      console.log(res.data.data)
      const userInfo = res.data.data
      console.log(userInfo);
      if (userInfo !== null) {
        elMsg('login success', 'success')
        userStore.userLoginFunc(userInfo)
      }
      else
        elMsg('fail to login', 'error')
      return userInfo
    })
  // console.log("token: ", userInfo?.token)
}
onMounted(() => {
  // init()
})
onUnmounted(() => {
  unwatch()
})
</script>
<style lang='scss' scoped>
.login-container {
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

.login-panel {
  color: black;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40vw;
  height: 25rem;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  z-index: 50;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
  height: 100%;
  width: 100%;
  font-size: 1.5rem;
}

.login-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  width: 100%;

  span {
    display: block;
    text-transform: capitalize;
    padding: 1px;
  }
}

.login-content__header {
  font-weight: 600;
}

.login-content__items {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  width: 100%;

}

.login-content__item {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  margin-right: 6.25rem;
  width: 70%;
}

.email-code-signin {
  font-size: 0.9rem;
  font-weight: 600;
  color: grey;
  cursor: pointer;
  // justify-self: flex-end;
  align-self: center;
  margin-right: 3.125rem;
  user-select: none;
}

.email-code-signin:hover {
  // text-decoration: underline;
  color: dodgerblue;
}

.login-button {
  width: 20%;
}

.login-bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  width: 100%;
}

.loginPanelShadow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
