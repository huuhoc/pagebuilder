export interface FieldType {
  type: string
  label?: string
  desc?: string
  value?: string | number | boolean
  [key: `value_${string}`]: string | number
}

export interface ListItemsElementType {
  id: string
  el: string
  name: string
  description?: string
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
  languages?: string[]
}

export interface TreeNodeType {
  id: string
  label?: string
  slug?: string
  children?: TreeNodeType[]
}
export interface FilterCategory {
  IsHomepage?: boolean
  IsFeatured?: boolean
  ParentId?: string
  Sorting?: string
  SkipCount?: number
  MaxResultCount?: number
  Language?: string
}

export interface CategoryType {
  id: string
  name: string
  slug: string
  englishName?: string
  englishSlug?: string
  parentId: string | null
}
