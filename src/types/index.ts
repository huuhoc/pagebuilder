export interface ListItemsElementType {
  id: string
  el: string
  name: string
  children?: ListItemsElementType[]
  content?: {
    title: string
    description?: string
    filter?: {
      category?: string
      exclude?: string[]
    }
    countItemDisplay?: number
  }
  styles?: {
    hasContainer?: boolean
    column?: number
    width?: string
    height?: string
    background?: {
      color?: string
      image?: string
    }
    padding?: string
    margin?: string
    classModify?: string
  }
}

export interface ConfigState {
  root: string
  appApi: string
  appCoreApi: string
  isInitialized?: boolean
}
