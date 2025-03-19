import { defineStore } from 'pinia'
import { v6 as uuidv6 } from 'uuid'
import { ref, markRaw } from 'vue'
import type { ListItemsElementType } from '@/types'

export const useElementStore = defineStore('element', () => {
  // Available element types that can be dragged from sidebar
  const availableElements = ref<ListItemsElementType[]>([
    {
      id: uuidv6(),
      el: 'ElSliderPost',
      name: 'Slider Post',
      content: {
        title: 'Slider Post',
      },
      styles: {
        column: 6,
      },
    },
    {
      id: uuidv6(),
      el: 'ElListPost',
      name: 'List Post',
      content: {
        title: 'List Post',
      },
      styles: {
        column: 3,
      },
    },
    {
      id: uuidv6(),
      el: 'ElListPostCategory',
      name: 'List Post Category',
      content: {
        title: 'List Post Category',
      },
      styles: {
        column: 12,
      },
    },
    {
      id: uuidv6(),
      el: 'ElFeaturePost',
      name: 'Feature Post',
      content: {
        title: 'Feature Post',
      },
      styles: {
        column: 3,
      },
    },
  ])

  // Layout elements (actual placed elements)
  const layoutElements = ref<ListItemsElementType[]>([])
  // {
  //   id: '1f00319b-c0d2-6850-b167-2a68088f6406',
  //   el: 'ElSection',
  //   name: 'Section',
  //   content: {
  //     title: 'Section',
  //   },
  //   children: [
  //     {
  //       id: '1f00319c-2807-66b0-b8f8-1841062a2314',
  //       el: 'ElListPost',
  //       name: 'List Post',
  //       content: {
  //         title: 'List Post',
  //       },
  //     },
  //     {
  //       id: '1f00319c-189b-6aa0-b1d6-ba7e27ef62fe',
  //       el: 'ElListPost',
  //       name: 'List Post',
  //       content: {
  //         title: 'List Post',
  //       },
  //     },
  //   ],
  // },

  // Helper function for drag and drop
  const applyDrag = (arr: ListItemsElementType[], dragResult: any) => {
    const { removedIndex, addedIndex, payload } = dragResult
    if (removedIndex === null && addedIndex === null) return arr

    const result = [...arr]
    let itemToAdd = { ...payload, id: uuidv6() } // Set unique ID

    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0]
    }

    if (addedIndex !== null && itemToAdd) {
      // Ensure component is wrapped with markRaw if it exists
      if (itemToAdd.el) {
        itemToAdd.el = markRaw(itemToAdd.el)
      }
      result.splice(addedIndex, 0, itemToAdd)
    }

    return result
  }

  // Actions
  const addSection = () => {
    layoutElements.value.push({
      id: uuidv6(),
      el: 'ElSection',
      name: 'Section',
      content: {
        title: 'Section',
      },
      children: [],
    })
  }

  const onDropLayout = (dropResult: any) => {
    layoutElements.value = applyDrag(layoutElements.value, dropResult)
  }

  const handleDropSection = (value: any) => {
    const index = layoutElements.value.findIndex((item) => item.id === value.sectionId)
    if (index !== -1 && layoutElements.value[index].children) {
      layoutElements.value[index].children = applyDrag(
        layoutElements.value[index].children || [],
        value.data,
      )
    }
  }

  const deleteElement = (elementId: string) => {
    // Delete from top level
    layoutElements.value = layoutElements.value.filter((item) => item.id !== elementId)

    // Delete from children
    layoutElements.value.forEach((section) => {
      if (section.children) {
        section.children = section.children.filter((item) => item.id !== elementId)
      }
    })
  }

  const updateElement = ({ id, content }: { id: string; content: any }) => {
    // Update element at top level
    const topLevelIndex = layoutElements.value.findIndex((item) => item.id === id)
    if (topLevelIndex !== -1) {
      layoutElements.value[topLevelIndex].content = content
      return
    }

    // Update element in children
    layoutElements.value.forEach((section) => {
      if (section.children) {
        const childIndex = section.children.findIndex((item) => item.id === id)
        if (childIndex !== -1) {
          section.children[childIndex].content = content
        }
      }
    })
  }

  const updateStyleElement = ({ id, styles }: { id: string; styles: any }) => {
    // Update element at top level
    const topLevelIndex = layoutElements.value.findIndex((item) => item.id === id)
    if (topLevelIndex !== -1) {
      layoutElements.value[topLevelIndex].styles = {
        ...layoutElements.value[topLevelIndex].styles,
        ...styles,
      }
      return
    }

    // Update element in children
    layoutElements.value.forEach((section) => {
      if (section.children) {
        const childIndex = section.children.findIndex((item) => item.id === id)
        if (childIndex !== -1) {
          section.children[childIndex].styles = {
            ...section.children[childIndex].styles,
            ...styles,
          }
        }
      }
    })
  }

  // Getters
  const getChildPayload1 = (index: number) => {
    return availableElements.value[index]
  }

  const getChildPayload2 = (index: number) => {
    return layoutElements.value[index]
  }

  const saveLayout = () => {}

  const getLayout = () => {
    return JSON.stringify(layoutElements.value)
  }

  const setInitLayout = (value: string | undefined) => {
    if (value) {
      const valueParse = JSON.parse(value)
      layoutElements.value = valueParse
    }
  }

  return {
    availableElements,
    layoutElements,
    addSection,
    onDropLayout,
    handleDropSection,
    deleteElement,
    updateElement,
    updateStyleElement,
    getChildPayload1,
    getChildPayload2,
    saveLayout,
    getLayout,
    setInitLayout,
  }
})
