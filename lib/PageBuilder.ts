import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'virtual:svg-icons-register'

import App from '../src/App.vue'
import SvgIcon from '@/components/SvgIcon.vue'

import '../src/assets/index.css'

interface TypeBuilderConfig {
  root: string
  appApi: string
  tokenKey?: string
  refreshTokenKey?: string
}

export class PageBuilder {
  static el: HTMLElement

  private static app: ReturnType<typeof createApp> | null = null

  static mount(config: TypeBuilderConfig): void {
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
        this.app.use(createPinia())
        this.app.component('SvgIcon', SvgIcon)

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
}
