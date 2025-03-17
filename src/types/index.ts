export interface ListItemsElementType {
  id: string
  data: {
    component: any
    title: string
  }
  children?: ListItemsElementType[]
  content?: any
}

export interface ConfigState {
  root: string
  appApi: string
  appCoreApi: string
  layoutId?: string
  tokenKey?: string
  refreshTokenKey?: string
  isInitialized?: boolean
}
