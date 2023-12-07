<template>
    <div class="username-input">
        <div class="content-desc">{{ prop.inputTitle }} : </div>
        <input :type="isShowUsername" name="username" v-model="username" autocomplete="off" required
            :placeholder="prop.placeholder">
    </div>
</template>
<script setup lang='ts'>
const prop = defineProps({
    placeholder: {
        type: String,
        default: "enter username"
    },
    inputTitle: {
        type: String,
        default: "username"
    },
    isPwdIcon: {
        type: Boolean,
        default: false
    },
    username: {
        type: String,
        default: ""
    }
})
const username = ref("")
const isShowUsername = ref("text")
</script>
<style lang='scss' scoped>
.username-input {
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