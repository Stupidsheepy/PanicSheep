<template>
    <div class="pwd-input">
        <div class="content-desc">{{ prop.pwdInputTitle }} : </div>
        <input :type="isShowPassword" name="password" v-model="password" autocomplete="off" required
            :placeholder="prop.placeholder">
        <div class="show-pwd-icon" v-if="prop.isCodeIcon === false" :class="isShowPasswordIcon" @click="ShowOrHidePwd">
        </div>
        <div class="show-pwd-icon" v-else :class="isShowCodeCheckIcon" @click="isClickCheckIcon"
            :title="isClickCode ? `请再等一分钟后尝试` : `点击获取验证码`">
        </div>
    </div>
</template>
<script setup lang='ts'>
import axios from 'axios'
const prop = defineProps({
    placeholder: {
        type: String,
        default: "enter password"
    },
    pwdInputTitle: {
        type: String,
        default: "password"
    },
    isCodeIcon: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        default: "2983626014@qq.com"
    }
})
const password = ref("")
const isShowPassword = ref("password")
const isShowPasswordIcon = ref("i-mdi-eye-off-outline")
const isClickCode = ref(false)
const isShowCodeCheckIcon = ref("i-mdi-check-circle-outline")
const ShowOrHidePwd = () => {
    if (isShowPassword.value === "password") {
        isShowPassword.value = "text"
        isShowPasswordIcon.value = "i-mdi-eye-outline"
    } else {
        isShowPassword.value = "password"
        isShowPasswordIcon.value = "i-mdi-eye-off-outline"
    }
}
const isClickCheckIcon = () => {
    isClickCode.value = true
    isShowCodeCheckIcon.value = "i-mdi-check-circle"
    axios.get("/api/getcode", {
        params: {
            email: prop.email
        }
    }
    )
        .then(res => {
            elMsg('success to get code', 'success')
            console.log(res.data)
        })
        .catch(err => console.log(err))
}
defineExpose({

})
</script>
<style lang='scss' scoped>
.show-pwd-icon {
    position: absolute;
    right: 0;
    font-size: 1.5rem;
}

.pwd-input {

    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    gap: 10px;
}

.content-desc {
    text-transform: capitalize;
}
</style>