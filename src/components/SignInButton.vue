<template>
    <div class="login-btn btn" @click="openloginPanel">
        Sign in
    </div>
    <div v-if="isPressLoginbtn" class="login-container">
        <!-- 点击阴影也能退出 -->
        <div class="loginPanelShadow" @click="isPressLoginbtn = !isPressLoginbtn"></div>

        <div class="login-panel">
            <form class="login-form">
                <div class="login-content">
                    <div class="login-content__header">
                        Sign In
                    </div>
                    <div class="login-content__item">
                        <!-- <span> username: </span><input type="text" name="username"
                            class="login-input" v-model="username" :placeholder="usernamePlaceholder" />
                         -->
                        <TextInput :placeholder="textInputPlaceholder" :inputTitle="textInputTitle" v-model="username" :username="username"></TextInput>
                    </div>

                    <div class="login-content__item">
                        <PwdInputIcon :placeholder="passwordPlaceholder" :pwdInputTitle="pwdInputTitle"
                            :isCodeIcon="isCodeIcon" :email="username"></PwdInputIcon>
                    </div>
                    <div class="email-code-signin" @click="isEmailCodeSignIn = !isEmailCodeSignIn">
                        {{ isEmailCodeSignIn ? 'use email to sign in' : 'use username to sign in' }}
                    </div>
                </div>
                <div class="btn login-button" @click="toLogin" type="submit">Submit</div>

            </form>

            <PanelCloseButton @click="isPressLoginbtn = !isPressLoginbtn"></PanelCloseButton>
        </div>
    </div>
</template>
<script setup lang='ts'>
import axios from 'axios';
const isPressLoginbtn = ref(false)
const username = ref("")
const password = ref("")
const textInputPlaceholder = ref("enter username or email")
const passwordPlaceholder = ref("enter password")
const isEmailCodeSignIn = ref(false)
const textInputTitle = ref("username")
const pwdInputTitle = ref("password")
const isCodeIcon = ref(false)
const toLogin = async () => {
    axios.post('/api/login', {
        username: username.value,
        password: password.value
    }).then(res => {
        console.log(res.data)
        elMsg('success to login', 'success')
    }).catch(err => {
        console.log(err)
        elMsg('fail to login', 'error')
    })
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
        isCodeIcon.value = true
    } else {
        textInputPlaceholder.value = "enter username"
        passwordPlaceholder.value = "enter password"
        pwdInputTitle.value = "password"
        textInputTitle.value = "username"
        isCodeIcon.value = false
    }
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

.login-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
    height: 100%;
    width: 100%;
}

.login-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;

    span {
        display: block;
        text-transform: capitalize;
        padding: 1px;
    }
}

.login-content__header {
    font-size: 1.6rem;
    font-weight: 600;
}

.login-content__item {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
    margin-right: 100px;
}

.email-code-signin {
    font-size: 0.8rem;
    font-weight: 600;
    color: #3b82f6;
    cursor: pointer;
    // justify-self: flex-end;
    align-self: flex-end;
    margin-right: 50px;
    user-select: none;
}

.email-code-signin:hover {
    text-decoration: underline;
}

.login-button {
    width: 50%;
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