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
// const app = createApp(App)
// app.use(createPinia().use(piniaPluginPersistedstate))
const app = createApp(App)
app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)
app.use(ElementPlus)
app.mount('#app')
