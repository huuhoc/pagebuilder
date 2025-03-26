import './assets/index.css'
import 'virtual:svg-icons-register'

import { useConfigStore } from '../src/stores/configStore'
import type { ConfigState } from '../src/types/index'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

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

// Dynamically import and register all components from a specific folder
const components = import.meta.glob('./components/*.vue', { eager: true })
Object.entries(components).forEach(([path, module]) => {
  const componentName = path.replace('./components/', '').replace('.vue', '')
  app.component(componentName, (module as { default: any }).default)
})

const componentsCommon = import.meta.glob('./components/common/*.vue', { eager: true })
Object.entries(componentsCommon).forEach(([path, module]) => {
  const componentName = path.replace('./components/common/', '').replace('.vue', '')
  app.component(componentName, (module as { default: any }).default)
})

app.mount('#app-aqt')
