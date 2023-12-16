<template>
    <div class="post-panel-container">
        <div class="user-avatar-wrapper"><img class="user-avatar" :src="imagePath" /></div>
        <textarea class="post-panel-input" placeholder="What's happening?" v-model="postContent">
        </textarea>

    </div>
    <div class="tweet-image-save" v-if="tweetImages.length !== 0">
        <!-- 拖拽换位置，同时同步数据array的位置 -->
        <img v-for="(item, index) in tweetImages" class="tweet-image-save__item" :src="item" @click="deleteImage(index)" />
    </div>
    <div class="post-panel-footer">
        <!-- mdi:file-image-box -->
        <!-- i-mdi-image-edit -->
        <div @click="handleClick">
            <div class="image-icon" :class="imageIcon" @mouseover="active = !active" @mouseleave="active = !active"
                title="you could only insert 4 pics">
                <input type="file" name="file" accept="image/*" ref="fileInput" style="display: none;"
                    @change="previewImage" :disabled="tweetImages.length >= 4">
            </div>

        </div>
        <div class="btn submit-post-btn" @click="submitTweet">Submit</div>
    </div>
</template>
<script setup lang='ts'>
import { useUserStore } from '~/stores/userStore'
import type { TweetParams } from '~/types/TweetInfo'
import { useRouter } from 'vue-router'
import { UploadPath, submitImage } from '~/apis/Upload'
import axios from 'axios'
const userStore = useUserStore()
const router = useRouter()
const imagePath = userStore.avatarImagePath
const tweetImages = ref<string[]>([])
const postContent = ref('')
const isUploadImage = ref(false)
const imageIcon = ref('i-mdi-image-edit-outline')
const active = ref(false)
watch(active, (newVal) => {
    if (newVal) {
        console.log('active')
        imageIcon.value = 'i-mdi-image-edit'
    } else {
        console.log('inactive')
        imageIcon.value = 'i-mdi-image-edit-outline'
    }
})

let files: Array<File> = []
const fileInput = ref(null);
const handleClick = () => {
    if (tweetImages.value.length >= 4) {
        console.log('you could only insert 4 pics')
        elMsg('there are max images now', 'warning')
        return
    }
    if (fileInput.value == null)
        return;
    (fileInput.value as any).click();
};
let file: File;
const previewImage = (event) => {
    const fileList: FileList = event.target.files
    // for (let item in fileList) {
    //     files.push(fileList[item])
    // }
    file = fileList[fileList.length - 1]
    files.push(file)
    // files.push(event.target.files[0])
    // event.target.files.forEach((file, index) => {
    //     console.log('file: ', index, file)
    //     // files.push(file)
    // })
    console.log(event.target.files)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        isUploadImage.value = true;
        tweetImages.value.push(reader.result as string)
        console.log("preview image: ", reader.result)
    }
}

const deleteImage = (index: number) => {
    console.log('delete image')
    tweetImages.value.splice(index, 1)
    files.splice(index, 1)
}

const submitTweet = async () => {

    const tweetImageUUIDPromise: Promise<string[]> = files.map(async (file) => {
        return await submitImage(file, UploadPath.tweet)
    })
    // 将promise数组转换为string数组,
    const tweetImageUUID = Promise.all(await tweetImageUUIDPromise).then((res) => {
        return res
    })
    console.log('tweetImageUUID: ', tweetImageUUID)
    // profile_image_uuids.forEach(async (uuid) => {
    //     console.log('uuid: ', uuid)
    // })
    const tweetParams: TweetParams = {
        username: userStore.username,
        content: postContent.value,
        // await 拿到promise的结果
        tweetImage: await tweetImageUUID
    }
    console.log(tweetParams)
    await axios.post('/add-tweet', tweetParams).then(res => {
        console.log(res.data)
        console.log(res.data.code)
        if (res.data.code == 200) {
            elMsg('tweet success', 'success')
            router.push({
                name: 'tweet',
                params: {
                    tweetId: res.data.data.uuid,
                    username: userStore.username
                }
            })
            // router.push(`tweet/${res.data.data.uuid}/${userStore.username}`)
        }

    })
}
</script>
<style lang='scss' scoped>
@import '~/styles/variables';

.post-panel-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    padding: 1rem;
    width: 100%;
    min-height: 280px;
    overflow: auto;
}

.user-avatar-wrapper {
    height: 280px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.user-avatar {
    margin-top: 1rem;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    object-fit: cover;
}

.post-panel-input {
    width: 90%;
    min-height: 250px;
    border: none;
    outline: none;
    resize: none;
    font-size: 1.5rem;
    font-family: inherit;
    color: #fff;
    background-color: transparent;
}

.tweet-image-save {
    width: 100%;
    overflow-x: auto;
    height: 8rem;
    display: flex;
    gap: 5px;
    justify-content: flex-start;
    align-items: center;
}

.tweet-image-save__item {
    // width: 15rem;
    height: 6rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border-radius: 10px;
    object-fit: cover;
}

.post-panel-footer {
    width: 100%;
    height: 5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
    align-items: center;
}

.image-icon {
    width: 3rem;
    height: 3rem;
    color: $theme-color;
}

.submit-post-btn {
    width: 15rem;
}

::-webkit-scrollbar {
    width: 0px;
    background: transparent;
}
</style>