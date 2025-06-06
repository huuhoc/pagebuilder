import { defineStore } from 'pinia'
import type { ConfigState } from '@/types/index'

export const useConfigStore = defineStore('config', {
  state: (): ConfigState => ({
    root: '',
    appApi: 'https://qlq-apicms-test.aequitas.dev',
    appCoreApi: 'https://qlq-core-test.aequitas.dev',
    appCmsApi: 'https://localhost:44313',
    isInitialized: false,
    languages: ['vi', 'en'],
  }),

  actions: {
    initialize(config: ConfigState) {
      this.root = config.root
      this.appApi = config.appApi
      this.appCmsApi = config.appCmsApi
      this.appCoreApi = config.appCoreApi
      this.isInitialized = true
      this.languages = config?.languages || ['vi']
      console.log('Config store initialized with:', this.$state)
    },
  },
})
