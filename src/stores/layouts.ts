import { defineStore } from 'pinia'
import { v6 as uuidv6 } from 'uuid'
import { ref, markRaw } from 'vue'
import type { ListItemsElementType } from '@/types'

// Import your components
import ElSection from '@/components/ElSection.vue'
import ElSliderPost from '@/components/ElSliderPost.vue'
import ElListPost from '@/components/ElListPost.vue'
import ElFeaturePost from '@/components/ElFeaturePost.vue'

export const useElementStore = defineStore('element', () => {
  // Available element types that can be dragged from sidebar
  const availableElements = ref<ListItemsElementType[]>([
    {
      id: uuidv6(),
      data: {
        component: markRaw(ElSliderPost),
        title: 'Slider Post',
      },
    },
    {
      id: uuidv6(),
      data: {
        component: markRaw(ElListPost),
        title: 'List Post',
      },
    },
    {
      id: uuidv6(),
      data: {
        component: markRaw(ElFeaturePost),
        title: 'Feature Post',
      },
    },
  ])

  // Layout elements (actual placed elements)
  const layoutElements = ref<ListItemsElementType[]>([])

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
      if (itemToAdd.data && itemToAdd.data.component) {
        itemToAdd.data.component = markRaw(itemToAdd.data.component)
      }
      result.splice(addedIndex, 0, itemToAdd)
    }

    return result
  }

  // Actions
  const addSection = () => {
    layoutElements.value.push({
      id: uuidv6(),
      data: {
        component: ElSection,
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

  // Getters
  const getChildPayload1 = (index: number) => {
    return availableElements.value[index]
  }

  const getChildPayload2 = (index: number) => {
    return layoutElements.value[index]
  }

  return {
    availableElements,
    layoutElements,
    addSection,
    onDropLayout,
    handleDropSection,
    deleteElement,
    updateElement,
    getChildPayload1,
    getChildPayload2,
  }
})
