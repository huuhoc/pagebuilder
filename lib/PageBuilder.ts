import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'virtual:svg-icons-register'
import { useConfigStore } from '../src/stores/configStore'
import { useElementStore } from '../src/stores/layouts'
import type { ConfigState } from '../src/types/index'

import App from '../src/App.vue'
import SvgIcon from '../src/components/SvgIcon.vue'
import ElSection from '../src/components/ElSection.vue'
import ElSliderPost from '../src/components/ElSliderPost.vue'
import ElListPost from '../src/components/ElListPost.vue'
import ElListPostCategory from '../src/components/ElListPostCategory.vue'
import ElFeaturePost from '../src/components/ElFeaturePost.vue'

import '../src/assets/index.css'
export class PageBuilder {
  static el: HTMLElement

  private static app: ReturnType<typeof createApp> | null = null

  private static storeLayout

  static mount(config: ConfigState): void {
    try {
      // Validate required parameters
      if (!config.root || !config.appApi) {
        throw new Error('Missing required configuration parameters')
      }

      // Mount the widget with the provided configuration
      console.log('Mounting page builder with config:', config)

      // Initialize your widget here
      // This is where you would implement the actual widget mounting logic
      const doRender = () => {
        const rootElement = document.getElementById(config.root || 'pagebuilder-contain')
        if (!rootElement) {
          throw new Error(
            `Root element with id "${config.root || 'pagebuilder-contain'}" not found`,
          )
        }
        // Create Vue app
        this.app = createApp(App)

        // Initialize Pinia
        const pinia = createPinia()
        this.app.use(pinia)

        // Initialize config store with provided configuration
        const configStore = useConfigStore(pinia)
        configStore.initialize(config)

        this.storeLayout = useElementStore(pinia)

        // Set component global
        this.app.component('SvgIcon', SvgIcon)
        this.app.component('ElSection', ElSection)
        this.app.component('ElSliderPost', ElSliderPost)
        this.app.component('ElListPost', ElListPost)
        this.app.component('ElListPostCategory', ElListPostCategory)
        this.app.component('ElFeaturePost', ElFeaturePost)

        // Mount Vue app to the root element
        this.app.mount(rootElement)
      }

      if (document.readyState === 'complete') {
        doRender()
      } else {
        window.addEventListener('load', () => {
          doRender()
        })
      }
    } catch (error) {
      console.error('Error mounting page builder:', error)
      throw error
    }
  }

  static unmount(): void {
    if (this.app) {
      this.app.unmount()
      this.app = null
    }
  }

  static getContent(): string {
    return this.storeLayout.getLayout()
  }

  static setInitContent(value: string): void {
    this.storeLayout.setInitLayout(value)
  }
}
