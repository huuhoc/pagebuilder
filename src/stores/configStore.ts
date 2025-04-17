import { defineStore } from 'pinia'
import type { ConfigState } from '@/types/index'

export const useConfigStore = defineStore('config', {
  state: (): ConfigState => ({
    root: '',
    appApi: 'https://haufo-apicms-dev.aequitas.dev',
    appCoreApi: 'https://haufo-core-dev.aequitas.dev',
    isInitialized: false,
    languages: ['vi', 'en'],
  }),

  actions: {
    initialize(config: ConfigState) {
      this.root = config.root
      this.appApi = config.appApi
      this.appCoreApi = config.appCoreApi
      this.isInitialized = true
      this.languages = config?.languages || ['vi']
      console.log('Config store initialized with:', this.$state)
    },
  },
})
