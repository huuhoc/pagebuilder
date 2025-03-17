import { defineStore } from 'pinia'
import type { ConfigState } from '@/types/index'

export const useConfigStore = defineStore('config', {
  state: (): ConfigState => ({
    root: '',
    appApi: 'https://haufo-apicms-dev.aequitas.dev',
    appCoreApi: 'https://haufo-core-dev.aequitas.dev',
    layoutId: '',
    tokenKey: 'auth_token',
    refreshTokenKey: 'refresh_token',
    isInitialized: false,
  }),

  actions: {
    initialize(config: ConfigState) {
      this.root = config.root
      this.appApi = config.appApi
      this.appCoreApi = config.appCoreApi
      this.layoutId = config.layoutId || ''
      this.tokenKey = config.tokenKey || 'auth_token'
      this.refreshTokenKey = config.refreshTokenKey || 'refresh_token'
      this.isInitialized = true

      console.log('Config store initialized with:', this.$state)
    },
    setLayoutId(id: string) {
      this.layoutId = id
    },
  },
})
