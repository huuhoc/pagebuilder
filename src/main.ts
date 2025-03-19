import './assets/index.css'
import 'virtual:svg-icons-register'

import { useConfigStore } from '../src/stores/configStore'
import type { ConfigState } from '../src/types/index'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import ElSection from '@/components/ElSection.vue'
import ElSliderPost from '@/components/ElSliderPost.vue'
import ElListPost from '@/components/ElListPost.vue'
import ElListPostCategory from '@/components/ElListPostCategory.vue'
import ElFeaturePost from '@/components/ElFeaturePost.vue'

const app = createApp(App)

// Initialize Pinia
const pinia = createPinia()
app.use(pinia)

// Initialize config store with provided configuration
const config: ConfigState = {
  root: '',
  appApi: '',
  appCoreApi: '',
}
const configStore = useConfigStore(pinia)
// configStore.initialize(config)

app.component('SvgIcon', SvgIcon)
app.component('ElSection', ElSection)
app.component('ElSliderPost', ElSliderPost)
app.component('ElListPost', ElListPost)
app.component('ElListPostCategory', ElListPostCategory)
app.component('ElFeaturePost', ElFeaturePost)

app.mount('#app-aqt')
