import './assets/index.css'
import 'virtual:svg-icons-register'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import SvgIcon from '@/components/SvgIcon.vue'

const app = createApp(App)

app.use(createPinia())
app.component('SvgIcon', SvgIcon)

app.mount('#app-aqt')
