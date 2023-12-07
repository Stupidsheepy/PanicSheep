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
                <div class="register-content" v-if="!isGetCode">
                    <span> Email: </span><input type="email" name="email" class="register-input" v-model="userEmail" />
                </div>
                <div class="register-content" v-else>
                    <span> Code: </span><input type="text" name="code" class="register-input" v-model="userCode" />
                </div>
                <div class="btn register-button" @click="getCode" v-if="!isGetCode">Submit Email</div>
                <div class="btn register-button" @click="verifyCode" v-else>Submit Code</div>
            </div>
            <PanelCloseButton @click="isPressSignUpBtn = !isPressSignUpBtn"></PanelCloseButton>
        </div>
    </div>
</template>
<script setup lang='ts'>
import axios from 'axios';
// import elMsg from ''
import { useUserStore } from '../stores/userStore'
const isPressSignUpBtn = ref(false)
const userEmail = ref('')
const userCode = ref('')
const isGetCode = ref(false)
const userStore = useUserStore()
function openregisterPanel() {
    // console.log('register panel')
    isPressSignUpBtn.value = true
}

const getCode = () => {
    axios.get('/api/getcode', {
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
    await axios.post('/api/verifycode', {
        email: userEmail.value,
        code: userCode.value
    }).then(res => {
        console.log(res.data)
        elMsg('success to verify code', 'success')
        userStore.isLogin = true
        userStore.userLogin(res.data)
        //刷新界面：
    }).catch(err => {
        console.log(err)
        elMsg('fail to verify code', 'error')
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
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 300px;
    background-color: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    z-index: 50;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.register-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
    height: 100%;
    width: 100%;
}

.register-header{
    font-size: 1.5rem;
    font-weight: 600;

}
.register-content {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
}

.register-button {
    width: 50%;
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