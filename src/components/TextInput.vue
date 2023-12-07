<template>
    <div class="username-input">
        <div class="content-desc">{{ prop.inputTitle }} : </div>
        <input :type="isShowUsername" name="username" v-model="username" autocomplete="off" required
            :placeholder="prop.placeholder">
        <div v-if="isCheckIcon" class="show-check-icon" :class="isShowCodeCheckIcon" @click="isClickCheckIcon"
            :title="isClickCode ? `请再等一分钟后尝试` : `点击获取验证码`">
        </div>
    </div>
</template>
<script setup lang='ts'>
import axios from 'axios';
const prop = defineProps({
    placeholder: {
        type: String,
        default: "enter username"
    },
    inputTitle: {
        type: String,
        default: "username"
    },
    isCheckIcon: {
        type: Boolean,
        default: false
    }
})
const username = ref("")
const isShowUsername = ref("text")
const isClickCode = ref(false)
const isShowCodeCheckIcon = ref("i-mdi-check-circle-outline")
const isClickCheckIcon = () => {
    isClickCode.value = true
    isShowCodeCheckIcon.value = "i-mdi-check-circle"
    axios.get("/api/getcode", {
        params: {
            email: username.value
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
    username,
})
</script>
<style lang='scss' scoped>
.username-input {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    gap: 10px;
    position: relative;
}

.content-desc {
    text-transform: capitalize;
}

.show-check-icon {
    position: absolute;
    right: 0;
    font-size: 1.5rem;
}
</style>