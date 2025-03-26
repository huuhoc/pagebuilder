export interface FieldType {
  type: string
  label?: string
  value: any
}

export interface ListItemsElementType {
  id: string
  el: string
  name: string
  children?: ListItemsElementType[]
  content?: {
    [key: string]: FieldType
  }
  styles?: {
    [key: string]: FieldType
  }
  // content?: {
  //   title?: FieldType
  //   description?: FieldType
  //   filter?: {
  //     category?: FieldType
  //     exclude?: FieldType
  //   }
  //   countItemDisplay?: number
  // }
  // styles?: {
  //   hasContainer?: FieldType
  //   column?: FieldType
  //   width?: FieldType
  //   height?: FieldType
  //   background?: {
  //     color?: FieldType
  //     image?: FieldType
  //   }
  //   padding?: FieldType
  //   margin?: FieldType
  //   classModify?: FieldType
  // }
}

export interface ConfigState {
  root: string
  appApi: string
  appCoreApi: string
  isInitialized?: boolean
}
