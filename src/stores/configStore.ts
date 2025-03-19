import { defineStore } from 'pinia'
import type { ConfigState } from '@/types/index'

export const useConfigStore = defineStore('config', {
  state: (): ConfigState => ({
    root: '',
    appApi: 'https://haufo-apicms-dev.aequitas.dev',
    appCoreApi: 'https://haufo-core-dev.aequitas.dev',
    isInitialized: false,
  }),

  actions: {
    initialize(config: ConfigState) {
      this.root = config.root
      this.appApi = config.appApi
      this.appCoreApi = config.appCoreApi
      this.isInitialized = true

      console.log('Config store initialized with:', this.$state)
    },
  },
})
