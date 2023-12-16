import axios from 'axios'
enum UploadPath {
    avatar = 'avatars',
    profile = 'profile-bg-images',
    tweet = 'tweet-images'
}
const submitImage = async (file: any, pathName: UploadPath): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post(`/upload/${pathName}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then(response => {
        // 处理服务器响应
        console.log(response.data)
        return response.data.data.outdir
    })
}

export { submitImage, UploadPath }