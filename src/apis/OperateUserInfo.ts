import axios from 'axios'
import { useUserStore } from '~/stores/userStore'
const setProfileCover = (imageUuid: string) => {
  const userStore = useUserStore()
  return axios.get('/set-profile-cover', {
    params: {
      username: userStore.username,
      imageUuid: imageUuid
    }
  })
}

export { setProfileCover }
