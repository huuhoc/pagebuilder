export interface ListItemsElementType {
  id: string
  data: {
    component: any
    title: string
  }
  children?: ListItemsElementType[]
  content?: any
}
