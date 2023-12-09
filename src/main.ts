import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import App from './App.vue'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import './styles/style.scss'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import axios from 'axios'
import { storeToRefs } from 'pinia'
import { useUserStore } from './stores/userStore'

// const app = createApp(App)
// app.use(createPinia().use(piniaPluginPersistedstate))
const app = createApp(App)
app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)
app.use(ElementPlus)
const userStore = useUserStore()
const { isLogin } = storeToRefs(userStore)
// vue router beforeeach
// router.beforeEach((to, from, next) => {
//   // if (from.path === '/')
//   //   next()
//   if (localStorage.getItem('user-token') === null)
//     next("/")
//   let userToken = JSON.parse(localStorage.getItem('user-token') as string)
//   if (userToken.token === null) {
//     next("/")
//   } else {
//     axios({
//       url: "/api/verifytoken",
//       method: "GET",
//       headers: {
//         "Authorization": userToken.token
//       }
//     }).then((res: any) => {
//       console.log(res)
//     })
//   }
//   next()
// })


router.beforeEach(async (to, from, next) => {
  const whiteList = [
    "home", "explore"
  ]
  const token = JSON.parse(localStorage.getItem('my-user-store') as string).token
  if ((isLogin.value === false || token === null || token === "" || token === undefined) && to.name !== 'home') {
    if (whiteList.includes(to.name as string))
      next()
    else {
      elMsg('请先登录', 'error')
      next({ name: 'home' })
    }
  } else {
    if (to.name === 'home')
      next()
    else {
      console.log("nihao verifytoken: ", token)
      axios.get('/api/verifytoken', {
        headers: {
          "Authorization": token
        }
      }).then(res => {
        console.log(res.data)
      }).catch(err => {
        console.log(err)
      })
      next()
    }
  }
})
  // const userToken = JSON.parse(localStorage.getItem('user-token') as string)
  // if (userToken.token === null) {
  //   next("/")
  //   return // 添加 return 语句
  // } else {
  //   axios({
  //     url: "/api/verifytoken",
  //     method: "GET",
  //     headers: {
  //       "Authorization": userToken.token
  //     }
  //   }).then((res: any) => {
  //     console.log(res)
  //   })
  //   next()
  // }

app.mount('#app')
