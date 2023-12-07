<template>
    <div class="pwd-input">
        <div class="content-desc">{{ prop.pwdInputTitle }} : </div>
        <input v-if="isPasswordIcon" :type="isShowPassword" name="password" v-model="password" autocomplete="off" required
            :placeholder="prop.placeholder">
        <input v-if="!isPasswordIcon" type="text" name="password" v-model="password" autocomplete="off" required
            :placeholder="prop.placeholder">
        <div class="show-pwd-icon" :class="isShowPasswordIcon" @click="ShowOrHidePwd" v-if="isPasswordIcon">
        </div>

    </div>
</template>
<script setup lang='ts'>
const prop = defineProps({
    placeholder: {
        type: String,
        default: "enter password"
    },
    pwdInputTitle: {
        type: String,
        default: "password"
    },
    isPasswordIcon: {
        type: Boolean,
        default: true
    }
})

const password = ref("")
const isShowPassword = ref("password")
const isShowPasswordIcon = ref("i-mdi-eye-off-outline")
isShowPassword.value = prop.isPasswordIcon ? "password" : "text"
const ShowOrHidePwd = () => {
    if (isShowPassword.value === "password") {
        isShowPassword.value = "text"
        isShowPasswordIcon.value = "i-mdi-eye-outline"
    } else {
        isShowPassword.value = "password"
        isShowPasswordIcon.value = "i-mdi-eye-off-outline"
    }
}
defineExpose({
    password,
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