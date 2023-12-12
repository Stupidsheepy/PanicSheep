<template>
    <button class="btn" @click="deleteAccount">注销</button>
</template>
<script setup lang='ts'>
import axios from 'axios';
import { useUserStore } from '~/stores/userStore';
const userStore = useUserStore()
const deleteAccount = () => {
    axios.get("/api/delete", {
        params: {
            username: userStore.username
        }
    }).then(res => {
        console.log(res.data)
        userStore.userLogoutFunc()
        elMsg('success to delete user', 'success')
    }).catch(err => {
        console.log(err)
        elMsg('fail to delete user', 'error')

    })
}
</script>
<style lang='scss' scoped></style>