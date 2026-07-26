import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/styles/variables.css'
import './assets/styles/global.css'
import './utils/gsap-slow'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
