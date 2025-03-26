import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'virtual:svg-icons-register'
import { useConfigStore } from '../src/stores/configStore'
import { useElementStore } from '../src/stores/layouts'
import type { ConfigState } from '../src/types/index'

import App from '../src/App.vue'

// Dynamically import and register all components from a specific folder
const components = import.meta.glob('../src/components/*.vue', { eager: true })
const componentsCommon = import.meta.glob('../src/components/common/*.vue', { eager: true })

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

        Object.entries(components).forEach(([path, module]) => {
          const componentName = path.replace('../src/components/', '').replace('.vue', '')
          this.app?.component(componentName, (module as { default: any }).default)
        })

        Object.entries(componentsCommon).forEach(([path, module]) => {
          const componentName = path.replace('../src/components/common/', '').replace('.vue', '')
          this.app?.component(componentName, (module as { default: any }).default)
        })

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
