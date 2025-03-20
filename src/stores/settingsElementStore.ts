import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ListItemsElementType } from '@/types'

export const useSettingsElementStore = defineStore('settingsElement', () => {
  const showSettingsElement = ref(false)
  const setShowSettingsElement = (status: boolean) => {
    showSettingsElement.value = status
  }

  const elementSelected = ref<ListItemsElementType | null>(null)

  const setElementSelected = (element: ListItemsElementType | null) => {
    elementSelected.value = element
  }

  return {
    elementSelected,
    showSettingsElement,
    setElementSelected,
    setShowSettingsElement,
  }
})
